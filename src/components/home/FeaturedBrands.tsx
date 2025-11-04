
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { FEATURED_BRANDS } from '@/config/mockData';

const FeaturedBrands = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-archivo text-xops-dark mb-4">Marcas Destacadas</h2>
          <p className="text-lg text-xops-dark/70 font-archivo">
            Conoce a los artesanos y emprendedores detrás de cada producto
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {FEATURED_BRANDS.slice(0, 4).map((brand, index) => (
            <Link key={index} to={`/brand/${index + 1}`}>
              <Card className="card-hover text-center p-6 border-0 shadow-md bg-white">
                <div className="w-16 h-16 bg-xops-blue/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xops-blue font-archivo text-xl">
                    {brand.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-archivo text-xops-dark mb-1">{brand.name}</h3>
                <p className="text-sm text-gray-600 font-archivo">{brand.category}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
