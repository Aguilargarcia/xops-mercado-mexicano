
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users, 
  Eye,
  Plus,
  QrCode,
  LayoutDashboard,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const stats = [
    {
      title: "Ventas del Mes",
      value: "$12,450",
      change: "+12%",
      icon: TrendingUp,
      positive: true
    },
    {
      title: "Productos Activos",
      value: "24",
      change: "+3",
      icon: Package,
      positive: true
    },
    {
      title: "Pedidos Pendientes",
      value: "8",
      change: "-2",
      icon: ShoppingCart,
      positive: true
    },
    {
      title: "Visitantes Únicos",
      value: "1,234",
      change: "+8%",
      icon: Eye,
      positive: true
    }
  ];

  const recentOrders = [
    {
      id: "#001",
      customer: "María González",
      product: "Bolsa Artesanal",
      amount: 899,
      status: "Pendiente",
      date: "Hace 2 horas"
    },
    {
      id: "#002",
      customer: "Carlos Ruiz",
      product: "Collar de Jade",
      amount: 650,
      status: "Procesando",
      date: "Hace 4 horas"
    },
    {
      id: "#003",
      customer: "Ana Pérez",
      product: "Aretes de Plata",
      amount: 450,
      status: "Enviado",
      date: "Hace 1 día"
    }
  ];

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Inventario',
      path: '/admin/inventory',
      icon: Package
    },
    {
      name: 'Pedidos',
      path: '/admin/orders',
      icon: ShoppingCart
    },
    {
      name: 'Escaneo QR',
      path: '/admin/qr-scan',
      icon: QrCode
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-xops-cream flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white shadow-xl transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-xops-blue to-xops-blue/80 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">X</span>
            </div>
            {sidebarOpen && (
              <div>
                <span className="text-xl font-bold text-xops-dark">Xops</span>
                <p className="text-sm text-gray-500">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive(item.path) 
                    ? 'bg-gradient-to-r from-xops-blue to-xops-blue/90 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-xops-blue/5 hover:text-xops-blue'
                }`}
              >
                <item.icon className={`w-5 h-5 ${
                  isActive(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-xops-blue'
                }`} />
                {sidebarOpen && (
                  <span className="font-medium">{item.name}</span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Toggle Button */}
        <div className="p-4 border-t border-gray-100">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full justify-center"
          >
            <Menu className="w-4 h-4" />
            {sidebarOpen && <span className="ml-2">Contraer</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-xops-dark">Dashboard</h1>
                <p className="text-gray-600 mt-1">Bienvenido de vuelta a tu panel de control</p>
              </div>
              <div className="flex items-center gap-4">
                <Button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Producto
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-xops-dark">{stat.value}</p>
                    <p className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} vs mes anterior
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-xops-blue/10 to-xops-blue/20 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-xops-blue" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Link to="/admin/inventory">
              <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-gradient-to-br from-xops-blue to-xops-blue/90 text-white border-0">
                <div className="flex items-center gap-3">
                  <Plus className="w-6 h-6" />
                  <span className="font-semibold">Agregar Producto</span>
                </div>
              </Card>
            </Link>
            
            <Link to="/admin/orders">
              <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-0">
                <div className="flex items-center gap-3 text-xops-dark">
                  <ShoppingCart className="w-6 h-6 text-xops-blue" />
                  <span className="font-semibold">Ver Pedidos</span>
                </div>
              </Card>
            </Link>
            
            <Link to="/admin/qr-scan">
              <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-0">
                <div className="flex items-center gap-3 text-xops-dark">
                  <QrCode className="w-6 h-6 text-xops-blue" />
                  <span className="font-semibold">Escanear QR</span>
                </div>
              </Card>
            </Link>
            
            <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-0 cursor-pointer">
              <div className="flex items-center gap-3 text-xops-dark">
                <Users className="w-6 h-6 text-xops-blue" />
                <span className="font-semibold">Gestionar Marca</span>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <Card className="p-6 border-0 shadow-md bg-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-xops-dark">Pedidos Recientes</h2>
                <Link to="/admin/orders" className="text-xops-blue hover:text-xops-blue/80 text-sm font-medium">
                  Ver todos
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                    <div>
                      <p className="font-medium text-xops-dark">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.product}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-xops-dark">${order.amount.toLocaleString()}</p>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        order.status === 'Enviado' ? 'bg-green-100 text-green-800' :
                        order.status === 'Procesando' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Chart Placeholder */}
            <Card className="p-6 border-0 shadow-md bg-white">
              <h2 className="text-xl font-semibold text-xops-dark mb-6">Resumen de Ventas</h2>
              <div className="bg-gradient-to-br from-xops-blue/5 to-xops-blue/10 rounded-xl p-12 text-center">
                <TrendingUp className="w-16 h-16 text-xops-blue/60 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Gráfico de ventas próximamente</p>
                <p className="text-sm text-gray-500 mt-1">Análisis detallado de rendimiento</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
