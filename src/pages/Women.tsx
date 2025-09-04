import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/home/ProductCard';

const womenProducts = [
  {
    id: 201,
    name: "Vestido Bordado Oaxaqueño",
    brand: "Flores del Sur",
    price: 1200,
    originalPrice: 1600,
    image: "/placeholder.svg",
    rating: 4.9,
    isNew: true
  },
  {
    id: 202,
    name: "Blusa de Algodón con Encaje",
    brand: "Hilos Delicados",
    price: 750,
    image: "/placeholder.svg",
    rating: 4.7,
    isNew: false
  },
  {
    id: 203,
    name: "Falda Artesanal Plisada",
    brand: "Tradición Textil",
    price: 680,
    originalPrice: 950,
    image: "/placeholder.svg",
    rating: 4.6,
    isNew: true
  },
  {
    id: 204,
    name: "Rebozo de Seda Michoacán",
    brand: "Seda Purépecha",
    price: 2200,
    image: "/placeholder.svg",
    rating: 4.8,
    isNew: false
  },
  {
    id: 205,
    name: "Cardigan de Lana Merino",
    brand: "Calor Natural",
    price: 1350,
    originalPrice: 1800,
    image: "/placeholder.svg",
    rating: 4.5,
    isNew: false
  },
  {
    id: 206,
    name: "Huipil Bordado a Mano",
    brand: "Arte Chiapaneco",
    price: 1500,
    image: "/placeholder.svg",
    rating: 4.9,
    isNew: true
  }
];

const Women = () => {
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
          <h1 className="text-3xl font-bold text-xops-dark mb-4">Mujer</h1>
          <p className="text-gray-600">Encuentra prendas femeninas únicas creadas por artesanos mexicanos</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {womenProducts.map((product) => (
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

export default Women;