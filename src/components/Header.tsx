
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import LoginModal from './auth/LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        style={{ backgroundColor: '#ffffff' }} 
        className="shadow-sm border-b border-gray-100 sticky top-0 z-50 h-14"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 relative">
            {/* Left Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-all duration-300 hover:text-xops-blue hover:scale-105 ${
                  isActive('/') ? 'text-xops-blue' : 'text-xops-dark'
                }`}
              >
                Inicio
              </Link>
              {user?.type !== 'marca' && (
                <Link 
                  to="/brands" 
                  className={`text-sm font-medium transition-all duration-300 hover:text-xops-blue hover:scale-105 ${
                    isActive('/brands') ? 'text-xops-blue' : 'text-xops-dark'
                  }`}
                >
                  Marcas
                </Link>
              )}
              <Link 
                to="/men" 
                className={`text-sm font-medium transition-all duration-300 hover:text-xops-blue hover:scale-105 ${
                  isActive('/men') ? 'text-xops-blue' : 'text-xops-dark'
                }`}
              >
                Hombre
              </Link>
              <Link 
                to="/women" 
                className={`text-sm font-medium transition-all duration-300 hover:text-xops-blue hover:scale-105 ${
                  isActive('/women') ? 'text-xops-blue' : 'text-xops-dark'
                }`}
              >
                Mujer
              </Link>
              <Link 
                to="/accessories" 
                className={`text-sm font-medium transition-all duration-300 hover:text-xops-blue hover:scale-105 ${
                  isActive('/accessories') ? 'text-xops-blue' : 'text-xops-dark'
                }`}
              >
                Accesorios
              </Link>
              <Link 
                to="/kids" 
                className={`text-sm font-medium transition-all duration-300 hover:text-xops-blue hover:scale-105 ${
                  isActive('/kids') ? 'text-xops-blue' : 'text-xops-dark'
                }`}
              >
                Niños
              </Link>
            </nav>

            {/* Absolutely Centered Logo */}
            <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center transition-all duration-300 hover:scale-105">
              <span className="font-archivo-black text-xops-blue text-3xl">XOPS</span>
            </Link>

            {/* Right Actions - Moved further right for breathing space */}
            <div className="flex items-center space-x-4 ml-auto mr-16">
              {/* Search - Always visible */}
              <button className="hidden md:flex p-2 hover:bg-xops-cream rounded-lg transition-all duration-300 hover:scale-110">
                <Search className="w-5 h-5 text-xops-dark" />
              </button>
              
              {/* Cart - Always visible */}
              <Link to="/cart" className="relative p-2 hover:bg-xops-cream rounded-lg transition-all duration-300 hover:scale-110">
                <ShoppingBag className="w-5 h-5 text-xops-dark stroke-[1.5]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-xops-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>

              {user ? (
                <>
                  {/* Usuario logueado */}
                  {user.type === 'cliente' && (
                    <>
                      {/* Profile with user name */}
                      <div className="flex items-center space-x-2">
                        <Link to="/profile" className="p-2 hover:bg-xops-cream rounded-lg transition-all duration-300 hover:scale-110">
                          <User className="w-7 h-7 text-black" />
                        </Link>
                        <span className="hidden lg:block text-sm font-medium text-xops-dark">
                          {user.name}
                        </span>
                      </div>
                    </>
                  )}
                  
                  {/* For marca users - only profile */}
                  {user.type === 'marca' && (
                    <div className="flex items-center space-x-2">
                      <Link to="/profile" className="p-2 hover:bg-xops-cream rounded-lg transition-all duration-300 hover:scale-110">
                        <User className="w-7 h-7 text-black" />
                      </Link>
                      <span className="hidden lg:block text-sm font-medium text-xops-dark">
                        {user.name}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Usuario no logueado - Profile Icon */}
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowLoginModal(true)}
                      className="text-xops-blue hover:text-xops-blue/80 transition-all duration-300 hover:scale-105"
                    >
                      <User className="w-7 h-7 text-black" />
                    </Button>
                  </div>
                </>
              )}

              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-xops-cream rounded-lg transition-all duration-300 hover:scale-110"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                {user?.type !== 'marca' && (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="Buscar productos, marcas..." 
                      className="pl-10 bg-xops-cream/50 border-none"
                    />
                  </div>
                )}
                
                <Link 
                  to="/" 
                  className="text-sm font-medium text-xops-dark hover:text-xops-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                
                {user?.type !== 'marca' && (
                  <Link 
                    to="/brands" 
                    className="text-sm font-medium text-xops-dark hover:text-xops-blue transition-colors"
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
