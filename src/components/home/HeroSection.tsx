
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/config/mockData';

const HeroSection = () => {
  return (
    <section className="gradient-hero relative overflow-hidden h-[500px] flex items-center">
      {/* Seamstress Image - Full Height Background on Left */}
      <div className="absolute inset-0 w-1/2 left-0">
        <img 
          src="/lovable-uploads/35b2d951-f151-4a82-90de-388fc8448649.png" 
          alt="Costurera tradicional mexicana trabajando en su máquina de coser"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-xops-cream/40"></div>
      </div>
      
      {/* Content - Right Side */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl ml-auto">
          <h1 className="text-4xl md:text-6xl font-archivo text-xops-dark mb-6">
            {SITE_CONFIG.tagline.split(' ').slice(0, 2).join(' ')}
            <span className="block text-xops-blue font-archivo-black text-5xl md:text-7xl">
              {SITE_CONFIG.tagline.split(' ').slice(2).join(' ')}
            </span>
          </h1>
          <p className="text-xl text-xops-dark/80 mb-8 font-archivo">
            {SITE_CONFIG.description}
          </p>
          <Button className="btn-primary text-lg px-8 py-4">
            Explorar Marcas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
