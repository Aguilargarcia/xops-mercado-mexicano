import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Package, Edit, Trash2, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import ProductForm from '@/components/forms/ProductForm';
import { Product } from '@/types';
import UnifiedSearch from '@/components/admin/UnifiedSearch';

const Inventory = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCompactView, setIsCompactView] = useState(false);

  // Datos de prueba para productos
  const mockProducts: (Product & { stock: number })[] = [
    {
      id: '1',
      name: 'Bolsa Artesanal de Cuero',
      price: 899,
      images: ['/placeholder.svg'],
      category: 'Bolsas',
      description: 'Bolsa hecha a mano con cuero genuino',
      qrCode: 'https://xops.app/venta/1',
      createdAt: new Date(),
      updatedAt: new Date(),
      stock: 15
    },
    {
      id: '2',
      name: 'Collar de Jade Natural',
      price: 650,
      images: ['/placeholder.svg'],
      category: 'Joyería',
      description: 'Collar con piedras de jade natural',
      qrCode: 'https://xops.app/venta/2',
      createdAt: new Date(),
      updatedAt: new Date(),
      stock: 8
    },
    {
      id: '3',
      name: 'Aretes de Plata 925',
      price: 450,
      images: ['/placeholder.svg'],
      category: 'Joyería',
      description: 'Aretes elegantes de plata sterling',
      qrCode: 'https://xops.app/venta/3',
      createdAt: new Date(),
      updatedAt: new Date(),
      stock: 3
    }
  ];

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (productData: any) => {
    console.log('Nuevo producto:', productData);
    setShowProductForm(false);
  };

  return (
    <>
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-gray-100 sticky top-0 z-10"
      >
        <div className="px-8 py-5">
          <div className="flex items-center gap-6">
            <UnifiedSearch 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <Button 
              className="bg-white text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white whitespace-nowrap"
              onClick={() => setShowProductForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="p-8 space-y-8">
        {/* Filtros y vistas */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">
              Vista compacta
            </label>
            <Switch
              checked={isCompactView}
              onCheckedChange={setIsCompactView}
            />
            {isCompactView ? (
              <List className="w-4 h-4 text-gray-500" />
            ) : (
              <LayoutGrid className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </div>

        {/* Stats rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-xops-blue/10 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-xops-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Productos</p>
                <p className="text-2xl font-bold text-xops-dark">{mockProducts.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">En Stock</p>
                <p className="text-2xl font-bold text-xops-dark">{mockProducts.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Categorías</p>
                <p className="text-2xl font-bold text-xops-dark">2</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Lista de productos */}
        {isCompactView ? (
          <Card className="border-0 shadow-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-xops-dark mb-6">Lista de Productos</h2>
              <div className="space-y-3">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-xops-dark text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Existencias</p>
                        <Badge 
                          className={`text-lg font-bold px-3 py-1 ${
                            product.stock <= 5 
                              ? 'bg-red-100 text-red-800' 
                              : product.stock <= 10 
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {product.stock}
                        </Badge>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Precio</p>
                        <p className="text-lg font-bold text-xops-blue">${product.price.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group overflow-hidden border border-gray-100 hover:border-gray-900 transition-all duration-300 bg-white">
                  <div className="aspect-square bg-gray-50 overflow-hidden">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                      <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">{product.name}</h3>
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Precio</p>
                        <p className="text-lg font-semibold text-gray-900">${product.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-0.5">Stock</p>
                        <p className={`text-sm font-semibold ${
                          product.stock <= 5 ? 'text-red-600' : 
                          product.stock <= 10 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {product.stock} uds
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                      <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs hover:bg-gray-50">
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron productos</p>
          </div>
        )}
      </div>

      {/* Modal para agregar producto */}
      {showProductForm && (
        <ProductForm
          onSubmit={handleAddProduct}
          onClose={() => setShowProductForm(false)}
        />
      )}
    </>
  );
};

export default Inventory;
