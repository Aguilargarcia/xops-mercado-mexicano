
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users, 
  Eye,
  Plus,
  QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AdminDashboard = () => {
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

  return (
    <div className="min-h-screen bg-xops-cream">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-xops-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">X</span>
                </div>
                <span className="text-xl font-bold text-xops-dark">Admin Panel</span>
              </div>
            </div>

            <nav className="flex space-x-6">
              <Link to="/admin/dashboard" className="text-xops-blue font-medium">
                Dashboard
              </Link>
              <Link to="/admin/inventory" className="text-gray-600 hover:text-xops-blue">
                Inventario
              </Link>
              <Link to="/admin/orders" className="text-gray-600 hover:text-xops-blue">
                Pedidos
              </Link>
              <Link to="/admin/qr-scan" className="text-gray-600 hover:text-xops-blue">
                Escaneo QR
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-xops-dark mb-2">¡Bienvenido de vuelta!</h1>
          <p className="text-gray-600">Aquí tienes un resumen de tu tienda Tlalli</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 border-0 shadow-md bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-xops-dark">{stat.value}</p>
                  <p className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-xops-blue/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-xops-blue" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link to="/admin/inventory">
            <Button className="w-full btn-primary h-16 text-lg">
              <Plus className="w-5 h-5 mr-2" />
              Agregar Producto
            </Button>
          </Link>
          
          <Link to="/admin/orders">
            <Button variant="outline" className="w-full h-16 text-lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Ver Pedidos
            </Button>
          </Link>
          
          <Link to="/admin/qr-scan">
            <Button variant="outline" className="w-full h-16 text-lg">
              <QrCode className="w-5 h-5 mr-2" />
              Escanear QR
            </Button>
          </Link>
          
          <Button variant="outline" className="w-full h-16 text-lg">
            <Users className="w-5 h-5 mr-2" />
            Gestionar Marca
          </Button>
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
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <p className="font-medium text-xops-dark">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.product}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-xops-dark">${order.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
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
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Gráfico de ventas próximamente</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
