
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
        style={{ backgroundColor: '#f9f2eb' }} 
        className="shadow-sm border-b border-gray-100 sticky top-0 z-50 h-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 relative">
            {/* Left Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-xl font-semibold transition-all duration-300 hover:text-xops-blue hover:scale-105 ${
                  isActive('/') ? 'text-xops-blue' : 'text-xops-dark'
                }`}
              >
                Inicio
              </Link>
              {user?.type !== 'marca' && (
                <Link 
                  to="/brands" 
                  className={`text-xl font-semibold transition-all duration-300 hover:text-xops-blue hover:scale-105 ${
                    isActive('/brands') ? 'text-xops-blue' : 'text-xops-dark'
                  }`}
                >
                  Marcas
                </Link>
              )}
            </nav>

            {/* Absolutely Centered Logo */}
            <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2 transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-xops-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">X</span>
              </div>
              <span className="font-archivo-black text-xops-dark text-3xl">Xops</span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center space-x-4 ml-auto">
              {/* Search - Solo para clientes */}
              {user?.type !== 'marca' && (
                <button className="hidden md:flex p-2 hover:bg-xops-cream rounded-lg transition-all duration-300 hover:scale-110">
                  <Search className="w-5 h-5 text-xops-dark" />
                </button>
              )}
            
              {user ? (
                <>
                  {/* Usuario logueado - Cart and Profile for customers */}
                  {user.type === 'cliente' && (
                    <>
                      <Link to="/cart" className="relative p-2 hover:bg-xops-cream rounded-lg transition-all duration-300 hover:scale-110">
                        <ShoppingBag className="w-5 h-5 text-xops-dark" />
                        {totalItems > 0 && (
                          <span className="absolute -top-1 -right-1 bg-xops-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                            {totalItems}
                          </span>
                        )}
                      </Link>
                      
                      <Link to="/profile" className="p-2 hover:bg-xops-cream rounded-lg transition-all duration-300 hover:scale-110">
                        <User className="w-5 h-5 text-xops-dark" />
                      </Link>
                    </>
                  )}
                  
                  {/* Welcome message */}
                  <span className="hidden lg:block text-sm text-xops-dark px-2">
                    Hola, {user.name}
                  </span>
                  
                  {/* Logout button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300 hover:scale-105"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden md:inline ml-2">Cerrar sesión</span>
                  </Button>
                </>
              ) : (
                <>
                  {/* Usuario no logueado - Login and Register */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLoginModal(true)}
                    className="text-xops-blue hover:text-xops-blue/80 transition-all duration-300 hover:scale-105"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden md:inline ml-2">Iniciar sesión</span>
                  </Button>
                  
                  <Link to="/register">
                    <Button size="sm" className="bg-xops-blue hover:bg-xops-blue/90 transition-all duration-300 hover:scale-105">
                      Registrarse
                    </Button>
                  </Link>
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
