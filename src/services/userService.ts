// src/services/userService.ts
import axios from "axios";

const API_URL = "https://seu-backend.com/api"; // 🔥 Troque pelo seu endpoint real

class UserServiceClass {
  private api;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });
  }

  // Define ou remove o token nos headers
  setToken(token: string | null) {
    if (token) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers.common["Authorization"];
    }
  }

  // Login
  async login(credentials: { email: string; password: string }) {
    return this.api.post("/auth/login", credentials);
  }

  // Carrega dados do usuário logado
  async getProfile() {
    return this.api.get("/auth/me");
  }
}

export const UserService = new UserServiceClass();
