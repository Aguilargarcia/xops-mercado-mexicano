
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/config/mockData';

const HeroSection = () => {
  return (
    <section className="gradient-hero py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-archivo text-xops-dark mb-6">
          {SITE_CONFIG.tagline.split(' ').slice(0, 2).join(' ')}
          <span className="block text-xops-blue font-archivo-black text-5xl md:text-7xl">
            {SITE_CONFIG.tagline.split(' ').slice(2).join(' ')}
          </span>
        </h1>
        <p className="text-xl text-xops-dark/80 mb-8 max-w-2xl mx-auto font-archivo">
          {SITE_CONFIG.description}
        </p>
        <Button className="btn-primary text-lg px-8 py-4">
          Explorar Marcas
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
