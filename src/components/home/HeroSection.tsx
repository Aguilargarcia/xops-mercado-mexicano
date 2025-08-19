
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/config/mockData';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bannerScale = 1 + (scrollY * 0.0005);
  const bannerHeight = Math.max(450, 500 - scrollY * 0.3);

  return (
    <section 
      className="gradient-hero relative overflow-hidden flex items-center transition-all duration-300"
      style={{ 
        height: `${bannerHeight}px`,
        transform: `scale(${Math.min(bannerScale, 1.1)})`
      }}
    >
      {/* Seamstress Image - Full Background */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/35b2d951-f151-4a82-90de-388fc8448649.png" 
          alt="Costurera tradicional mexicana trabajando en su máquina de coser"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Content - Overlay Text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-archivo text-white mb-6 drop-shadow-lg">
            {SITE_CONFIG.tagline.split(' ').slice(0, 2).join(' ')}
            <span className="block text-white font-archivo-black text-5xl md:text-7xl">
              {SITE_CONFIG.tagline.split(' ').slice(2).join(' ')}
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 font-archivo drop-shadow-md">
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
