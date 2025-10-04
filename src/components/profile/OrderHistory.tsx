
import { useState } from 'react';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
  brand: string;
}

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory = ({ orders }: OrderHistoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border-0 shadow-md bg-white">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full p-6 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-xops-dark">Historial de Pedidos</h3>
            </div>
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-6 pb-6">
            <div className="space-y-4">
              {orders.map((order) => (
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
                      order.status === 'En camino' ? 'bg-xops-black/10 text-xops-black' :
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
  );
};

export default OrderHistory;
