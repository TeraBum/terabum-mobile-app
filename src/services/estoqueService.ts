import api from "./api";

const ESTOQUE_BASE = "/api/v1/estoque";
const STOCK_ITEMS_ENDPOINT = `${ESTOQUE_BASE}/stock-items`;
const STOCK_MOVES_ENDPOINT = `${ESTOQUE_BASE}/stock-move`;
const STOCK_PRODUCTS_ENDPOINT = `${ESTOQUE_BASE}/products`;

const extractList = <T = any>(payload: any, key?: string): T[] => {
  if (key && Array.isArray(payload?.[key])) {
    return payload[key];
  }
  if (Array.isArray(payload)) {
    return payload;
  }
  if (Array.isArray(payload?.data)) {
    return payload.data;
  }
  return [];
};

const normalizeProductId = (id: string) => {
  return id.trim().replace(/^[{\["]+|[}\]"]+$/g, "").replace(/[^0-9a-fA-F-]/g, "");
};

export const estoqueService = {
  // STOCK ITEMS
  listStock: async () => {
    const res = await api.get(STOCK_ITEMS_ENDPOINT);
    return extractList(res.data, "stock_items");
  },

  getStock: async (warehouseId: string, productId: string) => {
    const res = await api.get(
      `${STOCK_ITEMS_ENDPOINT}/${warehouseId}/${productId}`
    );
    return res.data;
  },

  updateStock: async (
    warehouseId: string,
    productId: string,
    payload: any
  ) => {
    const res = await api.put(
      `${STOCK_ITEMS_ENDPOINT}/${warehouseId}/${productId}`,
      payload
    );
    return res.data;
  },

  deleteStock: async (warehouseId: string, productId: string) => {
    const res = await api.delete(
      `${STOCK_ITEMS_ENDPOINT}/${warehouseId}/${productId}`
    );
    return res.data;
  },

  createStockItem: async (payload: any) => {
    const res = await api.post(STOCK_ITEMS_ENDPOINT, payload);
    return res.data;
  },

  baixaEstoque: async (payload: any) => {
    const res = await api.post(`${STOCK_ITEMS_ENDPOINT}/baixa`, payload);
    return res.data;
  },

  // STOCK MOVES
  listMoves: async () => {
    const res = await api.get(STOCK_MOVES_ENDPOINT);
    return res.data;
  },

  getMove: async (id: string) => {
    const res = await api.get(`${STOCK_MOVES_ENDPOINT}/${id}`);
    return res.data;
  },

  listByProduct: async (productId: string) => {
    const res = await api.get(`${STOCK_MOVES_ENDPOINT}/by-product/${productId}`);
    return res.data;
  },

  listByWarehouse: async (warehouseId: string) => {
    const res = await api.get(
      `${STOCK_MOVES_ENDPOINT}/by-warehouse/${warehouseId}`
    );
    return res.data;
  },

  listByWarehouseProduct: async (warehouseId: string, productId: string) => {
    const res = await api.get(
      `${STOCK_MOVES_ENDPOINT}/by-warehouse-product/${warehouseId}/${productId}`
    );
    return res.data;
  },

  // STOCK PRODUCTS
  listStockProducts: async () => {
    const res = await api.get(STOCK_PRODUCTS_ENDPOINT);
    return extractList(res.data, "products");
  },

  getStockProduct: async (id: string) => {
    const res = await api.get(`${STOCK_PRODUCTS_ENDPOINT}/${id}`);
    return res.data;
  },

  createStockProduct: async (payload: any) => {
    const res = await api.post(STOCK_PRODUCTS_ENDPOINT, payload);
    return res.data;
  },

  updateStockProduct: async (id: string, payload: any) => {
    const res = await api.put(STOCK_PRODUCTS_ENDPOINT, { id, ...payload });
    return res.data;
  },

  deleteStockProduct: async (id: string) => {
    const cleanId = normalizeProductId(id);
    const res = await api.delete(
      `${STOCK_PRODUCTS_ENDPOINT}/${encodeURIComponent(cleanId)}`
    );
    return res.data;
  },
};
