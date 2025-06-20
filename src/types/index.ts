
// Tipos principales para la aplicación
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

export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'Pendiente' | 'Procesando' | 'Enviado';
  date: string;
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
