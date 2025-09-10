
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/config/mockData';

const HeroSection = () => {

  return (
    <section className="relative overflow-hidden bg-white h-screen">
      <div className="w-full h-full">
        {/* Full Width Image Container */}
        <div className="relative w-full h-full overflow-hidden">
          <img 
            src="/lovable-uploads/35b2d951-f151-4a82-90de-388fc8448649.png" 
            alt="Costurera tradicional mexicana trabajando en su máquina de coser"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/5"></div>
          
          {/* Top Left Text */}
          <div className="absolute top-6 left-6">
            <h1 className="text-lg md:text-xl font-montserrat text-white drop-shadow-lg">
              Más que una plataforma,
            </h1>
          </div>
          
          {/* Bottom Right Text */}
          <div className="absolute bottom-6 right-6 text-right">
            <p className="text-lg md:text-xl font-montserrat text-white drop-shadow-lg">
              La nueva experiencia de comprar local.
            </p>
          </div>
          
          {/* Centered Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Link 
              to="/brands" 
              className="text-white font-montserrat text-lg underline hover:text-white/80 transition-all duration-300 hover:scale-105 drop-shadow-lg"
            >
              Explorar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
