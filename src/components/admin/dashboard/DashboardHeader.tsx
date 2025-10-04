
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
            <h1 className="text-3xl font-archivo text-xops-black">Dashboard</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-montserrat text-lg font-bold text-xops-blue">
                Xops<span className="text-xs font-black relative -top-1">®</span>
              </span>
              <span className="font-montserrat text-lg text-xops-blue">Admin</span>
            </div>
          </div>
          <Button 
            className="bg-xops-black hover:bg-xops-black/90 text-white shadow-lg font-archivo"
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
