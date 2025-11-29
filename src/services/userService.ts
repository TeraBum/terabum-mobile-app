import api from "./api";
import { User } from "../types/models";

export const userService = {
  login: async (email: string, password: string) => {
    const res = await api.post("/api/v1/Users/login", { email, password });
    return res.data;
  },

  register: async (name: string, email: string, password: string) => {
    const res = await api.post("/api/v1/Users/register", {
      name,
      email,
      password,
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
