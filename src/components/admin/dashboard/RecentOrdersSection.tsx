
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import OrderCard from '@/components/cards/OrderCard';

const RecentOrdersSection = () => {
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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="p-8 border-0 shadow-lg bg-white">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-archivo-black text-xops-dark">Pedidos Recientes</h2>
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
  );
};

export default RecentOrdersSection;
