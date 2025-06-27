
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, ShoppingCart, QrCode, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

const QuickActionsSection = () => {
  const actions = [
    {
      title: "Agregar Producto",
      icon: Plus,
      path: "/admin/inventory",
      className: "bg-gradient-to-br from-xops-blue to-xops-blue/90 text-white border-0"
    },
    {
      title: "Ver Pedidos",
      icon: ShoppingCart,
      path: "/admin/orders",
      className: "border-0"
    },
    {
      title: "Escanear QR",
      icon: QrCode,
      path: "/admin/qr-scan",
      className: "border-0"
    },
    {
      title: "Configuración",
      icon: Users,
      path: "/admin/settings",
      className: "border-0"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {actions.map((action, index) => (
        <motion.div
          key={action.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <Link to={action.path}>
            <Card className={`p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer ${action.className}`}>
              <div className="flex items-center gap-4">
                <action.icon className={`w-8 h-8 ${action.className.includes('text-white') ? '' : 'text-xops-blue'}`} />
                <span className={`font-semibold text-lg ${action.className.includes('text-white') ? '' : 'text-xops-dark'}`}>
                  {action.title}
                </span>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickActionsSection;
