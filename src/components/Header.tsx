
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { MOCK_BRANDS } from '@/contexts/BrandFollowContext';
import LoginModal from './auth/LoginModal';

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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    products: typeof allProducts;
    brands: typeof MOCK_BRANDS;
  }>({ products: [], brands: [] });
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
      setSearchResults({ products: [], brands: [] });
    }
  };

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

  return (
    <>
      <header 
        style={{ backgroundColor: '#ffffff' }} 
        className="shadow-sm border-b border-gray-100 sticky top-0 z-50 h-14"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 relative">
            
            {/* Search Overlay */}
            {isSearchOpen && (
              <div className="absolute inset-0 bg-white/98 backdrop-blur-sm z-50 flex items-center animate-slide-down">
                <div className="flex-1 flex items-center gap-4 px-4">
                  <Search className="w-5 h-5 text-tertiary-blue flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Buscar productos, marcas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-lg placeholder-gray-400 text-tertiary-blue bg-transparent border-none outline-none"
                  />
                  <button
                    onClick={handleSearchToggle}
                    className="text-gray-500 hover:text-tertiary-blue transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Left Navigation with blur when search is open */}
            <nav className={`hidden md:flex items-center space-x-6 transition-all duration-300 ${isSearchOpen ? 'blur-sm opacity-30' : ''}`}>
              <Link 
                to="/" 
                 className={`text-sm font-medium transition-all duration-300 hover:text-xops-dark hover:scale-105 ${
                  isActive('/') ? 'text-xops-dark' : 'text-xops-dark'
                }`}
              >
                Inicio
              </Link>
              {user?.type !== 'marca' && (
                <Link 
                  to="/brands" 
                   className={`text-sm font-medium transition-all duration-300 hover:text-xops-dark hover:scale-105 ${
                    isActive('/brands') ? 'text-xops-dark' : 'text-xops-dark'
                  }`}
                >
                  Marcas
                </Link>
              )}
              <Link 
                to="/men" 
                 className={`text-sm font-medium transition-all duration-300 hover:text-xops-dark hover:scale-105 ${
                  isActive('/men') ? 'text-xops-dark' : 'text-xops-dark'
                }`}
              >
                Hombre
              </Link>
              <Link 
                to="/women" 
                 className={`text-sm font-medium transition-all duration-300 hover:text-xops-dark hover:scale-105 ${
                  isActive('/women') ? 'text-xops-dark' : 'text-xops-dark'
                }`}
              >
                Mujer
              </Link>
              <Link 
                to="/accessories" 
                 className={`text-sm font-medium transition-all duration-300 hover:text-xops-dark hover:scale-105 ${
                  isActive('/accessories') ? 'text-xops-dark' : 'text-xops-dark'
                }`}
              >
                Accesorios
              </Link>
              <Link 
                to="/kids" 
                 className={`text-sm font-medium transition-all duration-300 hover:text-xops-dark hover:scale-105 ${
                  isActive('/kids') ? 'text-xops-dark' : 'text-xops-dark'
                }`}
              >
                Niños
              </Link>
            </nav>

            {/* Right Navigation - Xopper AI */}
            <div className={`absolute right-[320px] transition-all duration-300 ${isSearchOpen ? 'blur-sm opacity-30' : ''}`}>
              <Link 
                to="/xopper-ai" 
                className={`text-sm font-medium px-3 py-1.5 border border-xops-black/30 rounded-md transition-all duration-300 hover:border-xops-black hover:bg-xops-black/5 ${
                  isActive('/xopper-ai') ? 'text-xops-dark border-xops-black' : 'text-xops-dark'
                }`}
              >
                Xopper AI
              </Link>
            </div>

            {/* Absolutely Centered Logo with blur when search is open */}
            <Link 
              to={user?.type === 'marca' ? '/admin/dashboard' : '/'} 
              className={`absolute left-1/2 transform -translate-x-1/2 flex items-center transition-all duration-300 hover:scale-105 ${isSearchOpen ? 'blur-sm opacity-30' : ''}`}
              onClick={(e) => {
                const currentPath = location.pathname;
                const targetPath = user?.type === 'marca' ? '/admin/dashboard' : '/';
                if (currentPath === targetPath) {
                  e.preventDefault();
                  window.location.reload();
                }
              }}
            >
              <div className="flex items-center space-x-2">
                <span className="font-montserrat text-3xl font-bold text-xops-blue">Xops<span className="text-xs font-black relative -top-2.5">®</span></span>
                {user?.type === 'marca' && (
                  <span className="bg-xops-blue text-white text-xs px-2 py-1 rounded-full font-medium">Admin</span>
                )}
              </div>
            </Link>

            {/* Right Actions - Moved further right for breathing space with blur when search is open */}
            <div className={`flex items-center space-x-4 ml-auto mr-16 transition-all duration-300 ${isSearchOpen ? 'blur-sm opacity-30' : ''}`}>
              {/* Search - Always visible */}
              <button 
                className="hidden md:flex p-2 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-110"
                onClick={handleSearchToggle}
              >
                {isSearchOpen ? (
                  <X className="w-5 h-5 text-tertiary" />
                ) : (
                  <Search className="w-5 h-5 text-tertiary" />
                )}
              </button>

              {/* Favorites - Only visible for logged in users */}
              {user && (
                <Link to="/profile" className="hidden md:flex p-2 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-110">
                  <svg className="w-7 h-7 text-xops-dark hover:text-xops-dark hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Link>
              )}
              
              {/* Cart - Always visible */}
              <Link to="/cart" className="relative p-2 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-110">
                <ShoppingBag className="w-5 h-5 text-xops-dark stroke-[1.5]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-xops-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>

              {user ? (
                <Link to="/profile" className="p-2 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-110">
                  <User className="w-5 h-5 text-xops-dark" />
                </Link>
              ) : (
                <>
                  {/* Usuario no logueado - Show login option */}
                  <div className="relative">
                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-110" onClick={() => setShowLoginModal(true)}>
                      <User className="w-5 h-5 text-xops-dark" />
                    </button>
                  </div>
                </>
              )}

              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-110"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search Results Below Header */}
          {isSearchOpen && searchQuery.trim() !== '' && (
            <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg z-40 animate-fade-in">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-4 max-h-96 overflow-y-auto">
                  {searchResults.brands.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-tertiary-blue mb-2">Marcas</h3>
                      <div className="space-y-2">
                        {searchResults.brands.map((brand) => (
                          <Link
                            key={brand.id}
                            to={`/brand/${brand.id}`}
                            onClick={() => setIsSearchOpen(false)}
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
                                  <p className="font-medium text-tertiary-blue text-sm">{brand.name}</p>
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
                      <h3 className="text-sm font-semibold text-tertiary-blue mb-2">Productos</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {searchResults.products.map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            onClick={() => setIsSearchOpen(false)}
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
                                  <p className="font-medium text-tertiary-blue line-clamp-1 text-sm">
                                    {product.name}
                                  </p>
                                  <p className="text-xs text-gray-600 mb-1">{product.brand}</p>
                                  <p className="font-semibold text-tertiary-blue text-sm">
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
            </div>
          )}

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                {user?.type !== 'marca' && (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="Buscar productos, marcas..." 
                      className="pl-10 bg-gray-50 border-none"
                    />
                  </div>
                )}
                
                <Link 
                  to="/" 
                   className="text-sm font-medium text-xops-dark hover:text-xops-dark transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                
                {user?.type !== 'marca' && (
                  <Link 
                    to="/brands" 
                  className="text-sm font-medium text-xops-dark hover:text-xops-dark transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Marcas
                  </Link>
                )}

                {user && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modal de Login */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Header;
