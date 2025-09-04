import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/home/ProductCard';

const accessoriesProducts = [
  {
    id: 401,
    name: "Bolsa de Palma Tejida",
    brand: "Cestería Mexicana",
    price: 650,
    originalPrice: 900,
    image: "/placeholder.svg",
    rating: 4.8,
    isNew: true
  },
  {
    id: 402,
    name: "Collar de Plata Oxidiana",
    brand: "Joyería Zapoteca",
    price: 1200,
    image: "/placeholder.svg",
    rating: 4.9,
    isNew: false
  },
  {
    id: 403,
    name: "Cinturón de Cuero Repujado",
    brand: "Piel Artesanal",
    price: 850,
    originalPrice: 1100,
    image: "/placeholder.svg",
    rating: 4.7,
    isNew: true
  },
  {
    id: 404,
    name: "Aretes de Talavera Poblana",
    brand: "Cerámica Fina",
    price: 380,
    image: "/placeholder.svg",
    rating: 4.6,
    isNew: false
  },
  {
    id: 405,
    name: "Pulsera de Chaquira Huichol",
    brand: "Arte Wixárika",
    price: 450,
    originalPrice: 600,
    image: "/placeholder.svg",
    rating: 4.8,
    isNew: false
  },
  {
    id: 406,
    name: "Sombrero de Palma Chiapaneco",
    brand: "Tradición Sureña",
    price: 750,
    image: "/placeholder.svg",
    rating: 4.7,
    isNew: true
  }
];

const Accessories = () => {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const handleToggleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-xops-dark mb-4">Accesorios</h1>
          <p className="text-gray-600">Complementa tu estilo con accesorios únicos hechos a mano</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {accessoriesProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isLiked={likedProducts.includes(product.id)}
              onToggleLike={handleToggleLike}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accessories;