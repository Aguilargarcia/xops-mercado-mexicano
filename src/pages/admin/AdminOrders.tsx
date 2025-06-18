
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  ShoppingBag, 
  Package, 
  Settings, 
  LogOut,
  Search,
  Filter,
  Eye,
  QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const AdminOrders = () => {
  const orders = [
    {
      id: '#001',
      customer: 'Ana García',
      email: 'ana.garcia@email.com',
      total: 850,
      status: 'Enviado',
      date: '2024-01-15',
      items: 2,
      products: ['Bolsa Artesanal', 'Collar de Jade']
    },
    {
      id: '#002',
      customer: 'Carlos López',
      email: 'carlos.lopez@email.com',
      total: 450,
      status: 'Pendiente',
      date: '2024-01-15',
      items: 1,
      products: ['Playera Bordada']
    },
    {
      id: '#003',
      customer: 'María Rodríguez',
      email: 'maria.rodriguez@email.com',
      total: 1200,
      status: 'Entregado',
      date: '2024-01-14',
      items: 3,
      products: ['Pulsera Bordada', 'Aretes de Plata', 'Huaraches']
    },
    {
      id: '#004',
      customer: 'Juan Pérez',
      email: 'juan.perez@email.com',
      total: 680,
      status: 'Enviado',
      date: '2024-01-14',
      items: 1,
      products: ['Cerámica Talavera']
    }
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
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
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
                className="flex items-center space-x-3 p-3 rounded-lg bg-xops-blue/10 text-xops-blue font-medium"
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
            <h1 className="text-3xl font-bold text-xops-dark">Pedidos</h1>
            <p className="text-gray-600">Gestiona los pedidos de tus clientes</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 border-0 shadow-md">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Buscar pedidos..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
            </div>
          </div>
        </Card>

        {/* Orders Table */}
        <Card className="border-0 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Pedido</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Cliente</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Productos</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Fecha</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-xops-dark">{order.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-xops-dark">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-600">{order.items} artículos</p>
                        <p className="text-xs text-gray-500">{order.products.join(', ')}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-xops-dark">${order.total}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        order.status === 'Entregado' ? 'bg-green-100 text-green-800' :
                        order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.date}
                    </td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline" className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminOrders;
