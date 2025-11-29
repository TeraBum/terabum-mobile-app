import api from "./api";

export const warehouseService = {
  list: async () => {
    const res = await api.get("/api/v1/warehouse");
    return res.data;
  },

  get: async (id: string) => {
    const res = await api.get(`/api/v1/warehouse/${id}`);
    return res.data;
  },

  create: async (payload: any) => {
    const res = await api.post("/api/v1/warehouse", payload);
    return res.data;
  },

  update: async (id: string, payload: any) => {
    const res = await api.put(`/api/v1/warehouse/${id}`, payload);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete(`/api/v1/warehouse/${id}`);
    return res.data;
  },
};
