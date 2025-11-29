import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userService } from "../services/userService";

// Tipo do usuário
interface User {
id: string;
name: string;
email: string;
}

// Tipo do contexto
interface AuthContextType {
user: User | null;
loading: boolean;
login: (credentials: { email: string; password: string }) => Promise;
register: (user: { name: string; email: string; password: string }) => Promise;
logout: () => Promise;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
loadUser();
}, []);

// Carregar usuário logado
async function loadUser() {
try {
const token = await AsyncStorage.getItem("token");

  if (token) {
    userService.setToken(token);

    const { data } = await userService.getProfile();

    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
    });
  }
} catch (err) {
  console.log("Erro ao carregar usuário:", err);
}

setLoading(false);

}

// LOGIN
async function login(credentials: { email: string; password: string }) {
const { data } = await userService.login(credentials);

await AsyncStorage.setItem("token", data.token);
userService.setToken(data.token);

setUser({
  id: data.user.id,
  name: data.user.name,
  email: data.user.email,
});

}

// REGISTER
async function register(userForm: { name: string; email: string; password: string }) {
await userService.register(userForm);
}

// LOGOUT
async function logout() {
await AsyncStorage.removeItem("token");
userService.setToken(null);
setUser(null);
}

return (
<AuthContext.Provider value={{ user, loading, login, register, logout }}>
{children}
</AuthContext.Provider>
);
}

// Hook de acesso
export function useAuth() {
return useContext(AuthContext);
}