
import { motion } from 'framer-motion';
import { TrendingUp, Package, ShoppingCart, Eye } from 'lucide-react';
import StatsCard from '@/components/cards/StatsCard';

interface StatsSectionProps {
  productsCount: number;
}

const StatsSection = ({ productsCount }: StatsSectionProps) => {
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
      value: productsCount.toString(),
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

  return (
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
  );
};

export default StatsSection;
