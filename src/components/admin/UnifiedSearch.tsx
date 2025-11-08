import { Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface UnifiedSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const UnifiedSearch = ({ searchTerm, onSearchChange }: UnifiedSearchProps) => {
  const location = useLocation();
  
  const getPlaceholder = () => {
    if (location.pathname.includes('/inventory')) {
      return 'Buscar productos por nombre o categoría...';
    } else if (location.pathname.includes('/orders')) {
      return 'Buscar por ID de pedido, cliente o producto...';
    } else if (location.pathname.includes('/crm')) {
      return 'Buscar clientes por nombre, email o teléfono...';
    }
    return 'Buscar...';
  };

  return (
    <div className="relative flex-1 max-w-2xl">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder={getPlaceholder()}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
      />
    </div>
  );
};

export default UnifiedSearch;
