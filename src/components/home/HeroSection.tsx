import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { MOCK_BRANDS } from '@/contexts/BrandFollowContext';

// Mock products data for search
const allProducts = [
  { id: 101, name: "Camisa Artesanal de Algodón", brand: "Hilos Naturales", price: 850, image: "/placeholder.svg", category: "men" },
  { id: 102, name: "Pantalón de Mezclilla Mexicana", brand: "Denim Ancestral", price: 1200, image: "/placeholder.svg", category: "men" },
  { id: 103, name: "Guayabera Tradicional Yucateca", brand: "Raíces Mayas", price: 950, image: "/placeholder.svg", category: "men" },
  { id: 201, name: "Vestido Bordado Oaxaqueño", brand: "Flores del Sur", price: 1200, image: "/placeholder.svg", category: "women" },
  { id: 202, name: "Blusa de Algodón con Encaje", brand: "Hilos Delicados", price: 750, image: "/placeholder.svg", category: "women" },
  { id: 203, name: "Falda Artesanal Plisada", brand: "Tradición Textil", price: 680, image: "/placeholder.svg", category: "women" },
  { id: 301, name: "Playera de Algodón Orgánico", brand: "Pequeños Artesanos", price: 350, image: "/placeholder.svg", category: "kids" },
  { id: 302, name: "Overol de Mezclilla Infantil", brand: "Mini Denim", price: 650, image: "/placeholder.svg", category: "kids" },
  { id: 401, name: "Bolsa de Palma Tejida", brand: "Cestería Mexicana", price: 650, image: "/placeholder.svg", category: "accessories" },
  { id: 402, name: "Collar de Plata Oxidiana", brand: "Joyería Zapoteca", price: 1200, image: "/placeholder.svg", category: "accessories" },
];

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    products: typeof allProducts;
    brands: typeof MOCK_BRANDS;
  }>({ products: [], brands: [] });
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults({ products: [], brands: [] });
      return;
    }

    const query = searchQuery.toLowerCase();
    
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query)
    );

    const filteredBrands = MOCK_BRANDS.filter(brand =>
      brand.name.toLowerCase().includes(query) ||
      brand.category.toLowerCase().includes(query)
    );

    setSearchResults({
      products: filteredProducts.slice(0, 6),
      brands: filteredBrands.slice(0, 4)
    });
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults({ products: [], brands: [] });
    searchInputRef.current?.focus();
  };

  return (
    <section className="relative overflow-hidden bg-white" style={{ height: 'calc(100vh - 56px)' }}>
      <div className="w-full h-full">
        {/* Full Width Image Container */}
        <div className="relative w-full h-full overflow-hidden">
          <img 
            src="/lovable-uploads/35b2d951-f151-4a82-90de-388fc8448649.png" 
            alt="Costurera tradicional mexicana trabajando en su máquina de coser"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Centered Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-2xl md:text-3xl font-bold font-montserrat text-white drop-shadow-lg mb-8">
              La nueva experiencia de comprar local.
            </p>
            
            {/* Search Bar */}
            <div ref={searchContainerRef} className="w-full max-w-xl relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="¿Qué estás buscando hoy?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full pl-12 pr-12 py-4 text-base bg-white/95 backdrop-blur-sm border-0 rounded-full shadow-xl placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-xops-blue/50 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {isSearchFocused && searchQuery.trim() !== '' && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto animate-fade-in">
                  <div className="p-4">
                    {searchResults.brands.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Marcas</h3>
                        <div className="space-y-2">
                          {searchResults.brands.map((brand) => (
                            <Link
                              key={brand.id}
                              to={`/brand/${brand.id}`}
                              onClick={() => setIsSearchFocused(false)}
                              className="block"
                            >
                              <Card className="p-3 hover:bg-gray-50 transition-colors cursor-pointer border-gray-200">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-xops-blue/10 rounded-full flex items-center justify-center">
                                    <span className="text-xops-blue font-bold text-xs">
                                      {brand.name.charAt(0)}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-800 text-sm">{brand.name}</p>
                                    <p className="text-xs text-gray-600">{brand.category}</p>
                                  </div>
                                </div>
                              </Card>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.products.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Productos</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {searchResults.products.map((product) => (
                            <Link
                              key={product.id}
                              to={`/product/${product.id}`}
                              onClick={() => setIsSearchFocused(false)}
                              className="block"
                            >
                              <Card className="p-3 hover:bg-gray-50 transition-colors cursor-pointer border-gray-200">
                                <div className="flex gap-3">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-800 line-clamp-1 text-sm">
                                      {product.name}
                                    </p>
                                    <p className="text-xs text-gray-600 mb-1">{product.brand}</p>
                                    <p className="font-semibold text-xops-blue text-sm">
                                      ${product.price.toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </Card>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.products.length === 0 && searchResults.brands.length === 0 && (
                      <div className="text-center py-6 text-gray-500">
                        <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No se encontraron resultados para "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/brands" 
              className="mt-6 text-white font-montserrat text-sm underline hover:text-white/80 transition-all duration-300 hover:scale-105 drop-shadow-lg"
            >
              Explorar marcas
            </Link>
          </div>
        </div>
      </div>
      {/* Tiny white space indicator */}
      <div className="h-1 bg-white"></div>
    </section>
  );
};

export default HeroSection;
