
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User, Package, MapPin, CreditCard, Settings } from 'lucide-react';

const Profile = () => {
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-xops-dark mb-8">Mi Perfil</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-0 shadow-md">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-xops-blue/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-xops-blue" />
                </div>
                <h2 className="text-xl font-semibold text-xops-dark">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>

              <nav className="space-y-2">
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-xops-blue/10 text-xops-blue font-medium">
                  <User className="w-5 h-5" />
                  Información Personal
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  <Package className="w-5 h-5" />
                  Mis Pedidos
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  <MapPin className="w-5 h-5" />
                  Direcciones
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  <CreditCard className="w-5 h-5" />
                  Métodos de Pago
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  <Settings className="w-5 h-5" />
                  Configuración
                </a>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <Card className="p-6 border-0 shadow-md">
              <h3 className="text-xl font-semibold text-xops-dark mb-6">Información Personal</h3>
              
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
            </Card>

            {/* Recent Orders */}
            <Card className="p-6 border-0 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-xops-dark">Pedidos Recientes</h3>
                <Button variant="outline" size="sm">Ver todos</Button>
              </div>

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
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 border-0 shadow-md text-center">
                <p className="text-2xl font-bold text-xops-blue">12</p>
                <p className="text-sm text-gray-600">Pedidos Totales</p>
              </Card>
              
              <Card className="p-4 border-0 shadow-md text-center">
                <p className="text-2xl font-bold text-xops-blue">$8,450</p>
                <p className="text-sm text-gray-600">Total Gastado</p>
              </Card>
              
              <Card className="p-4 border-0 shadow-md text-center">
                <p className="text-2xl font-bold text-xops-blue">5</p>
                <p className="text-sm text-gray-600">Marcas Favoritas</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
