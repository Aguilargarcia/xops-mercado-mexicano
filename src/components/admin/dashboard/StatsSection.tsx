
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Package, ShoppingCart, Eye } from 'lucide-react';
import StatsCard from '@/components/cards/StatsCard';
import StatsChart from './StatsChart';

interface StatsSectionProps {
  productsCount: number;
}

const StatsSection = ({ productsCount }: StatsSectionProps) => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [showChart, setShowChart] = useState(false);
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

  // Mock data for charts
  const getChartData = (statIndex: number) => {
    const baseData = [
      { month: 'Ene', value: Math.floor(Math.random() * 1000) + 500 },
      { month: 'Feb', value: Math.floor(Math.random() * 1000) + 600 },
      { month: 'Mar', value: Math.floor(Math.random() * 1000) + 700 },
      { month: 'Abr', value: Math.floor(Math.random() * 1000) + 800 },
      { month: 'May', value: Math.floor(Math.random() * 1000) + 900 },
      { month: 'Jun', value: Math.floor(Math.random() * 1000) + 1000 },
    ];
    
    if (statIndex === 0) return baseData.map(d => ({ ...d, value: d.value * 12 })); // Sales
    if (statIndex === 1) return baseData.map(d => ({ ...d, value: Math.floor(d.value / 50) })); // Products
    if (statIndex === 2) return baseData.map(d => ({ ...d, value: Math.floor(d.value / 100) })); // Orders
    return baseData; // Visitors
  };

  const handleStatClick = (statIndex: number, title: string) => {
    setSelectedStat(title);
    setShowChart(true);
  };

  // Routes mapping for each stat card
  const statsWithRoutes = [
    {
      ...stats[0],
      onClick: () => handleStatClick(0, stats[0].title)
    },
    {
      ...stats[1], 
      onClick: () => handleStatClick(1, stats[1].title)
    },
    {
      ...stats[2],
      onClick: () => handleStatClick(2, stats[2].title)
    },
    {
      ...stats[3],
      onClick: () => handleStatClick(3, stats[3].title)
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {statsWithRoutes.map((stat, index) => (
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
      
      {selectedStat && (
        <StatsChart
          isOpen={showChart}
          onClose={() => setShowChart(false)}
          title={selectedStat}
          data={getChartData(stats.findIndex(s => s.title === selectedStat))}
        />
      )}
    </>
  );
};

export default StatsSection;
