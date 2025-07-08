
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Minus, Plus, MapPin, Truck } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  const product = {
    id: 1,
    name: "Bolsa Artesanal Oaxaca",
    brand: "Tlalli",
    price: 899,
    originalPrice: 1200,
    rating: 4.8,
    reviews: 127,
    description: "Hermosa bolsa artesanal elaborada a mano por artesanas oaxaqueñas. Cada pieza es única y cuenta con bordados tradicionales que representan la rica cultura zapoteca. Hecha con materiales naturales y tintes orgánicos.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    sizes: ["S", "M", "L"],
    inStock: true,
    stockCount: 8,
    features: [
      "Hecho a mano por artesanas oaxaqueñas",
      "Materiales 100% naturales",
      "Tintes orgánicos",
      "Bordados tradicionales zapotecos",
      "Pieza única e irrepetible"
    ],
    brandInfo: {
      name: "Tlalli",
      location: "Oaxaca de Juárez, Oaxaca",
      verified: true,
      description: "Marca comprometida con preservar las técnicas artesanales ancestrales"
    }
  };

  const relatedProducts = [
    { id: 2, name: "Collar de Jade", brand: "Tlalli", price: 650, image: "/placeholder.svg" },
    { id: 3, name: "Aretes de Plata", brand: "Tlalli", price: 450, image: "/placeholder.svg" },
    { id: 4, name: "Pulsera Bordada", brand: "Tlalli", price: 280, image: "/placeholder.svg" },
  ];

  const handleAddToCart = () => {
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
              <Link to="/brands" className="text-xops-blue hover:text-xops-blue/80 font-medium">
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
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
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
            <Card className="p-4 bg-xops-cream/30 border-0">
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
                <Link to="/brands" className="text-xops-blue hover:text-xops-blue/80 text-sm font-medium">
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
            {relatedProducts.map((product) => (
              <Card key={product.id} className="card-hover overflow-hidden border-0 shadow-md">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-xops-blue font-medium mb-1">{product.brand}</p>
                  <h3 className="font-semibold text-xops-dark mb-2">{product.name}</h3>
                  <p className="text-lg font-bold text-xops-dark">${product.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
