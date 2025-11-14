// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserService } from "../services/userService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      try {
        const { data } = await UserService.getProfile();
        setUser(data);
      } catch {}
    }
    setLoading(false);
  }

  async function login(credentials) {
    const { data } = await UserService.login(credentials);
    setUser(data.user);
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
