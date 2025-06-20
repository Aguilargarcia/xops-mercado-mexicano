
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Package,
  ShoppingCart,
  QrCode,
  Settings,
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Inventario', path: '/admin/inventory', icon: Package },
    { name: 'Pedidos', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Escaneo QR', path: '/admin/qr-scan', icon: QrCode },
    { name: 'Opciones', path: '/admin/settings', icon: Settings }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-xops-cream flex">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white shadow-xl transition-all duration-300 flex flex-col border-r border-gray-100`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          {sidebarOpen ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-xops-blue to-xops-blue/80 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">X</span>
              </div>
              <span className="text-2xl font-bold text-xops-dark">Xops</span>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-xops-blue to-xops-blue/80 rounded-xl flex items-center justify-center shadow-md mx-auto">
              <span className="text-white font-bold text-lg">X</span>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group ${
                    isActive(item.path) 
                      ? 'bg-gradient-to-r from-xops-blue to-xops-blue/90 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-xops-blue/5 hover:text-xops-blue hover:shadow-sm'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${
                    isActive(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-xops-blue'
                  }`} />
                  {sidebarOpen && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full justify-center hover:bg-gray-50"
          >
            <Menu className="w-4 h-4" />
            {sidebarOpen && <span className="ml-2">Contraer</span>}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span className="ml-2">Cerrar Sesión</span>}
          </Button>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
