
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import CartAuthPrompt from '@/components/auth/CartAuthPrompt';
import LoginModal from '@/components/auth/LoginModal';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  isNew: boolean;
}

interface ProductCardProps {
  product: Product;
  isLiked?: boolean;
  onToggleLike?: (productId: number) => void;
}

const ProductCard = ({ product, isLiked = false, onToggleLike }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }

    addToCart({
      id: product.id.toString(),
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image
    }, 1);

    toast({
      title: "Producto agregado a la cesta",
      description: `${product.name} se ha agregado a tu cesta.`,
    });
  };

  const handleLoginFromPrompt = () => {
    setShowAuthPrompt(false);
    setShowLoginModal(true);
  };

  const handleGuestCheckout = () => {
    setShowAuthPrompt(false);
    // Add to cart for guest users
    addToCart({
      id: product.id.toString(),
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image
    }, 1);

    toast({
      title: "Producto agregado a la cesta",
      description: `${product.name} se ha agregado a tu cesta como invitado.`,
    });
  };

  return (
    <Card className="card-hover overflow-hidden border-0 shadow-none" style={{ backgroundColor: '#ffffff' }}>
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 text-[#1A1A1A] text-xs font-medium">
              Nuevo
            </span>
          )}
          {product.originalPrice && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </Link>
      </div>
      
      <div className="p-4">
        <Link 
          to={`/brand/${product.id}`} 
          className="text-sm text-gray-500 font-medium mb-1 hover:text-xops-black inline-block"
          onClick={(e) => e.stopPropagation()}
        >
          {product.brand}
        </Link>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-tertiary mb-2 line-clamp-2">{product.name}</h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-600">{product.rating}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-light text-tertiary">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm font-light text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {onToggleLike && (
              <button 
                onClick={() => onToggleLike(product.id)}
                className="p-1.5 transition-all duration-200 hover:scale-110"
              >
                <Heart 
                  className={`w-6 h-6 transition-colors stroke-2 ${
                    isLiked 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-gray-600 hover:text-red-500'
                  }`} 
                />
              </button>
            )}
            <button 
              className="p-1.5 transition-all duration-200 hover:scale-110"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="w-6 h-6 text-gray-600 hover:text-xops-black stroke-[1.5] transition-colors" />
            </button>
          </div>
        </div>
      </div>

      <CartAuthPrompt
        isOpen={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
        onLogin={handleLoginFromPrompt}
        onGuest={handleGuestCheckout}
        productName={product.name}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </Card>
  );
};

export default ProductCard;
