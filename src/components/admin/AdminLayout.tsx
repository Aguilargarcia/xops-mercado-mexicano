
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
  Menu,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRoutes } from '@/hooks/useRoutes';
import BrandSelector from './BrandSelector';
import AIAssistant from './AIAssistant';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiAssistantMode, setAiAssistantMode] = useState<'sidebar' | 'fullscreen'>('sidebar');
  const location = useLocation();
  const { logout } = useAuth();
  const { goTo } = useRoutes();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Inventario',
      path: '/inventory',
      icon: Package
    },
    {
      name: 'Pedidos',
      path: '/orders',
      icon: ShoppingCart
    },
    {
      name: 'Escaneo QR',
      path: '/qr-scan',
      icon: QrCode
    },
    {
      name: 'Opciones',
      path: '/settings',
      icon: Settings
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    goTo.home();
  };

  const handleAIAssistantOpen = (mode: 'sidebar' | 'fullscreen') => {
    setAiAssistantMode(mode);
    setShowAIAssistant(true);
  };

  return (
    <div className="min-h-screen bg-xops-cream flex">
      {/* Sidebar - Single instance */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white shadow-xl transition-all duration-300 flex flex-col border-r border-gray-100 relative z-10`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          {sidebarOpen ? (
            <BrandSelector />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-xops-blue to-xops-blue/80 rounded-xl flex items-center justify-center shadow-md mx-auto">
              <span className="text-white font-bold text-lg">X</span>
            </div>
          )}
        </div>

        {/* Navigation */}
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

            {/* Asistente IA Button - Fullscreen mode */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={() => handleAIAssistantOpen('fullscreen')}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group justify-start h-auto bg-gradient-to-r from-xops-blue to-xops-blue/90 hover:from-xops-blue/90 hover:to-xops-blue text-white shadow-lg hover:shadow-xl`}
              >
                <MessageCircle className="w-5 h-5" />
                {sidebarOpen && (
                  <span className="font-medium">Asistente IA</span>
                )}
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={goTo.home}
            className="w-full justify-start text-xops-blue hover:text-xops-blue/80 hover:bg-xops-blue/5"
          >
            <ArrowLeft className="w-4 h-4" />
            {sidebarOpen && <span className="ml-2">Ver como cliente</span>}
          </Button>
          
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
            onClick={handleLogout}
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span className="ml-2">Cerrar Sesión</span>}
          </Button>
        </div>
      </motion.div>

      {/* Main Content Area - No duplications here */}
      <div className="flex-1 overflow-auto relative">
        {children}
        
        {/* FAB - Floating Action Button - Single instance */}
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button
            onClick={() => handleAIAssistantOpen('sidebar')}
            className="w-14 h-14 rounded-full bg-xops-blue hover:bg-xops-blue/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            size="icon"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </motion.div>
        
        {/* AI Assistant Component - Single instance */}
        <AIAssistant 
          isOpen={showAIAssistant} 
          onOpenChange={setShowAIAssistant}
          mode={aiAssistantMode}
        />
      </div>
    </div>
  );
};

export default AdminLayout;
