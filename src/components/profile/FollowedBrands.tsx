
import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Brand {
  id: number;
  name: string;
  category: string;
  location: string;
  followers: number;
}

interface FollowedBrandsProps {
  brands: Brand[];
}

const FollowedBrands = ({ brands }: FollowedBrandsProps) => {
  return (
    <Card className="p-6 border-0 shadow-lg bg-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-xops-blue/10 rounded-full flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-xops-blue" />
          </div>
          <h2 className="text-2xl font-bold text-xops-dark">Marcas Seguidas</h2>
        </div>
        <Link to="/brands" className="text-xops-blue hover:text-xops-blue/80 font-medium">
          Explorar más marcas
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {brands.map((brand) => (
          <div key={brand.id} className="flex items-center justify-between p-5 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-xops-blue/10 rounded-full flex items-center justify-center">
                <span className="text-xops-blue font-bold text-lg">
                  {brand.name.charAt(0)}
                </span>
              </div>
              <div>
                <Link to={`/brand/${brand.id}`} className="font-semibold text-xops-dark hover:text-xops-blue text-lg">
                  {brand.name}
                </Link>
                <p className="text-sm text-gray-600">{brand.category} • {brand.location}</p>
                <p className="text-xs text-gray-500">{brand.followers.toLocaleString()} seguidores</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-xops-blue/5 border-xops-blue text-xops-blue hover:bg-xops-blue hover:text-white">
              Siguiendo
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FollowedBrands;
