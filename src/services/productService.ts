import api from "./api";
import { Product } from "../types/models";

export const productService = {
  list: async () => {
    const res = await api.get<Product[]>("/api/v1/product");
    return res.data;
  },

  get: async (id: string) => {
    const res = await api.get<Product>(`/api/v1/product/${id}`);
    return res.data;
  },

  create: async (payload: Partial<Product>) => {
    const res = await api.post("/api/v1/product", payload);
    return res.data;
  },

  update: async (id: string, payload: Partial<Product>) => {
    const res = await api.put(`/api/v1/product/${id}`, payload);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete(`/api/v1/product/${id}`);
    return res.data;
  },
};
