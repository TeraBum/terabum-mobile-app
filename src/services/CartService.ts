import api from "./api";
import { Cart } from "../types/models";

export const CartService = {
  createCart: () =>
    api.post<Cart>("/api/v1/cart"),

  getCart: () =>
    api.get<Cart>("/api/v1/cart"),

  updateItems: (items: any[]) =>
    api.patch<Cart>("/api/v1/cart/cart-items", { items }),

  cancelCart: () =>
    api.patch("/api/v1/cart/cancel", {}),

  checkout: () =>
    api.post("/api/v1/cart/checkout", {}),
};
