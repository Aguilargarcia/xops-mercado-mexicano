
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const ForYouSection = () => {
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
      name: "Huaraches Tradicionales",
      brand: "Pies de Barro",
      price: 780,
      image: "/placeholder.svg",
      rating: 4.6,
      isNew: false,
    },
    {
      id: 5,
      name: "Collar de Turquesa",
      brand: "Metales MX",
      price: 950,
      image: "/placeholder.svg",
      rating: 4.9,
      isNew: true,
    },
    {
      id: 6,
      name: "Reboso Tradicional",
      brand: "Raíces",
      price: 650,
      image: "/placeholder.svg",
      rating: 4.7,
      isNew: false,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-xops-dark">Para Ti</h2>
          <Link to="/brands" className="text-xops-blue hover:text-xops-blue/80 font-medium">
            Ver todo
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isLiked={likedProducts.includes(product.id)}
              onToggleLike={toggleLike}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForYouSection;
