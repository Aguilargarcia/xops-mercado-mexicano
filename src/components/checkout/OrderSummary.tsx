
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Truck } from 'lucide-react';
import { OrderItem } from '@/pages/Checkout';

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

const OrderSummary = ({ items, subtotal, shipping, total }: OrderSummaryProps) => {
  return (
    <Card className="p-6 border-0 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-xops-black/10 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-xops-black" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-xops-dark">Resumen del Pedido</h2>
          <p className="text-sm text-gray-600">{items.length} producto{items.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-xops-dark truncate">{item.name}</h4>
              <p className="text-sm text-xops-blue">{item.brand}</p>
              {item.size && (
                <Badge variant="outline" className="text-xs mt-1">
                  Talla: {item.size}
                </Badge>
              )}
            </div>

            <div className="text-right">
              <p className="font-semibold text-xops-dark">
                ${(item.price * item.quantity).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                {item.quantity} × ${item.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Totales */}
      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between text-gray-600 items-center">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Envío</span>
          </div>
          <span>
            {shipping === 0 ? (
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                Gratis
              </Badge>
            ) : (
              `$${shipping}`
            )}
          </span>
        </div>
        
        {shipping === 0 && (
          <p className="text-xs text-green-600 flex items-center gap-1">
            <Truck className="w-3 h-3" />
            ¡Envío gratis por compra mayor a $800!
          </p>
        )}
        
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-bold text-xops-dark">
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 p-4 bg-xops-black/5 rounded-lg">
        <h4 className="font-medium text-xops-dark mb-2 text-sm">Información de Entrega</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Entrega en 3-5 días hábiles</li>
          <li>• Rastreo incluido</li>
          <li>• Empaque ecológico</li>
          <li>• Productos de marcas mexicanas verificadas</li>
        </ul>
      </div>
    </Card>
  );
};

export default OrderSummary;
