
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/config/mockData';

const HeroSection = () => {

  return (
    <section className="relative overflow-hidden bg-white" style={{ height: 'calc(100vh - 56px)' }}>
      <div className="w-full h-full">
        {/* Full Width Image Container */}
        <div className="relative w-full h-full overflow-hidden">
          <img 
            src="/lovable-uploads/35b2d951-f151-4a82-90de-388fc8448649.png" 
            alt="Costurera tradicional mexicana trabajando en su máquina de coser"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/5"></div>
          
          {/* Centered Text and Button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-4xl md:text-6xl font-light font-montserrat text-white drop-shadow-lg mb-8">
              La nueva experiencia de comprar local.
            </p>
            <Link 
              to="/brands" 
              className="text-white font-montserrat text-base underline hover:text-white/80 transition-all duration-300 hover:scale-105 drop-shadow-lg"
            >
              Explorar
            </Link>
          </div>
        </div>
      </div>
      {/* Tiny white space indicator */}
      <div className="h-1 bg-white"></div>
    </section>
  );
};

export default HeroSection;
