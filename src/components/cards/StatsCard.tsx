
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  positive?: boolean;
}

const StatsCard = ({ title, value, change, icon: Icon, positive = true }: StatsCardProps) => {
  return (
    <Card className="p-8 border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-3xl font-bold text-xops-dark">{value}</p>
          <p className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {change} vs mes anterior
          </p>
        </div>
        <div className="w-16 h-16 bg-gradient-to-br from-xops-blue/10 to-xops-blue/20 rounded-2xl flex items-center justify-center">
          <Icon className="w-8 h-8 text-xops-blue" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
