
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/config/mockData';

const HeroSection = () => {

  return (
    <section 
      className="gradient-hero relative overflow-hidden flex items-center h-[500px]"
    >
      {/* Seamstress Image - Full Background */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/35b2d951-f151-4a82-90de-388fc8448649.png" 
          alt="Costurera tradicional mexicana trabajando en su máquina de coser"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Content - Overlay Text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="ml-auto max-w-md text-right">
          <h1 className="text-lg md:text-xl font-montserrat text-white mb-4 drop-shadow-lg">
            más que una plataforma
          </h1>
          <Link to="/brands" className="font-montserrat text-lg text-white underline hover:text-gray-200 transition-colors duration-300">
            Comprar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
