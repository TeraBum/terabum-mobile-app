import api from "./api";
import { Payment } from "../types/models";

export const PaymentService = {
  createPayment: (orderId: string) =>
    api.post<Payment>("/api/v1/payments", { orderId }),

  getPaymentByOrder: (orderId: string) =>
    api.get<Payment>(`/api/v1/payments/${orderId}`),

  updatePaymentStatus: (paymentId: string, status: string) =>
    api.patch(`/api/v1/payments/${paymentId}`, { status }),

  cancelPayment: (paymentId: string) =>
    api.delete(`/api/v1/payments/${paymentId}`),
};
