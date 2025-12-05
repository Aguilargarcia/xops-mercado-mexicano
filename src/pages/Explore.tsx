import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/shared/Footer';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'men',
    name: 'Hombre',
    description: 'Ropa y accesorios para hombre con estilo mexicano auténtico',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&auto=format&fit=crop&q=60',
    path: '/men'
  },
  {
    id: 'women',
    name: 'Mujer',
    description: 'Moda femenina con tradición artesanal mexicana',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=60',
    path: '/women'
  },
  {
    id: 'kids',
    name: 'Niños',
    description: 'Ropa cómoda y colorida para los más pequeños',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format&fit=crop&q=60',
    path: '/kids'
  },
  {
    id: 'accessories',
    name: 'Accesorios',
    description: 'Complementos únicos hechos a mano por artesanos locales',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&auto=format&fit=crop&q=60',
    path: '/accessories'
  }
];

const Explore = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-xops-dark mb-4">
            Explora Nuestras Categorías
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre productos auténticos mexicanos organizados por categoría. 
            Cada pieza cuenta una historia de tradición y artesanía.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                  {category.name}
                </h2>
                <p className="text-white/80 text-sm md:text-base mb-4 max-w-sm">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all duration-300">
                  <span>Ver productos</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Brands Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-xops-dark mb-4">
            ¿Buscas marcas específicas?
          </h2>
          <p className="text-gray-600 mb-6">
            Explora todas las marcas mexicanas que forman parte de nuestra comunidad
          </p>
          <Link
            to="/brands"
            className="inline-flex items-center gap-2 px-6 py-3 bg-xops-blue text-white rounded-full font-medium hover:bg-xops-blue/90 transition-colors"
          >
            Ver todas las marcas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;
