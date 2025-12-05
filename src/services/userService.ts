import api from "./api";
import { User } from "../types/models";

interface LoginCredentials {
  email: string;
  senha: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const userService = {
  login: async ({ email, senha }: LoginCredentials) => {
    console.log(email)
    console.log(senha)
    const res = await api.post("autenticacao/api/users/login", {
      email: email,
      senha: senha,
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
