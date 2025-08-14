
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/config/mockData';

const HeroSection = () => {
  return (
    <section className="gradient-hero py-8 md:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-archivo text-xops-dark mb-6">
              {SITE_CONFIG.tagline.split(' ').slice(0, 2).join(' ')}
              <span className="block text-xops-blue font-archivo-black text-5xl md:text-7xl">
                {SITE_CONFIG.tagline.split(' ').slice(2).join(' ')}
              </span>
            </h1>
            <p className="text-xl text-xops-dark/80 mb-8 max-w-2xl mx-auto lg:mx-0 font-archivo">
              {SITE_CONFIG.description}
            </p>
            <Button className="btn-primary text-lg px-8 py-4">
              Explorar Marcas
            </Button>
          </div>
          
          {/* Seamstress Image */}
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="/lovable-uploads/35b2d951-f151-4a82-90de-388fc8448649.png" 
                alt="Costurera tradicional mexicana trabajando en su máquina de coser"
                className="w-full h-auto rounded-lg shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-xops-cream/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
