import api from "./api";
import {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
  User,
} from "../types/models";

export const UserService = {
  register: (data: RegisterRequest) =>
    api.post<User>("/api/v1/Users/register", data),

  login: (data: LoginRequest) =>
    api.post<LoginResponse>("/api/v1/Users/login", data),

  listAll: () =>
    api.get<User[]>("/api/v1/Users"),

  getProfile: (id: string) =>
    api.get<User>(`/api/v1/Users/${id}`),

  updateOwnData: (id: string, data: Partial<User>) =>
    api.put<User>(`/api/v1/Users/${id}`, data),

  changeRole: (id: string, role: string) =>
    api.put(`/api/v1/Users/${id}/role`, { role }),

  deleteAccount: (id: string) =>
    api.delete(`/api/v1/Users/${id}`),
};
