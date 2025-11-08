import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Download, ShoppingCart, PackageCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Order } from '@/types';
import UnifiedSearch from '@/components/admin/UnifiedSearch';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Pendiente');
  const [orders, setOrders] = useState<Order[]>([
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
      status: 'Pendiente',
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
    },
    {
      id: '#006',
      customer: 'Pedro Sánchez',
      product: 'Anillo de Turquesa',
      amount: 380,
      status: 'Enviado',
      date: 'Hace 2 días'
    },
    {
      id: '#007',
      customer: 'Laura Torres',
      product: 'Pulsera Tejida',
      amount: 299,
      status: 'Entregado',
      date: 'Hace 5 días'
    }
  ]);

  const handleChangeStatus = (orderId: string, newStatus: 'Pendiente' | 'Enviado' | 'Entregado') => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const getFilteredOrders = (status: string) => {
    return orders.filter(order => {
      const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = order.status === status;
      return matchesSearch && matchesStatus;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregado':
        return 'bg-green-100 text-green-800';
      case 'Enviado':
        return 'bg-blue-100 text-blue-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (currentStatus: string): 'Enviado' | 'Entregado' | null => {
    switch (currentStatus) {
      case 'Pendiente':
        return 'Enviado';
      case 'Enviado':
        return 'Entregado';
      default:
        return null;
    }
  };

  const getStatusButtonLabel = (currentStatus: string): string => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return '';
    return nextStatus === 'Enviado' ? 'Marcar como Enviado' : 'Marcar como Entregado';
  };

  const renderOrdersList = (status: string) => {
    const filteredOrders = getFilteredOrders(status);
    
    return (
      <div className="space-y-4">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
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
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Ver
                </Button>
                
                {getNextStatus(order.status) && (
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => handleChangeStatus(order.id, getNextStatus(order.status)!)}
                  >
                    {getNextStatus(order.status) === 'Enviado' ? (
                      <Truck className="w-4 h-4 mr-1" />
                    ) : (
                      <PackageCheck className="w-4 h-4 mr-1" />
                    )}
                    {getStatusButtonLabel(order.status)}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron pedidos en {status}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-gray-100 sticky top-0 z-10"
      >
        <div className="px-8 py-5">
          <div className="flex items-center gap-6">
            <UnifiedSearch 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="p-8 space-y-8">

        {/* Stats de pedidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-xops-dark">
                  {orders.filter(o => o.status === 'Pendiente').length}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Enviados</p>
                <p className="text-2xl font-bold text-xops-dark">
                  {orders.filter(o => o.status === 'Enviado').length}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <PackageCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Entregados</p>
                <p className="text-2xl font-bold text-xops-dark">
                  {orders.filter(o => o.status === 'Entregado').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs de pedidos */}
        <Card className="border-0 shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-xops-dark mb-6">Gestión de Pedidos</h2>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="Pendiente" className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Pendientes ({orders.filter(o => o.status === 'Pendiente').length})
                </TabsTrigger>
                <TabsTrigger value="Enviado" className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Enviados ({orders.filter(o => o.status === 'Enviado').length})
                </TabsTrigger>
                <TabsTrigger value="Entregado" className="flex items-center gap-2">
                  <PackageCheck className="w-4 h-4" />
                  Completados ({orders.filter(o => o.status === 'Entregado').length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="Pendiente">
                {renderOrdersList('Pendiente')}
              </TabsContent>

              <TabsContent value="Enviado">
                {renderOrdersList('Enviado')}
              </TabsContent>

              <TabsContent value="Entregado">
                {renderOrdersList('Entregado')}
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Orders;
