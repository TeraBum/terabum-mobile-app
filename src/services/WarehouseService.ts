import { api } from "./api";

export const WarehouseService = {
  create: (data) => api.post("/warehouse", data),

  list: () => api.get("/warehouse"),

  get: (id) => api.get(`/warehouse/${id}`),

  update: (id, data) => api.put(`/warehouse/${id}`, data),

  delete: (id) => api.delete(`/warehouse/${id}`),
};
