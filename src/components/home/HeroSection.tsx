
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/config/mockData';

const HeroSection = () => {

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Image Container */}
        <div className="flex justify-center">
          <div className="relative w-[600px] h-[350px] rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/lovable-uploads/35b2d951-f151-4a82-90de-388fc8448649.png" 
              alt="Costurera tradicional mexicana trabajando en su máquina de coser"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/5"></div>
            
            {/* Top Left Text */}
            <div className="absolute top-6 left-6">
              <h1 className="text-2xl md:text-3xl font-montserrat text-white drop-shadow-lg">
                Más que una plataforma.
              </h1>
            </div>
            
            {/* Bottom Right Text and Button */}
            <div className="absolute bottom-6 right-6 text-right">
              <p className="text-lg md:text-xl font-montserrat text-white mb-3 drop-shadow-lg">
                La nueva experiencia de comprar local.
              </p>
              <Link 
                to="/brands" 
                className="inline-block bg-white/90 hover:bg-white text-xops-blue font-montserrat text-sm px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Explorar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
