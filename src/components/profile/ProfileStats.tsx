
import { Card } from '@/components/ui/card';

interface ProfileStatsProps {
  totalOrders: number;
  totalSpent: number;
  followedBrandsCount: number;
}

const ProfileStats = ({ totalOrders, totalSpent, followedBrandsCount }: ProfileStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 border-0 shadow-md text-center bg-xops-blue">
        <p className="text-3xl font-bold text-white mb-1">{totalOrders}</p>
        <p className="text-sm text-white/80">Pedidos Totales</p>
      </Card>
      
      <Card className="p-6 border-0 shadow-md text-center bg-xops-blue">
        <p className="text-3xl font-bold text-white mb-1">${totalSpent.toLocaleString()}</p>
        <p className="text-sm text-white/80">Total Gastado</p>
      </Card>
      
      <Card className="p-6 border-0 shadow-md text-center bg-xops-blue">
        <p className="text-3xl font-bold text-white mb-1">{followedBrandsCount}</p>
        <p className="text-sm text-white/80">Marcas Seguidas</p>
      </Card>
    </div>
  );
};

export default ProfileStats;
