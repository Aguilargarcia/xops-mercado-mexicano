import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/home/ProductCard';

const menProducts = [
  {
    id: 101,
    name: "Camisa Artesanal de Algodón",
    brand: "Hilos Naturales",
    price: 850,
    originalPrice: 1200,
    image: "/placeholder.svg",
    rating: 4.8,
    isNew: true
  },
  {
    id: 102,
    name: "Pantalón de Mezclilla Mexicana",
    brand: "Denim Ancestral",
    price: 1200,
    image: "/placeholder.svg",
    rating: 4.6,
    isNew: false
  },
  {
    id: 103,
    name: "Guayabera Tradicional Yucateca",
    brand: "Raíces Mayas",
    price: 950,
    originalPrice: 1300,
    image: "/placeholder.svg",
    rating: 4.9,
    isNew: true
  },
  {
    id: 104,
    name: "Chaleco de Cuero Oaxaqueño",
    brand: "Piel Ancestral",
    price: 1800,
    image: "/placeholder.svg",
    rating: 4.7,
    isNew: false
  },
  {
    id: 105,
    name: "Polo de Fibra Natural",
    brand: "Eco Textil",
    price: 650,
    originalPrice: 900,
    image: "/placeholder.svg",
    rating: 4.5,
    isNew: false
  },
  {
    id: 106,
    name: "Suéter de Lana de Alpaca",
    brand: "Montaña Textil",
    price: 1500,
    image: "/placeholder.svg",
    rating: 4.8,
    isNew: true
  }
];

const Men = () => {
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
          <h1 className="text-3xl font-bold text-xops-dark mb-4">Hombre</h1>
          <p className="text-gray-600">Descubre las mejores prendas masculinas de marcas mexicanas auténticas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menProducts.map((product) => (
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

export default Men;