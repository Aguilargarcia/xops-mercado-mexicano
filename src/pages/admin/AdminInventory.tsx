
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  ShoppingBag, 
  Package, 
  Settings, 
  LogOut,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const AdminInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      name: "Bolsa Artesanal Oaxaca",
      sku: "BOA-001",
      price: 899,
      stock: 8,
      category: "Bolsas",
      status: "Activo",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Collar de Jade Verde",
      sku: "CJV-002",
      price: 650,
      stock: 15,
      category: "Joyería",
      status: "Activo",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Aretes de Plata",
      sku: "ADP-003",
      price: 450,
      stock: 3,
      category: "Joyería",
      status: "Bajo Stock",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Pulsera Bordada",
      sku: "PUB-004",
      price: 280,
      stock: 0,
      category: "Joyería",
      status: "Agotado",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-xops-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">X</span>
            </div>
            <span className="text-xl font-bold text-xops-dark">Xops</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Panel de Marca</p>
        </div>

        <nav className="p-6">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/admin/dashboard" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/inventory" 
                className="flex items-center space-x-3 p-3 rounded-lg bg-xops-blue/10 text-xops-blue font-medium"
              >
                <Package className="w-5 h-5" />
                <span>Inventario</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/orders" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Pedidos</span>
              </Link>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <QrCode className="w-5 h-5" />
                <span>Códigos QR</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Configuración</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Link 
            to="/admin" 
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-xops-dark">Inventario</h1>
            <p className="text-gray-600">Gestiona tus productos</p>
          </div>
          <Button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Producto
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 border-0 shadow-md">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Buscar productos..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
            </div>
          </div>
        </Card>

        {/* Products Table */}
        <Card className="border-0 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Producto</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">SKU</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Precio</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-xops-dark">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.sku}</td>
                    <td className="px-6 py-4 text-sm font-medium">${product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${
                        product.stock === 0 ? 'text-red-600' :
                        product.stock <= 5 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        product.status === 'Activo' ? 'bg-green-100 text-green-800' :
                        product.status === 'Bajo Stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="p-2">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="p-2">
                          <QrCode className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="p-2 text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminInventory;
