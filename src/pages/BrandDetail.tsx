import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, MapPin, Users, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
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

  const brandProducts = [
    {
      id: 1,
      name: `Producto Artesanal ${brand.name}`,
      price: 899,
      originalPrice: 1200,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 124,
      isNew: true,
    },
    {
      id: 2,
      name: `Collar de ${brand.name}`,
      price: 650,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 89,
      isNew: false,
    },
    {
      id: 3,
      name: `Aretes ${brand.name}`,
      price: 450,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 156,
      isNew: false,
    },
    {
      id: 4,
      name: `Pulsera ${brand.name}`,
      price: 280,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 67,
      isNew: true,
    },
    {
      id: 5,
      name: `Bolsa Artesanal ${brand.name}`,
      price: 1250,
      originalPrice: 1500,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 203,
      isNew: false,
    },
    {
      id: 6,
      name: `Huaraches ${brand.name}`,
      price: 780,
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 91,
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Balanced Header Section */}
      <div className="relative bg-gradient-to-b from-muted/30 to-background">
        {/* Banner with proper height */}
        <div className="h-32 sm:h-40 bg-gradient-to-br from-primary/8 via-muted/30 to-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--muted)/0.5),transparent_50%)]" />
        </div>
        
        {/* Centered Brand Info */}
        <div className="relative -mt-10 sm:-mt-12 pb-5">
          <div className="flex flex-col items-center text-center px-4">
            {/* Logo */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-background rounded-full border-2 border-border/40 shadow-md flex items-center justify-center mb-3">
              <span className="text-primary font-bold text-2xl sm:text-3xl">
                {brand.name.charAt(0)}
              </span>
            </div>

            {/* Name & Badge */}
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-lg sm:text-xl font-bold text-foreground">{brand.name}</h1>
              {brand.verified && (
                <CheckCircle className="w-4 h-4 text-primary fill-primary/20" />
              )}
            </div>

            {/* Rating & Stats */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>{brand.rating}</span>
              </div>
              <span className="text-muted-foreground/40">•</span>
              <span>{brand.location}</span>
              <span className="text-muted-foreground/40">•</span>
              <span>{brand.followers.toLocaleString()} seguidores</span>
            </div>

            {/* Bio - Single line */}
            <p className="text-xs text-muted-foreground line-clamp-1 mb-3 max-w-md">
              {brand.description}
            </p>

            {/* Follow Button */}
            <Button 
              onClick={handleFollowToggle}
              variant={isCurrentlyFollowing ? "outline" : "default"}
              size="sm"
              className="h-8 px-5 text-xs rounded-full"
            >
              {isCurrentlyFollowing ? "Siguiendo" : "Seguir"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
        {/* Products Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">
              Productos
            </h2>
            <span className="text-xs text-muted-foreground">
              {brandProducts.length} productos
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {brandProducts.map((product) => (
              <div 
                key={product.id} 
                className="group bg-background rounded-xl border border-border/40 overflow-hidden hover:shadow-md hover:border-border transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-muted/20">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="bg-primary text-primary-foreground text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                        Nuevo
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-destructive text-destructive-foreground text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Like Button */}
                  <button 
                    onClick={() => toggleLike(product.id)}
                    className="absolute top-2 right-2 p-1.5 bg-background/90 backdrop-blur-sm rounded-full hover:bg-background transition-colors shadow-sm"
                  >
                    <Heart 
                      className={`w-3.5 h-3.5 ${
                        likedProducts.includes(product.id) 
                          ? 'text-destructive fill-destructive' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                  </button>
                </div>
                
                {/* Product Info */}
                <div className="p-2.5">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xs font-medium text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-1.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-[10px] text-muted-foreground">
                      {product.rating}
                    </span>
                  </div>
                  
                  {/* Price & Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-foreground">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-muted-foreground line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      className="h-7 w-7 rounded-full hover:bg-primary/10 hover:text-primary"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDetail;
