import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// Extended mock products per brand with more items
const brandProducts: Record<string, Array<{ id: number; name: string; price: number; image: string }>> = {
  '1': [
    { id: 101, name: 'Camisa Artesanal Bordada', price: 850, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&auto=format&fit=crop' },
    { id: 102, name: 'Pantalón Lino Premium', price: 1200, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&auto=format&fit=crop' },
    { id: 103, name: 'Guayabera Clásica Yucateca', price: 950, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&auto=format&fit=crop' },
    { id: 104, name: 'Chaleco Bordado a Mano', price: 1400, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop' },
    { id: 105, name: 'Camisa Manta Natural', price: 780, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop' },
    { id: 106, name: 'Sombrero Artesanal', price: 650, image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&auto=format&fit=crop' },
    { id: 107, name: 'Bermuda Algodón', price: 590, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&auto=format&fit=crop' },
  ],
  '2': [
    { id: 201, name: 'Vestido Oaxaqueño Bordado', price: 1500, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&auto=format&fit=crop' },
    { id: 202, name: 'Blusa Bordada Tradicional', price: 750, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&auto=format&fit=crop' },
    { id: 203, name: 'Falda Tradicional Mexicana', price: 980, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj9f?w=400&auto=format&fit=crop' },
    { id: 204, name: 'Rebozo Artesanal Seda', price: 650, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&auto=format&fit=crop' },
    { id: 205, name: 'Huipil Chiapaneco', price: 1800, image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&auto=format&fit=crop' },
    { id: 206, name: 'Top Bordado Floral', price: 550, image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&auto=format&fit=crop' },
    { id: 207, name: 'Conjunto Típico Veracruz', price: 2200, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&auto=format&fit=crop' },
  ],
  '3': [
    { id: 301, name: 'Bolsa Tejida Artesanal', price: 890, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&auto=format&fit=crop' },
    { id: 302, name: 'Cartera Piel Genuina', price: 650, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&auto=format&fit=crop' },
    { id: 303, name: 'Cinturón Artesanal Piel', price: 450, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop' },
    { id: 304, name: 'Mochila Tejida Tradicional', price: 1100, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a45?w=400&auto=format&fit=crop' },
    { id: 305, name: 'Clutch Bordado', price: 580, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&auto=format&fit=crop' },
    { id: 306, name: 'Porta Pasaporte Piel', price: 320, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop' },
    { id: 307, name: 'Bolso Tote Artesanal', price: 1250, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop' },
  ],
  '4': [
    { id: 401, name: 'Collar Plata Taxco', price: 1200, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&auto=format&fit=crop' },
    { id: 402, name: 'Aretes Obsidiana Negra', price: 580, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop' },
    { id: 403, name: 'Pulsera Jade Guatemalteco', price: 890, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&auto=format&fit=crop' },
    { id: 404, name: 'Anillo Turquesa Mexicana', price: 750, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&auto=format&fit=crop' },
    { id: 405, name: 'Pendientes Ámbar', price: 920, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&auto=format&fit=crop' },
    { id: 406, name: 'Brazalete Plata Martillada', price: 1450, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&auto=format&fit=crop' },
    { id: 407, name: 'Set Aretes y Collar', price: 1800, image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&auto=format&fit=crop' },
  ],
  '5': [
    { id: 501, name: 'Huaraches Premium León', price: 1400, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format&fit=crop' },
    { id: 502, name: 'Botas Vaqueras Piel', price: 2500, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&auto=format&fit=crop' },
    { id: 503, name: 'Sandalias Piel Natural', price: 850, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&auto=format&fit=crop' },
    { id: 504, name: 'Mocasines Artesanales', price: 1100, image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&auto=format&fit=crop' },
    { id: 505, name: 'Botines Charros', price: 1950, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop' },
    { id: 506, name: 'Zapatos Oxford Piel', price: 1650, image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=400&auto=format&fit=crop' },
    { id: 507, name: 'Alpargatas Tradicionales', price: 680, image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&auto=format&fit=crop' },
  ],
};

// Default products for brands without specific products
const defaultProducts = [
  { id: 901, name: 'Producto Artesanal Premium', price: 750, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop' },
  { id: 902, name: 'Diseño Único Mexicano', price: 890, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&auto=format&fit=crop' },
  { id: 903, name: 'Pieza Exclusiva Bordada', price: 1200, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&auto=format&fit=crop' },
  { id: 904, name: 'Creación Local Artesanal', price: 650, image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&auto=format&fit=crop' },
  { id: 905, name: 'Accesorio Tradicional', price: 480, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&auto=format&fit=crop' },
  { id: 906, name: 'Textil Oaxaqueño', price: 1100, image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&auto=format&fit=crop' },
  { id: 907, name: 'Joyería Artesanal', price: 920, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&auto=format&fit=crop' },
];

interface BrandProductCarouselProps {
  brandId: string;
}

const BrandProductCarousel = ({ brandId }: BrandProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const products = brandProducts[brandId] || defaultProducts;

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScrollability);
      return () => ref.removeEventListener('scroll', checkScrollability);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Scroll Button Left */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background shadow-lg border border-border rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:bg-secondary"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
      )}
      
      {/* Scroll Button Right */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background shadow-lg border border-border rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:bg-secondary"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      )}

      {/* Products Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2 -mx-1 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex-shrink-0 w-44 md:w-52 group/item"
          >
            <div className="relative overflow-hidden rounded-xl aspect-square mb-3 bg-secondary/30">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
            </div>
            <h3 className="text-sm font-medium text-foreground line-clamp-1 mb-1 group-hover/item:text-xops-blue transition-colors">
              {product.name}
            </h3>
            <p className="text-sm font-semibold text-xops-blue">
              ${product.price.toLocaleString()} MXN
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandProductCarousel;
