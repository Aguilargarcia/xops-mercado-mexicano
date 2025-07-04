
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  onNewProduct: () => void;
}

const DashboardHeader = ({ onNewProduct }: DashboardHeaderProps) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10"
    >
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-archivo text-xops-dark">Dashboard</h1>
            <p className="text-gray-600 mt-2 font-archivo">
              Bienvenido de vuelta a tu panel de control de{' '}
              <span className="font-archivo-black text-lg text-xops-blue">Xops</span>
            </p>
          </div>
          <Button 
            className="bg-xops-blue hover:bg-xops-blue/90 text-white shadow-lg font-archivo"
            onClick={onNewProduct}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
