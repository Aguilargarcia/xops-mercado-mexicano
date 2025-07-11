
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Users, Eye, Edit, MoreHorizontal, Mail, Phone, Calendar, Tag, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CustomerDetailModal from '@/components/admin/CustomerDetailModal';
import AddCustomerModal from '@/components/admin/AddCustomerModal';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  lastPurchase?: string;
  lastInteraction: string;
  status: 'Nuevo' | 'Recurrente' | 'Inactivo';
  totalSpent: number;
  tags: string[];
  notes?: string;
  purchaseHistory: Array<{
    id: string;
    product: string;
    amount: number;
    date: string;
  }>;
}

interface Provider {
  id: string;
  name: string;
  type: string;
  contact: string;
  phone?: string;
  email?: string;
  city: string;
  lastContact: string;
  status: 'Activo' | 'Inactivo';
  tags: string[];
}

const CRM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [activeTab, setActiveTab] = useState('customers');

  // Datos de prueba para clientes
  const mockCustomers: Customer[] = [
    {
      id: '1',
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+52 55 1234 5678',
      lastPurchase: 'Bolsa Artesanal de Cuero',
      lastInteraction: 'Hace 2 horas',
      status: 'Recurrente',
      totalSpent: 2450,
      tags: ['VIP', 'Frecuente'],
      notes: 'Cliente muy satisfecha con productos de cuero',
      purchaseHistory: [
        { id: 'p1', product: 'Bolsa Artesanal de Cuero', amount: 899, date: '2024-01-15' },
        { id: 'p2', product: 'Collar de Jade Natural', amount: 650, date: '2024-01-10' },
        { id: 'p3', product: 'Aretes de Plata 925', amount: 450, date: '2024-01-05' }
      ]
    },
    {
      id: '2',
      name: 'Carlos Ruiz',
      email: 'carlos.ruiz@email.com',
      phone: '+52 55 9876 5432',
      lastPurchase: 'Collar de Jade Natural',
      lastInteraction: 'Hace 4 horas',
      status: 'Nuevo',
      totalSpent: 650,
      tags: ['Primera compra'],
      notes: 'Interesado en joyería natural',
      purchaseHistory: [
        { id: 'p4', product: 'Collar de Jade Natural', amount: 650, date: '2024-01-16' }
      ]
    },
    {
      id: '3',
      name: 'Ana Pérez',
      email: 'ana.perez@email.com',
      lastPurchase: 'Aretes de Plata 925',
      lastInteraction: 'Hace 1 día',
      status: 'Recurrente',
      totalSpent: 1350,
      tags: ['Plata', 'Elegante'],
      notes: 'Prefiere productos de plata',
      purchaseHistory: [
        { id: 'p5', product: 'Aretes de Plata 925', amount: 450, date: '2024-01-14' },
        { id: 'p6', product: 'Pulsera de Plata', amount: 900, date: '2024-01-08' }
      ]
    },
    {
      id: '4',
      name: 'Luis Hernández',
      email: 'luis.hernandez@email.com',
      phone: '+52 55 5555 1234',
      lastPurchase: 'Bolsa Artesanal de Cuero',
      lastInteraction: 'Hace 3 días',
      status: 'Inactivo',
      totalSpent: 899,
      tags: ['Inactivo'],
      notes: 'No ha realizado compras recientes',
      purchaseHistory: [
        { id: 'p7', product: 'Bolsa Artesanal de Cuero', amount: 899, date: '2023-12-20' }
      ]
    },
    {
      id: '5',
      name: 'Sofia Martínez',
      email: 'sofia.martinez@email.com',
      phone: '+52 55 7777 8888',
      lastPurchase: 'Collar de Jade Natural',
      lastInteraction: 'Hace 3 horas',
      status: 'Recurrente',
      totalSpent: 1850,
      tags: ['VIP', 'Jade'],
      notes: 'Gran apreciación por productos de jade',
      purchaseHistory: [
        { id: 'p8', product: 'Collar de Jade Natural', amount: 650, date: '2024-01-16' },
        { id: 'p9', product: 'Anillo de Jade', amount: 1200, date: '2024-01-12' }
      ]
    }
  ];

  // Datos de prueba para proveedores
  const mockProviders: Provider[] = [
    {
      id: '1',
      name: 'Textiles San Juan',
      type: 'Proveedor de Telas',
      contact: 'Juan Rodríguez',
      phone: '+52 55 1111 2222',
      email: 'juan@textiles-sj.com',
      city: 'Ciudad de México',
      lastContact: 'Hace 1 semana',
      status: 'Activo',
      tags: ['Algodón', 'Lino']
    },
    {
      id: '2',
      name: 'Botones y Accesorios López',
      type: 'Proveedor de Accesorios',
      contact: 'María López',
      phone: '+52 55 3333 4444',
      email: 'maria@botones-lopez.com',
      city: 'Guadalajara',
      lastContact: 'Hace 3 días',
      status: 'Activo',
      tags: ['Botones', 'Cremalleras']
    },
    {
      id: '3',
      name: 'Hilos Industriales del Norte',
      type: 'Proveedor de Hilos',
      contact: 'Carlos Mendez',
      phone: '+52 81 5555 6666',
      city: 'Monterrey',
      lastContact: 'Hace 2 semanas',
      status: 'Inactivo',
      tags: ['Hilos', 'Bordados']
    }
  ];

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredProviders = mockProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || provider.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recurrente':
        return 'bg-green-100 text-green-800';
      case 'Nuevo':
        return 'bg-blue-100 text-blue-800';
      case 'Inactivo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const statuses = activeTab === 'customers' 
    ? ['all', 'Nuevo', 'Recurrente', 'Inactivo']
    : ['all', 'Activo', 'Inactivo'];

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetail(true);
  };

  const handleAddCustomer = (customerData: Partial<Customer>) => {
    console.log('Nuevo cliente:', customerData);
    setShowAddCustomer(false);
  };

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
              <h1 className="text-3xl font-bold text-xops-dark">CRM</h1>
              <p className="text-gray-600 mt-2">Gestiona la relación con tus clientes</p>
            </div>
            <Button 
              className="btn-primary shadow-lg"
              onClick={() => setShowAddCustomer(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Cliente
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="p-8 space-y-8">
        {/* Tabs para Clientes y Proveedores */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="customers">Clientes</TabsTrigger>
            <TabsTrigger value="providers">Proveedores</TabsTrigger>
          </TabsList>

          <TabsContent value="customers">
            {/* Filtros y búsqueda para clientes */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o email..."
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

            {/* Stats de clientes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 border-0 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Clientes</p>
                    <p className="text-2xl font-bold text-xops-dark">{mockCustomers.length}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-0 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Recurrentes</p>
                    <p className="text-2xl font-bold text-xops-dark">
                      {mockCustomers.filter(c => c.status === 'Recurrente').length}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-0 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nuevos</p>
                    <p className="text-2xl font-bold text-xops-dark">
                      {mockCustomers.filter(c => c.status === 'Nuevo').length}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-0 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Inactivos</p>
                    <p className="text-2xl font-bold text-xops-dark">
                      {mockCustomers.filter(c => c.status === 'Inactivo').length}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Lista de clientes */}
            <Card className="border-0 shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-xops-dark mb-6">Base de Clientes</h2>
                
                <div className="space-y-4">
                  {filteredCustomers.map((customer, index) => (
                <motion.div
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-6 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-xops-blue to-xops-blue/80 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {customer.name.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-semibold text-xops-dark">{customer.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        {customer.email}
                      </div>
                      {customer.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          {customer.phone}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-xops-dark">
                        Última compra: {customer.lastPurchase}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {customer.lastInteraction}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right space-y-2">
                      <p className="font-bold text-xops-dark text-lg">
                        ${customer.totalSpent.toLocaleString()}
                      </p>
                      <Badge className={`text-xs ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {customer.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Enviar email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    </div>
                  </motion.div>
                ))}
                </div>

                {filteredCustomers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No se encontraron clientes</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="providers">
            {/* Filtros y búsqueda para proveedores */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o contacto..."
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

            {/* Stats de proveedores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 border-0 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Proveedores</p>
                    <p className="text-2xl font-bold text-xops-dark">{mockProviders.length}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-0 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Activos</p>
                    <p className="text-2xl font-bold text-xops-dark">
                      {mockProviders.filter(p => p.status === 'Activo').length}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-0 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Inactivos</p>
                    <p className="text-2xl font-bold text-xops-dark">
                      {mockProviders.filter(p => p.status === 'Inactivo').length}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Lista de proveedores */}
            <Card className="border-0 shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-xops-dark mb-6">Lista de Proveedores</h2>
                
                <div className="space-y-4">
                  {filteredProviders.map((provider, index) => (
                    <motion.div
                      key={provider.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-6 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-6 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            {provider.name.charAt(0)}
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          <h3 className="font-semibold text-xops-dark">{provider.name}</h3>
                          <p className="text-sm text-gray-600">{provider.type}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            {provider.contact}
                          </div>
                          {provider.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4" />
                              {provider.phone}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-xops-dark">
                            Ciudad: {provider.city}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {provider.lastContact}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right space-y-2">
                          <Badge className={`text-xs ${getStatusColor(provider.status)}`}>
                            {provider.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {provider.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Ver
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                Enviar email
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredProviders.length === 0 && (
                  <div className="text-center py-12">
                    <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No se encontraron proveedores</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modales */}
      {showCustomerDetail && selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          isOpen={showCustomerDetail}
          onClose={() => setShowCustomerDetail(false)}
        />
      )}

      {showAddCustomer && (
        <AddCustomerModal
          isOpen={showAddCustomer}
          onClose={() => setShowAddCustomer(false)}
          onSubmit={handleAddCustomer}
        />
      )}
    </>
  );
};

export default CRM;
