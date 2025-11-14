import api from "./api";
import { Warehouse } from "../types/models";

export const WarehouseService = {
  create: (data: Warehouse) =>
    api.post<Warehouse>("/api/v1/warehouse", data),

  list: () =>
    api.get<Warehouse[]>("/api/v1/warehouse"),

  get: (id: string) =>
    api.get<Warehouse>(`/api/v1/warehouse/${id}`),

  update: (id: string, data: Partial<Warehouse>) =>
    api.put(`/api/v1/warehouse/${id}`, data),

  delete: (id: string) =>
    api.delete(`/api/v1/warehouse/${id}`),
};
