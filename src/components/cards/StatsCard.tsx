
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  positive?: boolean;
  route?: string;
  onClick?: () => void;
}

const StatsCard = ({ title, value, change, icon: Icon, positive = true, route, onClick }: StatsCardProps) => {
  const cardContent = (
    <Card className="p-12 border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer min-h-[280px]" onClick={onClick}>
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <p className="text-base text-gray-600 font-medium">{title}</p>
          <p className="text-3xl font-bold text-xops-dark">{value}</p>
          <p className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {change} vs mes anterior
          </p>
        </div>
        <div className="w-20 h-20 bg-gradient-to-br from-black/10 to-black/20 rounded-2xl flex items-center justify-center">
          <Icon className="w-10 h-10 text-black" />
        </div>
      </div>
    </Card>
  );

  if (route && !onClick) {
    return <Link to={route}>{cardContent}</Link>;
  }

  return cardContent;
};

export default StatsCard;
