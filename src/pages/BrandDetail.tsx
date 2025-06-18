
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, MapPin, Users, Eye } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const BrandDetail = () => {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const brand = {
    id: 1,
    name: "Tlalli",
    description: "Artesanías auténticas de Oaxaca con técnicas ancestrales transmitidas de generación en generación",
    longDescription: "Tlalli es una marca comprometida con preservar las técnicas artesanales ancestrales de Oaxaca. Trabajamos directamente con artesanas zapotecas, asegurando que cada pieza mantenga la autenticidad y calidad que nos caracteriza. Nuestros productos son únicos, elaborados con materiales naturales y tintes orgánicos.",
    category: "Artesanías",
    location: "Oaxaca de Juárez, Oaxaca",
    image: "/placeholder.svg",
    logo: "/placeholder.svg",
    rating: 4.8,
    followers: 1248,
    verified: true,
    products: [
      {
        id: 1,
        name: "Bolsa Artesanal Oaxaca",
        price: 899,
        originalPrice: 1200,
        image: "/placeholder.svg",
        rating: 4.8,
        isNew: true,
      },
      {
        id: 2,
        name: "Collar de Jade",
        price: 650,
        image: "/placeholder.svg",
        rating: 4.7,
        isNew: false,
      },
      {
        id: 3,
        name: "Aretes de Plata",
        price: 450,
        image: "/placeholder.svg",
        rating: 4.9,
        isNew: false,
      },
      {
        id: 4,
        name: "Pulsera Bordada",
        price: 280,
        image: "/placeholder.svg",
        rating: 4.6,
        isNew: true,
      },
    ]
  };

  return (
    <div className="min-h-screen bg-xops-cream">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Brand Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-xops-blue/10 rounded-full flex items-center justify-center">
                <span className="text-xops-blue font-bold text-4xl">
                  {brand.name.charAt(0)}
                </span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-xops-dark">{brand.name}</h1>
                {brand.verified && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Verificada
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-4">{brand.description}</p>
              
              <div className="flex items-center gap-6 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{brand.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{brand.followers.toLocaleString()} seguidores</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{brand.rating}</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={isFollowing ? "btn-secondary" : "btn-primary"}
                >
                  {isFollowing ? "Siguiendo" : "Seguir"}
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver tienda
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <Card className="p-6 mb-8 border-0 shadow-md bg-white">
          <h2 className="text-xl font-semibold text-xops-dark mb-4">Sobre la Marca</h2>
          <p className="text-gray-600 leading-relaxed">{brand.longDescription}</p>
        </Card>

        {/* Products Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-xops-dark mb-6">Productos de {brand.name}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brand.products.map((product) => (
              <Card key={product.id} className="card-hover overflow-hidden border-0 shadow-md bg-white">
                <div className="relative">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
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
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-xops-dark mb-2 hover:text-xops-blue transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
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
      </div>
    </div>
  );
};

export default BrandDetail;
