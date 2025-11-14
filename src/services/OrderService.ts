import { api } from "./api";

export const OrderService = {
  createPayment: (data) => api.post("/payments", data),

  getPayment: (orderId) => api.get(`/payments/${orderId}`),

  updatePayment: (id, data) => api.patch(`/payments/${id}`, data),

  cancelPayment: (id) => api.delete(`/payments/${id}`),
};
