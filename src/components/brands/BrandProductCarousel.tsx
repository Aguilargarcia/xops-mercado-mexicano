import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

// Mock products per brand
const brandProducts: Record<string, Array<{ id: number; name: string; price: number; image: string }>> = {
  '1': [
    { id: 101, name: 'Camisa Artesanal', price: 850, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&auto=format&fit=crop' },
    { id: 102, name: 'Pantalón Lino', price: 1200, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&auto=format&fit=crop' },
    { id: 103, name: 'Guayabera Clásica', price: 950, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&auto=format&fit=crop' },
    { id: 104, name: 'Chaleco Bordado', price: 1400, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop' },
  ],
  '2': [
    { id: 201, name: 'Vestido Oaxaqueño', price: 1500, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&auto=format&fit=crop' },
    { id: 202, name: 'Blusa Bordada', price: 750, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=300&auto=format&fit=crop' },
    { id: 203, name: 'Falda Tradicional', price: 980, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj9f?w=300&auto=format&fit=crop' },
    { id: 204, name: 'Rebozo Artesanal', price: 650, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&auto=format&fit=crop' },
  ],
  '3': [
    { id: 301, name: 'Bolsa Tejida', price: 890, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&auto=format&fit=crop' },
    { id: 302, name: 'Cartera Piel', price: 650, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&auto=format&fit=crop' },
    { id: 303, name: 'Cinturón Artesanal', price: 450, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop' },
    { id: 304, name: 'Mochila Tejida', price: 1100, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a45?w=300&auto=format&fit=crop' },
  ],
  '4': [
    { id: 401, name: 'Collar Plata', price: 1200, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&auto=format&fit=crop' },
    { id: 402, name: 'Aretes Obsidiana', price: 580, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&auto=format&fit=crop' },
    { id: 403, name: 'Pulsera Jade', price: 890, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&auto=format&fit=crop' },
    { id: 404, name: 'Anillo Turquesa', price: 750, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&auto=format&fit=crop' },
  ],
  '5': [
    { id: 501, name: 'Huaraches Premium', price: 1400, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&auto=format&fit=crop' },
    { id: 502, name: 'Botas Vaqueras', price: 2500, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&auto=format&fit=crop' },
    { id: 503, name: 'Sandalias Piel', price: 850, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300&auto=format&fit=crop' },
    { id: 504, name: 'Mocasines', price: 1100, image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=300&auto=format&fit=crop' },
  ],
};

// Default products for brands without specific products
const defaultProducts = [
  { id: 901, name: 'Producto Artesanal', price: 750, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop' },
  { id: 902, name: 'Diseño Único', price: 890, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&auto=format&fit=crop' },
  { id: 903, name: 'Pieza Exclusiva', price: 1200, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=300&auto=format&fit=crop' },
  { id: 904, name: 'Creación Local', price: 650, image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&auto=format&fit=crop' },
];

interface BrandProductCarouselProps {
  brandId: string;
}

const BrandProductCarousel = ({ brandId }: BrandProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const products = brandProducts[brandId] || defaultProducts;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
      >
        <ChevronLeft className="w-4 h-4 text-gray-700" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
      >
        <ChevronRight className="w-4 h-4 text-gray-700" />
      </button>

      {/* Products Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-1 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex-shrink-0 w-32 group/item"
          >
            <div className="relative overflow-hidden rounded-lg aspect-square mb-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-105"
              />
            </div>
            <p className="text-xs font-medium text-gray-800 line-clamp-1">{product.name}</p>
            <p className="text-xs text-xops-blue font-semibold">${product.price.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandProductCarousel;
