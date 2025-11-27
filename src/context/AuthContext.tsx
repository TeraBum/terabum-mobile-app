// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserService } from "../services/userService";

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  // Carrega usuário ao abrir o app
  async function loadUser() {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        // Seta o token no axios
        UserService.setToken(token);

        const { data } = await UserService.getProfile();
        setUser(data);
      }
    } catch (error) {
      console.log("Erro ao carregar usuário:", error);
    }

    setLoading(false);
  }

  // Faz login
  async function login(credentials: any) {
    try {
      const { data } = await UserService.login(credentials);

      // Salva token
      await AsyncStorage.setItem("token", data.token);

      // Atualiza axios
      UserService.setToken(data.token);

      // Salva usuário logado
      setUser(data.user);
    } catch (error) {
      console.log("Erro no login:", error);
      throw error;
    }
  }

  // Faz logout
  async function logout() {
    try {
      await AsyncStorage.removeItem("token");
      UserService.setToken(null);
      setUser(null);
    } catch (error) {
      console.log("Erro ao fazer logout:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar auth facilmente
export function useAuth() {
  return useContext(AuthContext);
}
