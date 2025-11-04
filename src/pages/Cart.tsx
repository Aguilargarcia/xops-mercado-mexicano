
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { items: cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  const shipping = subtotal > 800 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-xops-dark mb-8">Mi Cesta</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Tu cesta está vacía</h2>
            <p className="text-gray-500 mb-6">¡Descubre productos increíbles de marcas mexicanas!</p>
            <Link to="/brands">
              <Button className="btn-primary">Explorar Marcas</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-6 border-0 shadow-md">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-xops-dark">{item.name}</h3>
                      <p className="text-sm text-xops-blue">{item.brand}</p>
                      <p className="text-sm text-gray-600">Talla: {item.size}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <p className="font-semibold text-xops-dark">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.price} c/u
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 border-0 shadow-md sticky top-24">
                <h2 className="text-xl font-semibold text-xops-dark mb-6">Resumen del Pedido</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Gratis' : `$${shipping}`}
                    </span>
                  </div>
                  
                  {shipping === 0 && (
                    <p className="text-sm text-green-600">
                      ¡Envío gratis por compra mayor a $800!
                    </p>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-xops-dark">${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button className="w-full text-lg py-3 mb-4">
                    Proceder al Pago
                  </Button>
                </Link>

                <div className="text-center">
                  <Link 
                    to="/brands" 
                    className="text-xops-blue hover:text-xops-blue/80 text-sm font-medium"
                  >
                    ← Seguir comprando
                  </Link>
                </div>

                {/* Shipping Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-xops-dark mb-2">Información de Envío</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Envío gratis en pedidos +$800</li>
                    <li>• Entrega en 3-5 días hábiles</li>
                    <li>• Rastreo incluido</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
