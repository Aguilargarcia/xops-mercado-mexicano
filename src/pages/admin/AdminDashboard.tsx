
import { useState } from 'react';
import { motion } from 'framer-motion';
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
  Settings,
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAdminStore } from '@/hooks/useAdminStore';
import BrandSelector from '@/components/admin/BrandSelector';
import ProductForm from '@/components/admin/ProductForm';
import QRLabelGenerator from '@/components/admin/QRLabelGenerator';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const location = useLocation();
  
  const { 
    currentBrand, 
    setCurrentBrand, 
    availableBrands, 
    products, 
    addProduct, 
    generateQR 
  } = useAdminStore();

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
      value: products.length.toString(),
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
    },
    {
      name: 'Opciones',
      path: '/admin/settings',
      icon: Settings
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-xops-cream flex">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white shadow-xl transition-all duration-300 flex flex-col border-r border-gray-100`}
      >
        {/* Logo y Selector de Marca */}
        <div className="p-6 border-b border-gray-100">
          {sidebarOpen ? (
            <BrandSelector 
              currentBrand={currentBrand}
              brands={availableBrands}
              onBrandChange={setCurrentBrand}
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-xops-blue to-xops-blue/80 rounded-xl flex items-center justify-center shadow-md mx-auto">
              <span className="text-white font-bold text-lg">X</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group ${
                    isActive(item.path) 
                      ? 'bg-gradient-to-r from-xops-blue to-xops-blue/90 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-xops-blue/5 hover:text-xops-blue hover:shadow-sm'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${
                    isActive(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-xops-blue'
                  }`} />
                  {sidebarOpen && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Footer con Toggle y Logout */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full justify-center hover:bg-gray-50"
          >
            <Menu className="w-4 h-4" />
            {sidebarOpen && <span className="ml-2">Contraer</span>}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span className="ml-2">Cerrar Sesión</span>}
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10"
        >
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-xops-dark">Dashboard</h1>
                <p className="text-gray-600 mt-2">Bienvenido de vuelta a tu panel de control de {currentBrand.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  className="btn-primary shadow-lg"
                  onClick={() => setShowProductForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Producto
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="p-8 space-y-8">
          {/* Stats Grid con más espacio */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold text-xops-dark">{stat.value}</p>
                      <p className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} vs mes anterior
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-xops-blue/10 to-xops-blue/20 rounded-2xl flex items-center justify-center">
                      <stat.icon className="w-8 h-8 text-xops-blue" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions con más espacio */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/admin/inventory">
                <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-xops-blue to-xops-blue/90 text-white border-0 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <Plus className="w-8 h-8" />
                    <span className="font-semibold text-lg">Agregar Producto</span>
                  </div>
                </Card>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/admin/orders">
                <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 cursor-pointer">
                  <div className="flex items-center gap-4 text-xops-dark">
                    <ShoppingCart className="w-8 h-8 text-xops-blue" />
                    <span className="font-semibold text-lg">Ver Pedidos</span>
                  </div>
                </Card>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/admin/qr-scan">
                <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 cursor-pointer">
                  <div className="flex items-center gap-4 text-xops-dark">
                    <QrCode className="w-8 h-8 text-xops-blue" />
                    <span className="font-semibold text-lg">Escanear QR</span>
                  </div>
                </Card>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 cursor-pointer">
                <div className="flex items-center gap-4 text-xops-dark">
                  <Users className="w-8 h-8 text-xops-blue" />
                  <span className="font-semibold text-lg">Gestionar Marca</span>
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-8 border-0 shadow-lg bg-white">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold text-xops-dark">Pedidos Recientes</h2>
                  <Link to="/admin/orders" className="text-xops-blue hover:text-xops-blue/80 text-sm font-medium">
                    Ver todos
                  </Link>
                </div>

                <div className="space-y-6">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                      <div className="space-y-1">
                        <p className="font-semibold text-xops-dark">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.product}</p>
                      </div>
                      
                      <div className="text-right space-y-2">
                        <p className="font-bold text-xops-dark text-lg">${order.amount.toLocaleString()}</p>
                        <span className={`text-xs px-3 py-2 rounded-full font-medium ${
                          order.status === 'Enviado' ? 'bg-green-100 text-green-800' :
                          order.status === 'Procesando' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* QR Labels para productos existentes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-6"
            >
              {products.length > 0 ? (
                products.slice(0, 2).map((product) => (
                  <QRLabelGenerator
                    key={product.id}
                    product={product}
                    onGenerateQR={generateQR}
                  />
                ))
              ) : (
                <Card className="p-8 border-0 shadow-lg bg-white">
                  <h2 className="text-2xl font-semibold text-xops-dark mb-6">Etiquetas QR</h2>
                  <div className="bg-gradient-to-br from-xops-blue/5 to-xops-blue/10 rounded-xl p-12 text-center">
                    <QrCode className="w-16 h-16 text-xops-blue/60 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Agrega productos para generar etiquetas QR</p>
                    <p className="text-sm text-gray-500 mt-1">Las etiquetas facilitarán las ventas</p>
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          onSubmit={addProduct}
          onClose={() => setShowProductForm(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
