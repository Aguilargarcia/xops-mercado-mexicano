import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import CustomerInfoForm from './CustomerInfoForm';
import PaymentMethods from './PaymentMethods';
import OrderSummary from './OrderSummary';
import { CustomerInfo, OrderItem } from '@/pages/Checkout';

interface CheckoutTabsProps {
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
  selectedPaymentMethod: 'card' | 'apple-pay' | 'oxxo';
  setSelectedPaymentMethod: (method: 'card' | 'apple-pay' | 'oxxo') => void;
  orderItems: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onSubmit: () => void;
  isProcessing: boolean;
  isFormValid: () => boolean;
}

const CheckoutTabs = ({
  customerInfo,
  setCustomerInfo,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  orderItems,
  subtotal,
  shipping,
  total,
  onSubmit,
  isProcessing,
  isFormValid
}: CheckoutTabsProps) => {
  const [activeTab, setActiveTab] = useState('personal-info');

  const isPersonalInfoComplete = () => {
    return customerInfo.fullName && 
           customerInfo.email && 
           customerInfo.street && 
           customerInfo.number && 
           customerInfo.neighborhood && 
           customerInfo.city && 
           customerInfo.state && 
           customerInfo.zipCode;
  };

  const handleNextTab = () => {
    if (activeTab === 'personal-info') {
      setActiveTab('payment');
    } else if (activeTab === 'payment') {
      setActiveTab('summary');
    }
  };

  const handlePrevTab = () => {
    if (activeTab === 'payment') {
      setActiveTab('personal-info');
    } else if (activeTab === 'summary') {
      setActiveTab('payment');
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger 
          value="personal-info" 
          className="data-[state=active]:bg-xops-black data-[state=active]:text-white"
        >
          1. Información Personal
        </TabsTrigger>
        <TabsTrigger 
          value="payment" 
          className="data-[state=active]:bg-xops-black data-[state=active]:text-white"
          disabled={!isPersonalInfoComplete()}
        >
          2. Método de Pago
        </TabsTrigger>
        <TabsTrigger 
          value="summary" 
          className="data-[state=active]:bg-xops-black data-[state=active]:text-white"
          disabled={!isPersonalInfoComplete()}
        >
          3. Resumen
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal-info" className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <CustomerInfoForm 
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
          />
          
          <div className="flex justify-end mt-6">
            <Button
              onClick={handleNextTab}
              disabled={!isPersonalInfoComplete()}
              className="btn-primary"
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </TabsContent>

      <TabsContent value="payment" className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <PaymentMethods
            selectedMethod={selectedPaymentMethod}
            onMethodChange={setSelectedPaymentMethod}
          />
          
          <div className="flex justify-between mt-6">
            <Button
              onClick={handlePrevTab}
              variant="outline"
              className="border-xops-black text-xops-black hover:bg-xops-black hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Regresar
            </Button>
            <Button
              onClick={handleNextTab}
              className="btn-primary"
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </TabsContent>

      <TabsContent value="summary" className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <OrderSummary
            items={orderItems}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
          
          <div className="flex justify-between mt-6">
            <Button
              onClick={handlePrevTab}
              variant="outline"
              className="border-xops-black text-xops-black hover:bg-xops-black hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Regresar
            </Button>
            <Button
              onClick={onSubmit}
              disabled={!isFormValid() || isProcessing}
              className="btn-primary text-lg px-8 py-3"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Procesando pago...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Pagar ${total.toLocaleString()}
                </>
              )}
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-3 text-center flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Pago seguro protegido por SSL
          </p>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};

export default CheckoutTabs;