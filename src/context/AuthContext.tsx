// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Usuário de teste
  const testUser = {
    email: "lucas@email.com",
    password: "123456",
    name: "Lucas",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const token = await AsyncStorage.getItem("token");
    if (token) setUser(testUser);
    setLoading(false);
  }

  async function login({ email, password }) {
    if (email === testUser.email && password === testUser.password) {
      await AsyncStorage.setItem("token", "fake-token");
      setUser(testUser);
      return { success: true };
    } else {
      return { success: false, message: "Email ou senha inválidos" };
    }
  }

  async function logout() {
    await AsyncStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
