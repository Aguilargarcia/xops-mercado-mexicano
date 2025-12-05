import { Link } from 'react-router-dom';
import { MapPin, Users, Star, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/shared/Footer';
import { useBrandFollow, MOCK_BRANDS } from '@/contexts/BrandFollowContext';
import { useToast } from '@/hooks/use-toast';
import BrandProductCarousel from '@/components/brands/BrandProductCarousel';
import { Button } from '@/components/ui/button';

const Brands = () => {
  const { isFollowing, followBrand, unfollowBrand } = useBrandFollow();
  const { toast } = useToast();

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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3">
            Marcas Mexicanas
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Descubre y conecta con las marcas más auténticas de México. Cada una cuenta una historia de tradición, arte y pasión.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="space-y-16">
          {MOCK_BRANDS.map((brand) => (
            <div key={brand.id} className="group">
              {/* Brand Header */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                {/* Brand Logo/Image */}
                <Link 
                  to={`/brand/${brand.id}`}
                  className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </Link>
                
                {/* Brand Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <Link to={`/brand/${brand.id}`}>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground hover:text-xops-blue transition-colors cursor-pointer mb-1">
                          {brand.name}
                        </h2>
                      </Link>
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full mb-3">
                        {brand.category}
                      </span>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
                        {brand.description}
                      </p>
                    </div>
                    
                    {/* Follow Button */}
                    <Button
                      onClick={() => handleFollowToggle(brand)}
                      variant={isFollowing(brand.id) ? "secondary" : "default"}
                      className="self-start whitespace-nowrap"
                    >
                      {isFollowing(brand.id) ? 'Siguiendo' : 'Seguir'}
                    </Button>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-5 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{brand.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{brand.followers.toLocaleString()} seguidores</span>
                    </div>
                    {brand.rating && (
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{brand.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Carousel */}
              <div className="pl-0 md:pl-[calc(9rem+1.5rem)]">
                <BrandProductCarousel brandId={String(brand.id)} />
              </div>

              {/* View Brand Link */}
              <div className="pl-0 md:pl-[calc(9rem+1.5rem)] mt-4">
                <Link 
                  to={`/brand/${brand.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-xops-blue hover:text-xops-blue/80 transition-colors group/link"
                >
                  Ver todos los productos
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>

              {/* Divider */}
              <div className="h-px bg-border mt-10" />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Brands;
