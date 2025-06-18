
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-xops-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">X</span>
            </div>
            <span className="text-xl font-bold text-xops-dark">Xops</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-xops-blue ${
                isActive('/') ? 'text-xops-blue' : 'text-xops-dark'
              }`}
            >
              Inicio
            </Link>
            <Link 
              to="/brands" 
              className={`text-sm font-medium transition-colors hover:text-xops-blue ${
                isActive('/brands') ? 'text-xops-blue' : 'text-xops-dark'
              }`}
            >
              Marcas
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Buscar productos, marcas..." 
                className="pl-10 bg-xops-cream/50 border-none focus:bg-white"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 hover:bg-xops-cream rounded-lg transition-colors">
              <ShoppingBag className="w-5 h-5 text-xops-dark" />
              <span className="absolute -top-1 -right-1 bg-xops-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Link>
            
            <Link to="/profile" className="p-2 hover:bg-xops-cream rounded-lg transition-colors">
              <User className="w-5 h-5 text-xops-dark" />
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-xops-cream rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Buscar productos, marcas..." 
                  className="pl-10 bg-xops-cream/50 border-none"
                />
              </div>
              <Link 
                to="/" 
                className="text-sm font-medium text-xops-dark hover:text-xops-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/brands" 
                className="text-sm font-medium text-xops-dark hover:text-xops-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Marcas
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
