
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Package, 
  Settings, 
  LogOut,
  QrCode,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const stats = {
    revenue: 45600,
    orders: 128,
    visitors: 2340,
    conversion: 5.2,
  };

  const recentOrders = [
    { id: '#001', customer: 'Ana García', total: 850, status: 'Enviado', date: '2024-01-15' },
    { id: '#002', customer: 'Carlos López', total: 450, status: 'Pendiente', date: '2024-01-15' },
    { id: '#003', customer: 'María Rodríguez', total: 1200, status: 'Entregado', date: '2024-01-14' },
    { id: '#004', customer: 'Juan Pérez', total: 680, status: 'Enviado', date: '2024-01-14' },
  ];

  const topProducts = [
    { name: 'Bolsa Artesanal Oaxaca', sales: 45, revenue: 38250 },
    { name: 'Playera Bordada', sales: 32, revenue: 14400 },
    { name: 'Collar de Plata', sales: 28, revenue: 35000 },
    { name: 'Huaraches Tradicionales', sales: 22, revenue: 17160 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-xops-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">X</span>
            </div>
            <span className="text-xl font-bold text-xops-dark">Xops</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Panel de Marca</p>
        </div>

        <nav className="p-6">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/admin/dashboard" 
                className="flex items-center space-x-3 p-3 rounded-lg bg-xops-blue/10 text-xops-blue font-medium"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/inventory" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Package className="w-5 h-5" />
                <span>Inventario</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/orders" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Pedidos</span>
              </Link>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <QrCode className="w-5 h-5" />
                <span>Códigos QR</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Configuración</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Link 
            to="/admin" 
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-xops-dark">Dashboard</h1>
            <p className="text-gray-600">Bienvenido de vuelta, Tlalli</p>
          </div>
          <Button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Producto
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ingresos del Mes</p>
                <p className="text-2xl font-bold text-xops-dark">
                  ${stats.revenue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+12% vs mes anterior</p>
          </Card>

          <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pedidos</p>
                <p className="text-2xl font-bold text-xops-dark">{stats.orders}</p>
              </div>
              <div className="w-12 h-12 bg-xops-blue/10 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-xops-blue" />
              </div>
            </div>
            <p className="text-sm text-xops-blue mt-2">+8% vs mes anterior</p>
          </Card>

          <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Visitantes</p>
                <p className="text-2xl font-bold text-xops-dark">{stats.visitors.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-purple-600 mt-2">+15% vs mes anterior</p>
          </Card>

          <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Conversión</p>
                <p className="text-2xl font-bold text-xops-dark">{stats.conversion}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-orange-600 mt-2">+2% vs mes anterior</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-xops-dark">Pedidos Recientes</h3>
              <Link to="/admin/orders" className="text-xops-blue hover:text-xops-blue/80 text-sm font-medium">
                Ver todos
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-xops-dark">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-xops-dark">${order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Entregado' ? 'bg-green-100 text-green-800' :
                      order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Products */}
          <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-xops-dark">Productos Más Vendidos</h3>
              <Link to="/admin/inventory" className="text-xops-blue hover:text-xops-blue/80 text-sm font-medium">
                Ver inventario
              </Link>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-xops-dark">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} ventas</p>
                  </div>
                  <p className="font-semibold text-xops-dark">
                    ${product.revenue.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
