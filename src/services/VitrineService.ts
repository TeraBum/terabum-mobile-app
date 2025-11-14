import api from "./api";
import { Product, StockItem } from "../types/models";

export const VitrineService = {
  listProducts: () =>
    api.get<Product[]>("/api/v1/vitrine/Product"),

  getProductDetails: (id: string) =>
    api.get<Product>(`/api/v1/vitrine/Product/${id}`),

  getStockForProduct: (id: string) =>
    api.get<StockItem>(`/api/v1/vitrine/Product/${id}/stock`),
};
