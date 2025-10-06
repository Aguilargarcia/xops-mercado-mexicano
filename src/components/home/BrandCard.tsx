import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface BrandCardProps {
  brand: {
    name: string;
    category: string;
    description: string;
    image: string;
  };
}

const BrandCard = ({ brand }: BrandCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 border border-border overflow-hidden"
      onClick={() => navigate('/brands')}
    >
      <CardContent className="p-0">
        {/* Brand Image */}
        <div className="relative h-40 overflow-hidden bg-muted">
          <img
            src={brand.image}
            alt={brand.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-xops-black">{brand.category}</span>
          </div>
        </div>

        {/* Brand Info */}
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-xops-black transition-colors">
            {brand.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {brand.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandCard;
