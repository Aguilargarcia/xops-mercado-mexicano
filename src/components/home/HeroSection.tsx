
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/config/mockData';

const HeroSection = () => {

  return (
    <section className="relative overflow-hidden h-[400px] bg-white">
      <div className="max-w-7xl mx-auto h-full flex">
        {/* Left side - Image taking 50% */}
        <div className="w-1/2 relative">
          <img 
            src="/lovable-uploads/35b2d951-f151-4a82-90de-388fc8448649.png" 
            alt="Costurera tradicional mexicana trabajando en su máquina de coser"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* Right side - Text content taking 50% */}
        <div className="w-1/2 flex items-center justify-center px-8 lg:px-16">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-montserrat text-xops-dark mb-6">
              Más que una plataforma.
            </h1>
            <Link 
              to="/brands" 
              className="font-montserrat text-lg md:text-xl text-xops-blue underline hover:text-xops-blue/80 transition-colors duration-300 inline-block"
            >
              Explorar marcas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
