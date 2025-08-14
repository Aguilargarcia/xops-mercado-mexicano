
import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import CheckoutTabs from '@/components/checkout/CheckoutTabs';

export interface CustomerInfo {
  fullName: string;
  email: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface OrderItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

const Checkout = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'apple-pay' | 'oxxo'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock order data - esto vendría del carrito
  const orderItems: OrderItem[] = [
    {
      id: '1',
      name: 'Bolsa Artesanal Oaxaca',
      brand: 'Tlalli',
      price: 899,
      quantity: 2,
      image: '/placeholder.svg',
      size: 'M'
    },
    {
      id: '2',
      name: 'Playera Bordada Yucatán',
      brand: 'Raíces',
      price: 450,
      quantity: 1,
      image: '/placeholder.svg',
      size: 'L'
    }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 800 ? 0 : 150;
  const total = subtotal + shipping;

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // Simulación del proceso de pago
    console.log('=== DATOS DEL PAGO ===');
    console.log('Información del cliente:', customerInfo);
    console.log('Método de pago:', selectedPaymentMethod);
    console.log('Productos:', orderItems);
    console.log('Subtotal:', subtotal);
    console.log('Envío:', shipping);
    console.log('Total:', total);
    
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    alert('Pago procesado exitosamente (simulación)');
  };

  const isFormValid = (): boolean => {
    return !!(customerInfo.fullName && 
           customerInfo.email && 
           customerInfo.street && 
           customerInfo.number && 
           customerInfo.neighborhood && 
           customerInfo.city && 
           customerInfo.state && 
           customerInfo.zipCode);
  };

  return (
    <div className="min-h-screen bg-xops-cream">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-xops-dark mb-2">Finalizar Compra</h1>
          <p className="text-gray-600">Completa tu información para procesar el pago</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <CheckoutTabs
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            orderItems={orderItems}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            onSubmit={handleSubmit}
            isProcessing={isProcessing}
            isFormValid={isFormValid}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
