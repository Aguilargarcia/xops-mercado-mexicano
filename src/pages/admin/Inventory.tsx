import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Package, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProductForm from '@/components/forms/ProductForm';
import { Product } from '@/types';

const Inventory = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
        className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10"
      >
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-xops-dark">Inventario</h1>
              <p className="text-gray-600 mt-2">Gestiona tu catálogo de productos</p>
            </div>
            <Button 
              className="btn-primary shadow-lg"
              onClick={() => setShowProductForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="p-8 space-y-8">
        {/* Filtros y búsqueda */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-xops-blue focus:border-transparent"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-xops-dark">{product.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock <= 5 
                          ? 'bg-red-100 text-red-800' 
                          : product.stock <= 10 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {product.stock} en stock
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-lg font-bold text-xops-blue">${product.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

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
