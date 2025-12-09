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
      
      {/* Hero Banner */}
      <div className="relative h-48 sm:h-64 bg-gradient-to-br from-muted/50 via-background to-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(var(--primary)/0.05),transparent_50%)]" />
      </div>

      {/* Brand Info - Centered below banner */}
      <div className="relative -mt-16 sm:-mt-20 mb-8">
        <div className="flex flex-col items-center text-center px-4">
          {/* Logo */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 bg-background rounded-full border-4 border-background shadow-lg flex items-center justify-center mb-4">
            <span className="text-primary font-bold text-4xl sm:text-5xl">
              {brand.name.charAt(0)}
            </span>
          </div>

          {/* Brand Name & Verified Badge */}
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{brand.name}</h1>
            {brand.verified && (
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary fill-primary/20" />
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(brand.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30 fill-muted-foreground/30'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {brand.rating} · 347 reseñas
            </span>
          </div>

          {/* Location & Followers */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{brand.location}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{brand.followers.toLocaleString()} seguidores</span>
            </div>
          </div>

          {/* Follow Button */}
          <Button 
            onClick={handleFollowToggle}
            variant={isCurrentlyFollowing ? "outline" : "default"}
            className="px-8 rounded-full"
          >
            {isCurrentlyFollowing ? "Siguiendo" : "Seguir"}
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Story / Bio Section */}
        <div className="mb-10">
          <div className="bg-muted/30 rounded-2xl p-6 sm:p-8 border border-border/50">
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full" />
              Nuestra Historia
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {brand.longDescription || brand.description}
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Cada pieza que creamos cuenta una historia de tradición, pasión y dedicación. Trabajamos directamente con artesanos locales para preservar técnicas ancestrales mientras creamos diseños contemporáneos que celebran la riqueza cultural de México.
            </p>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Productos
            </h2>
            <span className="text-sm text-muted-foreground">
              {brandProducts.length} productos
            </span>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {brandProducts.map((product) => (
              <div 
                key={product.id} 
                className="group bg-background rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg hover:border-border transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-muted/30">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                        Nuevo
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-destructive text-destructive-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Like Button */}
                  <button 
                    onClick={() => toggleLike(product.id)}
                    className="absolute top-3 right-3 p-2.5 bg-background/90 backdrop-blur-sm rounded-full hover:bg-background transition-colors shadow-sm"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        likedProducts.includes(product.id) 
                          ? 'text-destructive fill-destructive' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                  </button>
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  
                  {/* Price & Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-foreground">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="h-9 w-9 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
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
