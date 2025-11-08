import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import ProductForm from '@/components/forms/ProductForm';
import { Product } from '@/types';
import UnifiedSearch from '@/components/admin/UnifiedSearch';

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
        {/* Lista de productos - Table View */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Producto</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Categoría</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Precio</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Stock</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">{product.category}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900">${product.price.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge 
                        className={`${
                          product.stock <= 5 
                            ? 'bg-red-100 text-red-800' 
                            : product.stock <= 10 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {product.stock} unidades
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

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
