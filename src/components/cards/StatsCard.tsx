
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
    <Card className="p-16 border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer min-h-[300px]" onClick={onClick}>
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <p className="text-lg text-gray-600 font-medium">{title}</p>
          <p className="text-5xl font-bold text-xops-dark">{value}</p>
          <p className={`text-lg font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {change} vs mes anterior
          </p>
        </div>
        <div className="w-24 h-24 bg-gradient-to-br from-xops-blue/10 to-xops-blue/20 rounded-2xl flex items-center justify-center">
          <Icon className="w-12 h-12 text-xops-blue" />
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
