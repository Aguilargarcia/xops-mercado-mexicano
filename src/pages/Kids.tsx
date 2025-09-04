import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/home/ProductCard';

const kidsProducts = [
  {
    id: 301,
    name: "Playera de Algodón Orgánico",
    brand: "Pequeños Artesanos",
    price: 350,
    originalPrice: 500,
    image: "/placeholder.svg",
    rating: 4.8,
    isNew: true
  },
  {
    id: 302,
    name: "Overol de Mezclilla Infantil",
    brand: "Mini Denim",
    price: 650,
    image: "/placeholder.svg",
    rating: 4.6,
    isNew: false
  },
  {
    id: 303,
    name: "Vestidito Bordado Mexicano",
    brand: "Flores Pequeñas",
    price: 480,
    originalPrice: 650,
    image: "/placeholder.svg",
    rating: 4.9,
    isNew: true
  },
  {
    id: 304,
    name: "Suéter Tejido a Mano",
    brand: "Abuelitas Tejedoras",
    price: 750,
    image: "/placeholder.svg",
    rating: 4.7,
    isNew: false
  },
  {
    id: 305,
    name: "Pantalón de Manta Yucateca",
    brand: "Tradición Mini",
    price: 420,
    originalPrice: 600,
    image: "/placeholder.svg",
    rating: 4.5,
    isNew: false
  },
  {
    id: 306,
    name: "Chamarra de Cuero Suave",
    brand: "Piel Pequeña",
    price: 950,
    image: "/placeholder.svg",
    rating: 4.8,
    isNew: true
  }
];

const Kids = () => {
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
          <h1 className="text-3xl font-bold text-xops-dark mb-4">Niños</h1>
          <p className="text-gray-600">Ropa cómoda y auténtica para los más pequeños de la casa</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {kidsProducts.map((product) => (
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

export default Kids;