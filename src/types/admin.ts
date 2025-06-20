
export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  description?: string;
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  products: Product[];
}

export interface QRLabel {
  productId: string;
  productName: string;
  productCode: string;
  qrUrl: string;
}

export interface DashboardStats {
  salesMonth: string;
  salesChange: string;
  activeProducts: number;
  productsChange: number;
  pendingOrders: number;
  ordersChange: number;
  uniqueVisitors: string;
  visitorsChange: string;
}
