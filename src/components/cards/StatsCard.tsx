
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
}

const StatsCard = ({ title, value, change, icon: Icon, positive = true, route }: StatsCardProps) => {
  const cardContent = (
    <Card className="p-10 border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <p className="text-base text-gray-600 font-medium">{title}</p>
          <p className="text-4xl font-bold text-xops-dark">{value}</p>
          <p className={`text-base font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {change} vs mes anterior
          </p>
        </div>
        <div className="w-20 h-20 bg-gradient-to-br from-xops-blue/10 to-xops-blue/20 rounded-2xl flex items-center justify-center">
          <Icon className="w-10 h-10 text-xops-blue" />
        </div>
      </div>
    </Card>
  );

  if (route) {
    return <Link to={route}>{cardContent}</Link>;
  }

  return cardContent;
};

export default StatsCard;
