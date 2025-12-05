import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, Star } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useBrandFollow, MOCK_BRANDS } from '@/contexts/BrandFollowContext';
import { useToast } from '@/hooks/use-toast';
import BrandProductCarousel from '@/components/brands/BrandProductCarousel';

const Brands = () => {
  const { isFollowing, followBrand, unfollowBrand } = useBrandFollow();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', 'Artesanías', 'Textiles', 'Joyería', 'Calzado'];

  const filteredBrands = MOCK_BRANDS.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || brand.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFollowToggle = (brand: typeof MOCK_BRANDS[0]) => {
    const isCurrentlyFollowing = isFollowing(brand.id);
    
    if (isCurrentlyFollowing) {
      unfollowBrand(brand.id);
      toast({
        title: "Has dejado de seguir a " + brand.name,
        description: "Ya no recibirás actualizaciones de esta marca",
      });
    } else {
      followBrand(brand);
      toast({
        title: "Ahora sigues a " + brand.name,
        description: "Recibirás actualizaciones sobre nuevos productos y ofertas",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-xops-dark mb-4">Marcas Mexicanas</h1>
          <p className="text-gray-600">Descubre y sigue las marcas más auténticas de México</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar marcas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Brands List */}
        <div className="space-y-6">
          {filteredBrands.map((brand) => (
            <Card key={brand.id} className="overflow-hidden border border-gray-100 shadow-sm bg-white">
              {/* Brand Header */}
              <div className="flex p-4 border-b border-gray-50">
                <div className="relative w-32 flex-shrink-0">
                  <Link to={`/brand/${brand.id}`}>
                    <img 
                      src={brand.image} 
                      alt={brand.name}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </Link>
                </div>
                
                <div className="flex-1 pl-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-xops-blue/10 rounded-full flex items-center justify-center">
                        <span className="text-xops-blue font-bold text-sm">
                          {brand.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <Link to={`/brand/${brand.id}`}>
                          <h3 className="font-semibold text-xops-dark hover:text-xops-blue transition-colors cursor-pointer">
                            {brand.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-500">{brand.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{brand.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{brand.followers.toLocaleString()}</span>
                      </div>
                      {brand.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-xops-dark fill-xops-dark" />
                          <span>{brand.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-xs mt-2 line-clamp-2">{brand.description}</p>
                </div>
              </div>

              {/* Product Carousel */}
              <div className="px-4 py-3 bg-gray-50/50">
                <BrandProductCarousel brandId={String(brand.id)} />
              </div>
            </Card>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron marcas que coincidan con tu búsqueda</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todas');
              }}
              className="mt-4"
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;
