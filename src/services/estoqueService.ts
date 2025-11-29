import api from "./api";

export const estoqueService = {
  // STOCK ITEMS
  listStock: async () => {
    const res = await api.get("/api/v1/stock-items");
    return res.data;
  },

  getStock: async (warehouseId: string, productId: string) => {
    const res = await api.get(
      `/api/v1/stock-items/${warehouseId}/${productId}`
    );
    return res.data;
  },

  updateStock: async (
    warehouseId: string,
    productId: string,
    payload: any
  ) => {
    const res = await api.put(
      `/api/v1/stock-items/${warehouseId}/${productId}`,
      payload
    );
    return res.data;
  },

  deleteStock: async (warehouseId: string, productId: string) => {
    const res = await api.delete(
      `/api/v1/stock-items/${warehouseId}/${productId}`
    );
    return res.data;
  },

  createStockItem: async (payload: any) => {
    const res = await api.post("/api/v1/stock-items", payload);
    return res.data;
  },

  baixaEstoque: async (payload: any) => {
    const res = await api.post("/api/v1/stock-items/baixa", payload);
    return res.data;
  },

  // STOCK MOVES
  listMoves: async () => {
    const res = await api.get("/api/v1/stock-moves");
    return res.data;
  },

  getMove: async (id: string) => {
    const res = await api.get(`/api/v1/stock-moves/${id}`);
    return res.data;
  },

  listByProduct: async (productId: string) => {
    const res = await api.get(`/api/v1/stock-moves/by-product/${productId}`);
    return res.data;
  },

  listByWarehouse: async (warehouseId: string) => {
    const res = await api.get(`/api/v1/stock-moves/by-warehouse/${warehouseId}`);
    return res.data;
  },

  listByWarehouseProduct: async (warehouseId: string, productId: string) => {
    const res = await api.get(
      `/api/v1/stock-moves/by-warehouse-product/${warehouseId}/${productId}`
    );
    return res.data;
  },
};

