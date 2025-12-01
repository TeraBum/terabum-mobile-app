import api from "./api";
import { User } from "../types/models";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const userService = {
  login: async ({ email, password }: LoginCredentials) => {
    const res = await api.post("/api/v1/Users/login", {
      email,
      password,
      senha: password,
    });
    return res.data;
  },

  register: async ({ name, email, password }: RegisterPayload) => {
    const res = await api.post("/api/v1/Users/register", {
      name,
      email,
      password,
      nome: name,
      senha: password,
    });
    return res.data;
  },

  getProfile: async (id: string) => {
    const res = await api.get<User>(`/api/v1/Users/${id}`);
    return res.data;
  },

  updateProfile: async (id: string, payload: Partial<User>) => {
    const res = await api.put(`/api/v1/Users/${id}`, payload);
    return res.data;
  },

  deleteUser: async (id: string) => {
    const res = await api.delete(`/api/v1/Users/${id}`);
    return res.data;
  },
};
