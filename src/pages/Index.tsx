
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const featuredProducts = [
    {
      id: 1,
      name: "Bolsa Artesanal Oaxaca",
      brand: "Tlalli",
      price: 899,
      originalPrice: 1200,
      image: "/placeholder.svg",
      rating: 4.8,
      isNew: true,
    },
    {
      id: 2,
      name: "Playera Bordada Yucatán",
      brand: "Raíces",
      price: 450,
      image: "/placeholder.svg",
      rating: 4.9,
      isNew: false,
    },
    {
      id: 3,
      name: "Joyería Plata Taxco",
      brand: "Metales MX",
      price: 1250,
      image: "/placeholder.svg",
      rating: 4.7,
      isNew: true,
    },
    {
      id: 4,
      name: "Huaraches Michoacán",
      brand: "Pies de Barro",
      price: 780,
      image: "/placeholder.svg",
      rating: 4.6,
      isNew: false,
    },
  ];

  const brands = [
    { name: "Tlalli", category: "Artesanías", image: "/placeholder.svg" },
    { name: "Raíces", category: "Textiles", image: "/placeholder.svg" },
    { name: "Metales MX", category: "Joyería", image: "/placeholder.svg" },
    { name: "Pies de Barro", category: "Calzado", image: "/placeholder.svg" },
  ];

  return (
    <div className="min-h-screen bg-xops-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-xops-dark mb-6">
            Descubre México
            <span className="block text-xops-blue">una marca a la vez</span>
          </h1>
          <p className="text-xl text-xops-dark/80 mb-8 max-w-2xl mx-auto">
            Conectamos contigo con las marcas mexicanas más auténticas y emergentes. 
            Productos únicos, historias reales.
          </p>
          <Button className="btn-primary text-lg px-8 py-4">
            Explorar Marcas
          </Button>
        </div>
      </section>

      {/* For You Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-xops-dark">Para Ti</h2>
            <Link to="/brands" className="text-xops-blue hover:text-xops-blue/80 font-medium">
              Ver todo
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="card-hover overflow-hidden border-0 shadow-md bg-white">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-xops-blue text-white text-xs px-2 py-1 rounded-full">
                      Nuevo
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                  <button 
                    onClick={() => toggleLike(product.id)}
                    className="absolute bottom-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        likedProducts.includes(product.id) 
                          ? 'text-red-500 fill-red-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </button>
                </div>
                
                <div className="p-4">
                  <Link to={`/brand/${product.id}`} className="text-sm text-xops-blue font-medium mb-1 hover:text-xops-blue/80">
                    {product.brand}
                  </Link>
                  <h3 className="font-semibold text-xops-dark mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-xops-dark">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Button size="sm" className="bg-xops-blue hover:bg-xops-blue/90">
                      <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16 bg-xops-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-xops-dark mb-4">Marcas Destacadas</h2>
            <p className="text-lg text-xops-dark/70">
              Conoce a los artesanos y emprendedores detrás de cada producto
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <Link key={index} to={`/brand/${index + 1}`}>
                <Card className="card-hover text-center p-6 border-0 shadow-md bg-white">
                  <div className="w-16 h-16 bg-xops-blue/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-xops-blue font-bold text-xl">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-xops-dark mb-1">{brand.name}</h3>
                  <p className="text-sm text-gray-600">{brand.category}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-xops-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-xops-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">X</span>
                </div>
                <span className="text-xl font-bold">Xops</span>
              </div>
              <p className="text-gray-300">
                Conectando México con el mundo, una marca a la vez.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Compra</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/brands" className="hover:text-white transition-colors">Marcas</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Categorías</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Nuevos</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Ayuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Envíos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Devoluciones</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">¿Eres marca?</h4>
              <p className="text-gray-300 mb-4">Únete a nuestra plataforma</p>
              <Link to="/admin" className="btn-primary inline-block">
                Vender en Xops
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 Xops. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
