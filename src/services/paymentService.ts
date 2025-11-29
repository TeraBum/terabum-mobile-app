import api from "./api";

export const paymentService = {
  createPayment: async (payload: any) => {
    const res = await api.post("/api/v1/payments", payload);
    return res.data;
  },

  getPaymentByOrder: async (orderId: string) => {
    const res = await api.get(`/api/v1/payments/${orderId}`);
    return res.data;
  },

  updatePaymentStatus: async (paymentId: string, status: string) => {
    const res = await api.patch(`/api/v1/payments/${paymentId}`, { status });
    return res.data;
  },

  cancelPayment: async (paymentId: string) => {
    const res = await api.delete(`/api/v1/payments/${paymentId}`);
    return res.data;
  },
};
