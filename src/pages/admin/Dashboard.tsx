import { useState } from 'react';
import { motion } from 'framer-motion';
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
import ProductForm from '@/components/forms/ProductForm';
import QRLabel from '@/components/cards/QRLabel';
import StatsCard from '@/components/cards/StatsCard';
import OrderCard from '@/components/cards/OrderCard';
import { useProducts } from '@/hooks/useProducts';

const Dashboard = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const { products, addProduct, generateQRCode } = useProducts();

  // Datos de ejemplo para las estadísticas
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

  // Datos de ejemplo para pedidos recientes
  const recentOrders = [
    {
      id: "#001",
      customer: "María González",
      product: "Bolsa Artesanal",
      amount: 899,
      status: "Pendiente" as const,
      date: "Hace 2 horas"
    },
    {
      id: "#002",
      customer: "Carlos Ruiz",
      product: "Collar de Jade",
      amount: 650,
      status: "Procesando" as const,
      date: "Hace 4 horas"
    },
    {
      id: "#003",
      customer: "Ana Pérez",
      product: "Aretes de Plata",
      amount: 450,
      status: "Enviado" as const,
      date: "Hace 1 día"
    }
  ];

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
              <h1 className="text-3xl font-bold text-xops-dark">Dashboard</h1>
              <p className="text-gray-600 mt-2">Bienvenido de vuelta a tu panel de control de Xops</p>
            </div>
            <Button 
              className="bg-xops-blue hover:bg-xops-blue/90 text-white shadow-lg"
              onClick={() => setShowProductForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="p-8 space-y-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Acciones rápidas */}
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
            <Link to="/admin/settings">
              <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 cursor-pointer">
                <div className="flex items-center gap-4 text-xops-dark">
                  <Users className="w-8 h-8 text-xops-blue" />
                  <span className="font-semibold text-lg">Configuración</span>
                </div>
              </Card>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pedidos recientes */}
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
                  <OrderCard key={order.id} {...order} />
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Etiquetas QR */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            {products.length > 0 ? (
              products.slice(0, 2).map((product) => (
                <QRLabel
                  key={product.id}
                  product={product}
                  onGenerateQR={generateQRCode}
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

      {/* Modal del formulario de producto */}
      {showProductForm && (
        <ProductForm
          onSubmit={addProduct}
          onClose={() => setShowProductForm(false)}
        />
      )}
    </>
  );
};

export default Dashboard;
