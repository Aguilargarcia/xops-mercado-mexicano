
import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBrandFollow } from '@/contexts/BrandFollowContext';
import { useToast } from '@/hooks/use-toast';

const FollowedBrands = () => {
  const { followedBrands, unfollowBrand } = useBrandFollow();
  const { toast } = useToast();

  const handleUnfollow = (brandId: number, brandName: string) => {
    unfollowBrand(brandId);
    toast({
      title: "Has dejado de seguir a " + brandName,
      description: "Ya no recibirás actualizaciones de esta marca",
    });
  };
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

      {followedBrands.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Aún no sigues ninguna marca</p>
          <Link to="/brands" className="text-xops-blue hover:text-xops-blue/80 font-medium">
            Descubre marcas para seguir
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {followedBrands.map((brand) => (
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
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-red-50 border-red-300 text-red-600 hover:bg-red-500 hover:text-white"
              onClick={() => handleUnfollow(brand.id, brand.name)}
            >
              Dejar de seguir
            </Button>
          </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default FollowedBrands;
