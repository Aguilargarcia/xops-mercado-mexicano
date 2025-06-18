
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User, Package, MapPin, CreditCard, Settings, Heart, UserPlus, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Profile = () => {
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  const user = {
    name: "Ana García",
    email: "ana.garcia@email.com",
    phone: "+52 55 1234 5678",
    address: "Av. Reforma 123, CDMX"
  };

  const recentOrders = [
    {
      id: "#001",
      date: "15 Ene 2024",
      status: "Entregado",
      total: 1350,
      items: 2,
      brand: "Tlalli"
    },
    {
      id: "#002",
      date: "10 Ene 2024",
      status: "En camino",
      total: 890,
      items: 1,
      brand: "Raíces"
    },
    {
      id: "#003",
      date: "5 Ene 2024",
      status: "Entregado",
      total: 2100,
      items: 3,
      brand: "Metales MX"
    }
  ];

  const followedBrands = [
    {
      id: 1,
      name: "Tlalli",
      category: "Artesanías",
      location: "Oaxaca",
      followers: 1248,
    },
    {
      id: 2,
      name: "Raíces",
      category: "Textiles", 
      location: "Yucatán",
      followers: 895,
    },
    {
      id: 3,
      name: "Metales MX",
      category: "Joyería",
      location: "Taxco",
      followers: 2130,
    },
    {
      id: 4,
      name: "Pies de Barro",
      category: "Calzado",
      location: "Michoacán",
      followers: 567,
    },
  ];

  const likedProducts = [
    {
      id: 1,
      name: "Bolsa Artesanal Oaxaca",
      brand: "Tlalli",
      price: 899,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Playera Bordada Yucatán",
      brand: "Raíces",
      price: 450,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Collar de Plata",
      brand: "Metales MX",
      price: 1250,
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Huaraches Michoacán",
      brand: "Pies de Barro",
      price: 780,
      image: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Aretes de Jade",
      brand: "Metales MX",
      price: 650,
      image: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Reboso Tradicional",
      brand: "Raíces",
      price: 920,
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-xops-cream">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-xops-blue/10 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-12 h-12 text-xops-blue" />
          </div>
          <h1 className="text-3xl font-bold text-xops-dark mb-2">{user.name}</h1>
          <p className="text-gray-600 text-lg">{user.email}</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Productos Favoritos - Destacado */}
          <Card className="p-6 border-0 shadow-lg bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-xops-dark">Productos Favoritos</h2>
              </div>
              <span className="text-lg font-medium text-xops-blue">{likedProducts.length} productos</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {likedProducts.map((product) => (
                <div key={product.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <Link to={`/product/${product.id}`} className="font-semibold text-xops-dark hover:text-xops-blue line-clamp-2">
                      {product.name}
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                    <p className="text-lg font-bold text-xops-blue">${product.price.toLocaleString()}</p>
                  </div>
                  <Button variant="outline" size="sm" className="self-start">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Marcas Seguidas - Destacado */}
          <Card className="p-6 border-0 shadow-lg bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-xops-blue/10 rounded-full flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-xops-blue" />
                </div>
                <h2 className="text-2xl font-bold text-xops-dark">Marcas Seguidas</h2>
              </div>
              <Link to="/brands" className="text-xops-blue hover:text-xops-blue/80 font-medium">
                Explorar más marcas
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {followedBrands.map((brand) => (
                <div key={brand.id} className="flex items-center justify-between p-5 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-xops-blue/10 rounded-full flex items-center justify-center">
                      <span className="text-xops-blue font-bold text-lg">
                        {brand.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <Link to={`/brand/${brand.id}`} className="font-semibold text-xops-dark hover:text-xops-blue text-lg">
                        {brand.name}
                      </Link>
                      <p className="text-sm text-gray-600">{brand.category} • {brand.location}</p>
                      <p className="text-xs text-gray-500">{brand.followers.toLocaleString()} seguidores</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-xops-blue/5 border-xops-blue text-xops-blue hover:bg-xops-blue hover:text-white">
                    Siguiendo
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Información Personal - Collapsible */}
          <Collapsible open={isPersonalInfoOpen} onOpenChange={setIsPersonalInfoOpen}>
            <Card className="border-0 shadow-md bg-white">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full p-6 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-xops-dark">Información Personal</h3>
                  </div>
                  {isPersonalInfoOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-xops-dark mb-2">
                        Nombre completo
                      </label>
                      <Input defaultValue={user.name} />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-xops-dark mb-2">
                        Email
                      </label>
                      <Input defaultValue={user.email} type="email" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-xops-dark mb-2">
                        Teléfono
                      </label>
                      <Input defaultValue={user.phone} />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-xops-dark mb-2">
                        Dirección
                      </label>
                      <Input defaultValue={user.address} />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button className="btn-primary">Guardar Cambios</Button>
                    <Button variant="outline">Cancelar</Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Pedidos Pasados - Collapsible */}
          <Collapsible open={isOrdersOpen} onOpenChange={setIsOrdersOpen}>
            <Card className="border-0 shadow-md bg-white">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full p-6 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-xops-dark">Historial de Pedidos</h3>
                  </div>
                  {isOrdersOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                        <div>
                          <p className="font-medium text-xops-dark">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.date} • {order.brand}</p>
                          <p className="text-sm text-gray-500">{order.items} artículo{order.items > 1 ? 's' : ''}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold text-xops-dark">${order.total.toLocaleString()}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'Entregado' ? 'bg-green-100 text-green-800' :
                            order.status === 'En camino' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 border-0 shadow-md text-center bg-gradient-to-br from-xops-blue/5 to-xops-blue/10">
              <p className="text-3xl font-bold text-xops-blue mb-1">12</p>
              <p className="text-sm text-gray-600">Pedidos Totales</p>
            </Card>
            
            <Card className="p-6 border-0 shadow-md text-center bg-gradient-to-br from-green-50 to-green-100">
              <p className="text-3xl font-bold text-green-600 mb-1">$8,450</p>
              <p className="text-sm text-gray-600">Total Gastado</p>
            </Card>
            
            <Card className="p-6 border-0 shadow-md text-center bg-gradient-to-br from-purple-50 to-purple-100">
              <p className="text-3xl font-bold text-purple-600 mb-1">{followedBrands.length}</p>
              <p className="text-sm text-gray-600">Marcas Seguidas</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
