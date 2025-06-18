
import { Card } from '@/components/ui/card';

interface ProfileStatsProps {
  totalOrders: number;
  totalSpent: number;
  followedBrandsCount: number;
}

const ProfileStats = ({ totalOrders, totalSpent, followedBrandsCount }: ProfileStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 border-0 shadow-md text-center bg-gradient-to-br from-xops-blue/5 to-xops-blue/10">
        <p className="text-3xl font-bold text-xops-blue mb-1">{totalOrders}</p>
        <p className="text-sm text-gray-600">Pedidos Totales</p>
      </Card>
      
      <Card className="p-6 border-0 shadow-md text-center bg-gradient-to-br from-green-50 to-green-100">
        <p className="text-3xl font-bold text-green-600 mb-1">${totalSpent.toLocaleString()}</p>
        <p className="text-sm text-gray-600">Total Gastado</p>
      </Card>
      
      <Card className="p-6 border-0 shadow-md text-center bg-gradient-to-br from-purple-50 to-purple-100">
        <p className="text-3xl font-bold text-purple-600 mb-1">{followedBrandsCount}</p>
        <p className="text-sm text-gray-600">Marcas Seguidas</p>
      </Card>
    </div>
  );
};

export default ProfileStats;
