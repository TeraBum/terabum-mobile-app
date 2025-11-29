import api from "./api";

export const cartService = {
  createCart: async () => {
    const res = await api.post("/api/v1/cart");
    return res.data;
  },

  getCart: async () => {
    const res = await api.get("/api/v1/cart");
    return res.data;
  },

  updateItems: async (items: any[]) => {
    const res = await api.patch("/api/v1/cart/cart-items", { items });
    return res.data;
  },

  cancelCart: async () => {
    const res = await api.patch("/api/v1/cart/cancel");
    return res.data;
  },

  checkout: async () => {
    const res = await api.post("/api/v1/cart/checkout");
    return res.data;
  },
};
