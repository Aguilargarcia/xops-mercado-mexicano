
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, MapPin, Users, Eye } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useBrandFollow, MOCK_BRANDS } from '@/contexts/BrandFollowContext';
import { useToast } from '@/hooks/use-toast';

const BrandDetail = () => {
  const { id } = useParams();
  const { isFollowing, followBrand, unfollowBrand } = useBrandFollow();
  const { toast } = useToast();
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const brandId = parseInt(id || '1');
  const currentBrand = MOCK_BRANDS.find(brand => brand.id === brandId);
  const isCurrentlyFollowing = isFollowing(brandId);

  const handleFollowToggle = () => {
    if (!currentBrand) return;

    if (isCurrentlyFollowing) {
      unfollowBrand(brandId);
      toast({
        title: "Has dejado de seguir a " + currentBrand.name,
        description: "Ya no recibirás actualizaciones de esta marca",
      });
    } else {
      followBrand(currentBrand);
      toast({
        title: "Ahora sigues a " + currentBrand.name,
        description: "Recibirás actualizaciones sobre nuevos productos y ofertas",
      });
    }
  };

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Use the brand from our context or fallback to a default
  const brand = currentBrand || {
    id: brandId,
    name: "Marca No Encontrada",
    description: "Esta marca no está disponible",
    longDescription: "Lo sentimos, esta marca no está disponible en este momento.",
    category: "General",
    location: "México",
    image: "/placeholder.svg",
    logo: "/placeholder.svg",
    rating: 0,
    followers: 0,
    verified: false,
    products: []
  };

  // Mock products for the brand
  const brandProducts = [
    {
      id: 1,
      name: `Producto Artesanal ${brand.name}`,
      price: 899,
      originalPrice: 1200,
      image: "/placeholder.svg",
      rating: 4.8,
      isNew: true,
    },
    {
      id: 2,
      name: `Collar de ${brand.name}`,
      price: 650,
      image: "/placeholder.svg",
      rating: 4.7,
      isNew: false,
    },
    {
      id: 3,
      name: `Aretes ${brand.name}`,
      price: 450,
      image: "/placeholder.svg",
      rating: 4.9,
      isNew: false,
    },
    {
      id: 4,
      name: `Pulsera ${brand.name}`,
      price: 280,
      image: "/placeholder.svg",
      rating: 4.6,
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-xops-cream">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Brand Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-xops-blue/10 rounded-full flex items-center justify-center">
                <span className="text-xops-blue font-bold text-4xl">
                  {brand.name.charAt(0)}
                </span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-xops-dark">{brand.name}</h1>
                {brand.verified && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Verificada
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-4">{brand.description}</p>
              
              <div className="flex items-center gap-6 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{brand.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{brand.followers.toLocaleString()} seguidores</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{brand.rating}</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleFollowToggle}
                  className={isCurrentlyFollowing ? "btn-secondary" : "btn-primary"}
                >
                  {isCurrentlyFollowing ? "Dejar de seguir" : "Seguir"}
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver tienda
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <Card className="p-6 mb-8 border-0 shadow-md bg-white">
          <h2 className="text-xl font-semibold text-xops-dark mb-4">Sobre la Marca</h2>
          <p className="text-gray-600 leading-relaxed">{brand.longDescription}</p>
        </Card>

        {/* Products Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-xops-dark mb-6">Productos de {brand.name}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandProducts.map((product) => (
              <Card key={product.id} className="card-hover overflow-hidden border-0 shadow-md bg-white">
                <div className="relative">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-xops-blue text-white text-xs px-2 py-1 rounded-full">
                      Nuevo
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                  <button 
                    onClick={() => toggleLike(product.id)}
                    className="absolute bottom-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        likedProducts.includes(product.id) 
                          ? 'text-red-500 fill-red-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </button>
                </div>
                
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-xops-dark mb-2 hover:text-xops-blue transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-xops-dark">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Button size="sm" className="bg-xops-blue hover:bg-xops-blue/90">
                      <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDetail;
