import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MOCK_BRANDS } from '@/contexts/BrandFollowContext';

// Mock products data for search
const allProducts = [
  // Men
  { id: 101, name: "Camisa Artesanal de Algodón", brand: "Hilos Naturales", price: 850, image: "/placeholder.svg", category: "men" },
  { id: 102, name: "Pantalón de Mezclilla Mexicana", brand: "Denim Ancestral", price: 1200, image: "/placeholder.svg", category: "men" },
  { id: 103, name: "Guayabera Tradicional Yucateca", brand: "Raíces Mayas", price: 950, image: "/placeholder.svg", category: "men" },
  
  // Women
  { id: 201, name: "Vestido Bordado Oaxaqueño", brand: "Flores del Sur", price: 1200, image: "/placeholder.svg", category: "women" },
  { id: 202, name: "Blusa de Algodón con Encaje", brand: "Hilos Delicados", price: 750, image: "/placeholder.svg", category: "women" },
  { id: 203, name: "Falda Artesanal Plisada", brand: "Tradición Textil", price: 680, image: "/placeholder.svg", category: "women" },
  
  // Kids
  { id: 301, name: "Playera de Algodón Orgánico", brand: "Pequeños Artesanos", price: 350, image: "/placeholder.svg", category: "kids" },
  { id: 302, name: "Overol de Mezclilla Infantil", brand: "Mini Denim", price: 650, image: "/placeholder.svg", category: "kids" },
  
  // Accessories
  { id: 401, name: "Bolsa de Palma Tejida", brand: "Cestería Mexicana", price: 650, image: "/placeholder.svg", category: "accessories" },
  { id: 402, name: "Collar de Plata Oxidiana", brand: "Joyería Zapoteca", price: 1200, image: "/placeholder.svg", category: "accessories" },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    products: typeof allProducts;
    brands: typeof MOCK_BRANDS;
  }>({ products: [], brands: [] });

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults({ products: [], brands: [] });
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Filter products
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query)
    );

    // Filter brands
    const filteredBrands = MOCK_BRANDS.filter(brand =>
      brand.name.toLowerCase().includes(query) ||
      brand.category.toLowerCase().includes(query)
    );

    setSearchResults({
      products: filteredProducts.slice(0, 6), // Limit to 6 results
      brands: filteredBrands.slice(0, 4) // Limit to 4 results
    });
  }, [searchQuery]);

  const handleClose = () => {
    setSearchQuery('');
    setSearchResults({ products: [], brands: [] });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-hidden p-0">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-xops-dark">Buscar</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar productos, marcas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-base"
              autoFocus
            />
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          {searchQuery.trim() === '' ? (
            <div className="text-center py-8 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Escribe para buscar productos y marcas</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Brands Results */}
              {searchResults.brands.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-xops-dark mb-3">Marcas</h3>
                  <div className="space-y-2">
                    {searchResults.brands.map((brand) => (
                      <Link
                        key={brand.id}
                        to={`/brand/${brand.id}`}
                        onClick={handleClose}
                        className="block"
                      >
                        <Card className="p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-xops-blue/10 rounded-full flex items-center justify-center">
                              <span className="text-xops-blue font-bold text-sm">
                                {brand.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-xops-dark">{brand.name}</p>
                              <p className="text-sm text-gray-600">{brand.category}</p>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Results */}
              {searchResults.products.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-xops-dark mb-3">Productos</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {searchResults.products.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={handleClose}
                        className="block"
                      >
                        <Card className="p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-xops-dark line-clamp-2 text-sm">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-600 mb-1">{product.brand}</p>
                              <p className="font-semibold text-xops-dark text-sm">
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

              {/* No Results */}
              {searchResults.products.length === 0 && searchResults.brands.length === 0 && searchQuery.trim() !== '' && (
                <div className="text-center py-8 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No se encontraron resultados para "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;