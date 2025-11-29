import api from "./api";

export const orderService = {
  createOrder: async (payload: any) => {
    const res = await api.post("/api/v1/order", payload);
    return res.data;
  },

  getOrders: async () => {
    const res = await api.get("/api/v1/order");
    return res.data;
  },

  getOrderById: async (id: string) => {
    const res = await api.get(`/api/v1/order/${id}`);
    return res.data;
  },
};
