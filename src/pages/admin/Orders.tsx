import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Download, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Order } from '@/types';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Datos de prueba para pedidos
  const mockOrders: Order[] = [
    {
      id: '#001',
      customer: 'María González',
      product: 'Bolsa Artesanal de Cuero',
      amount: 899,
      status: 'Pendiente',
      date: 'Hace 2 horas'
    },
    {
      id: '#002',
      customer: 'Carlos Ruiz',
      product: 'Collar de Jade Natural',
      amount: 650,
      status: 'Procesando',
      date: 'Hace 4 horas'
    },
    {
      id: '#003',
      customer: 'Ana Pérez',
      product: 'Aretes de Plata 925',
      amount: 450,
      status: 'Enviado',
      date: 'Hace 1 día'
    },
    {
      id: '#004',
      customer: 'Luis Hernández',
      product: 'Bolsa Artesanal de Cuero',
      amount: 899,
      status: 'Entregado',
      date: 'Hace 2 días'
    },
    {
      id: '#005',
      customer: 'Sofia Martínez',
      product: 'Collar de Jade Natural',
      amount: 650,
      status: 'Pendiente',
      date: 'Hace 3 horas'
    }
  ];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregado':
        return 'bg-green-100 text-green-800';
      case 'Enviado':
        return 'bg-blue-100 text-blue-800';
      case 'Procesando':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pendiente':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const statuses = ['all', 'Pendiente', 'Procesando', 'Enviado', 'Entregado'];

  return (
    <>
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10"
      >
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-xops-dark">Pedidos</h1>
              <p className="text-gray-600 mt-2">Gestiona todos los pedidos de tus clientes</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="p-8 space-y-8">
        {/* Filtros y búsqueda */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por cliente, producto o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-xops-blue focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-xops-blue focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'Todos los estados' : status}
              </option>
            ))}
          </select>
        </div>

        {/* Stats de pedidos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-xops-dark">
                  {mockOrders.filter(o => o.status === 'Pendiente').length}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Procesando</p>
                <p className="text-2xl font-bold text-xops-dark">
                  {mockOrders.filter(o => o.status === 'Procesando').length}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Enviados</p>
                <p className="text-2xl font-bold text-xops-dark">
                  {mockOrders.filter(o => o.status === 'Enviado').length}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Entregados</p>
                <p className="text-2xl font-bold text-xops-dark">
                  {mockOrders.filter(o => o.status === 'Entregado').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Lista de pedidos */}
        <Card className="border-0 shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-xops-dark mb-6">Pedidos Recientes</h2>
            
            <div className="space-y-4">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-6 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="space-y-1">
                      <p className="font-semibold text-xops-dark">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-xops-dark">{order.product}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-bold text-xops-dark text-lg">${order.amount.toLocaleString()}</p>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No se encontraron pedidos</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Orders;
