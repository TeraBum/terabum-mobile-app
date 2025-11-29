import api from "./api";
import { Product } from "../types/models";

export const vitrineService = {
  getProducts: async () => {
    const res = await api.get<Product[]>("/api/v1/vitrine/Product");
    return res.data;
  },

  getProductById: async (id: string) => {
    const res = await api.get<Product>(`/api/v1/vitrine/Product/${id}`);
    return res.data;
  },

  getProductStock: async (id: string) => {
    const res = await api.get(`/api/v1/vitrine/Product/${id}/stock`);
    return res.data;
  },
};
