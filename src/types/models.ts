// =======================
// USER
// =======================
export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}


// =======================
// PRODUCT
// =======================
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imagesJson: string[]; // geralmente vem como array no mobile
  category: string;
  isActive: boolean;
  createdAt: string;
}


// =======================
// CATEGORY
// =======================
export interface Category {
  id: string;
  name: string;
  description: string;
}


// =======================
// STOCK ITEMS
// =======================
export interface StockItem {
  productId: string;
  warehouseId: string;
  quantity: number;
  reserved: number;
  updatedAt: string;
}


// =======================
// STOCK MOVES
// =======================
export interface StockMove {
  id: string;
  productId: string;
  warehouseId: string;
  qtyMoved: number;
  reason: string;
  createdAt: string;
}


// =======================
// WAREHOUSE
// =======================
export interface Warehouse {
  id: string;
  name: string;
  location: string;
  createdAt: string;
}


// =======================
// CART
// =======================
export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product; // opcional para telas detalhadas
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}


// =======================
// ORDER / PAYMENT
// =======================
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: string;
  totalValue: number;
  paymentId?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  status: string;
  createdAt: string;
}
