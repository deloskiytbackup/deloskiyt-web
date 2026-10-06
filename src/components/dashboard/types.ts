export interface Order {
  id: string;
  orderNumber: string;
  title: string;
  description: string | null;
  status: string;
  price: number | null;
  createdAt: Date | string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  version: string;
  category: string;
  downloadUrl: string | null;
  createdAt: Date | string;
  licenses?: License[];
}

export interface License {
  id: string;
  licenseKey: string;
  name: string;
  status: string;
  expiresAt: Date | string | null;
  serverIp?: string | null;
  serverPort?: number | null;
  hwid?: string | null;
  lastConnectedAt?: Date | string | null;
  createdAt: Date | string;
  productId: string | null;
  product?: Product | null;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  orders?: Order[];
  products?: Product[];
  licenses?: License[];
}

export type DashboardTab = "products" | "licenses" | "support";
