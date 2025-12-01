import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";
import { userService } from "../services/userService";
import { User } from "../types/models";

const ROLE_CLAIM =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
const TOKEN_STORAGE_KEY = "token";

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

interface AuthContextType {
  token: string | null;
  role: string | null;
  user: User | null;
  initializing: boolean;
  loading: boolean;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const defaultContext: AuthContextType = {
  token: null,
  role: null,
  user: null,
  initializing: true,
  loading: false,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

const decodeTokenPayload = (token: string): Record<string, unknown> | null => {
  try {
    const parts = token.split(".");
    if (parts.length < 2) {
      return null;
    }
    const normalized = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padding = (4 - (normalized.length % 4)) % 4;
    const base64 = normalized + "=".repeat(padding);
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(decoded);
  } catch (err) {
    console.warn("Falha ao decodificar JWT:", err);
    return null;
  }
};

const extractRoleFromToken = (token: string | null): string | null => {
  if (!token) {
    return null;
  }
  const payload = decodeTokenPayload(token);
  if (!payload) {
    return null;
  }
  return (
    (payload[ROLE_CLAIM] as string | null) ??
    (payload["role"] as string | null) ??
    (payload["Role"] as string | null) ??
    (payload["roles"] as string | null) ??
    null
  );
};

const extractUser = (raw: any): User | null => {
  if (!raw) {
    return null;
  }

  return {
    id: raw.id ?? raw.userId ?? "",
    name: raw.name ?? raw.nome ?? "",
    email: raw.email ?? "",
    roles: Array.isArray(raw.roles) ? raw.roles : [],
  };
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
        if (storedToken) {
          setToken(storedToken);
          setRole(extractRoleFromToken(storedToken));
        }
      } finally {
        setInitializing(false);
      }
    };

    loadToken();
  }, []);

  const applySession = async (nextToken: string | null, nextUser?: User | null) => {
    if (nextToken) {
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
      setToken(nextToken);
      setRole(extractRoleFromToken(nextToken));
      if (typeof nextUser !== "undefined") {
        setUser(nextUser);
      }
      return;
    }

    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setRole(null);
    setUser(null);
  };

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const data = await userService.login(credentials);
      const authToken = data?.token;
      if (!authToken) {
        throw new Error("Token não recebido. Verifique suas credenciais.");
      }
      const nextUser = extractUser(data?.user);
      await applySession(authToken, nextUser);
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    await userService.register(payload);
  };

  const logout = async () => {
    await applySession(null);
  };

  const value = useMemo(
    () => ({
      token,
      role,
      user,
      initializing,
      loading,
      isAdmin: role === "Administrador",
      login,
      register,
      logout,
    }),
    [token, role, user, initializing, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
