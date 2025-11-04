
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Minus, Plus, MapPin, Truck } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import CartAuthPrompt from '@/components/auth/CartAuthPrompt';
import LoginModal from '@/components/auth/LoginModal';
import { getProductById, getRelatedProducts } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isLiked, setIsLiked] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const product = getProductById(Number(id));
  const relatedProducts = product ? getRelatedProducts(product.id) : [];

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-xops-dark mb-4">Producto no encontrado</h1>
          <p className="text-gray-600 mb-8">El producto que buscas no existe.</p>
          <Button onClick={() => navigate('/')}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }

    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      brand: product.brand,
      price: product.price,
      size: selectedSize,
      image: product.images[0]
    }, quantity);

    toast({
      title: "Producto agregado a la cesta",
      description: `${product.name} (${quantity}x) se ha agregado a tu cesta.`,
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
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      brand: product.brand,
      price: product.price,
      size: selectedSize,
      image: product.images[0]
    }, quantity);

    toast({
      title: "Producto agregado a la cesta",
      description: `${product.name} (${quantity}x) se ha agregado a tu cesta como invitado.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-xops-blue">Inicio</Link>
          <span>/</span>
          <Link to="/brands" className="hover:text-xops-blue">Marcas</Link>
          <span>/</span>
          <span className="text-xops-dark">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80">
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <Link to={`/brand/${product.brandId}`} className="text-xops-black hover:text-xops-black/80 font-medium">
                {product.brand}
              </Link>
              {product.brandInfo.verified && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Verificada
                </span>
              )}
            </div>

            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-xops-dark mb-2">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-[#2e2a2a] fill-white stroke-2' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-xops-dark">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium text-xops-dark mb-3">Talla</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-xops-blue bg-xops-blue text-white'
                        : 'border-gray-200 hover:border-xops-blue'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-xops-dark mb-3">Cantidad</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stockCount} disponibles
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 btn-primary text-lg py-3"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Agregar a la Cesta
              </Button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Shipping Info */}
            <Card className="p-4 bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-xops-blue" />
                <div>
                  <p className="font-medium text-xops-dark">Envío gratis</p>
                  <p className="text-sm text-gray-600">En pedidos mayores a $800</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Product Features */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-xops-dark mb-6">Características</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-xops-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Brand Info */}
            <Card className="p-6 border-0 shadow-md">
              <h3 className="font-semibold text-xops-dark mb-3">Sobre la Marca</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{product.brandInfo.location}</span>
                </div>
                <p className="text-sm text-gray-600">{product.brandInfo.description}</p>
                <Link to={`/brand/${product.brandId}`} className="text-xops-black hover:text-xops-black/80 text-sm font-medium">
                  Ver más productos de {product.brand} →
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-xops-dark mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card 
                key={relatedProduct.id} 
                className="card-hover overflow-hidden border-0 shadow-md cursor-pointer"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <img 
                  src={relatedProduct.image} 
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-500 font-medium mb-1">{relatedProduct.brand}</p>
                  <h3 className="font-semibold text-xops-dark mb-2">{relatedProduct.name}</h3>
                  <p className="text-lg font-bold text-xops-dark">${relatedProduct.price}</p>
                </div>
              </Card>
            ))}
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
    </div>
  );
};

export default ProductDetail;
