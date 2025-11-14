import api from "./api";
import { Product } from "../types/models";

export const ProductService = {
  create: (data: Product) =>
    api.post<Product>("/api/v1/product", data),

  list: () =>
    api.get<Product[]>("/api/v1/product"),

  get: (id: string) =>
    api.get<Product>(`/api/v1/product/${id}`),

  update: (id: string, data: Partial<Product>) =>
    api.put<Product>(`/api/v1/product/${id}`, data),

  delete: (id: string) =>
    api.delete(`/api/v1/product/${id}`),
};
