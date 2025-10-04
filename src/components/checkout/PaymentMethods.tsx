
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Apple, Store, Shield, Lock } from 'lucide-react';

interface PaymentMethodsProps {
  selectedMethod: 'card' | 'apple-pay' | 'oxxo';
  onMethodChange: (method: 'card' | 'apple-pay' | 'oxxo') => void;
}

const PaymentMethods = ({ selectedMethod, onMethodChange }: PaymentMethodsProps) => {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleCardInputChange = (field: keyof typeof cardData, value: string) => {
    setCardData({ ...cardData, [field]: value });
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    return value.replace(/\D/g, '').replace(/(.{2})/, '$1/').substring(0, 5);
  };

  return (
    <Card className="p-6 border-0 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-xops-black/10 rounded-full flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-xops-black" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-xops-dark">Método de Pago</h2>
          <p className="text-sm text-gray-600">Elige cómo prefieres pagar</p>
        </div>
      </div>

      <Tabs value={selectedMethod} onValueChange={(value) => onMethodChange(value as any)}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="card" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Tarjeta
          </TabsTrigger>
          <TabsTrigger value="apple-pay" className="flex items-center gap-2">
            <Apple className="w-4 h-4" />
            Apple Pay
          </TabsTrigger>
          <TabsTrigger value="oxxo" className="flex items-center gap-2">
            <Store className="w-4 h-4" />
            OXXO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="card" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número de tarjeta</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formatCardNumber(cardData.number)}
                onChange={(e) => handleCardInputChange('number', e.target.value.replace(/\s/g, ''))}
                maxLength={19}
                className="focus:ring-xops-blue focus:border-xops-blue"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Vencimiento</Label>
                <Input
                  id="expiry"
                  placeholder="MM/AA"
                  value={formatExpiry(cardData.expiry)}
                  onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                  maxLength={5}
                  className="focus:ring-xops-blue focus:border-xops-blue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cardData.cvc}
                  onChange={(e) => handleCardInputChange('cvc', e.target.value.replace(/\D/g, ''))}
                  maxLength={4}
                  className="focus:ring-xops-blue focus:border-xops-blue"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardName">Nombre en la tarjeta</Label>
              <Input
                id="cardName"
                placeholder="Como aparece en tu tarjeta"
                value={cardData.name}
                onChange={(e) => handleCardInputChange('name', e.target.value)}
                className="focus:ring-xops-blue focus:border-xops-blue"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
            <Shield className="w-4 h-4" />
            Tu información está protegida con cifrado SSL
          </div>
        </TabsContent>

        <TabsContent value="apple-pay">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Apple className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-lg font-semibold text-xops-dark mb-2">Apple Pay</h3>
            <p className="text-gray-600 mb-6">
              Paga de forma rápida y segura con Touch ID o Face ID
            </p>
            
            <Button 
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg"
              disabled
            >
              <Apple className="w-5 h-5 mr-2" />
              Próximamente disponible
            </Button>
            
            <p className="text-xs text-gray-500 mt-3">
              Compatible con dispositivos Apple
            </p>
          </div>
        </TabsContent>

        <TabsContent value="oxxo">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-lg font-semibold text-xops-dark mb-2">Pago en OXXO</h3>
            <p className="text-gray-600 mb-6">
              Genera un código de pago y paga en cualquier tienda OXXO
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-yellow-800 mb-2">¿Cómo funciona?</h4>
              <ol className="text-sm text-yellow-700 space-y-1 text-left">
                <li>1. Completa tu pedido</li>
                <li>2. Recibe tu código de pago por email</li>
                <li>3. Ve a cualquier OXXO y menciona "Pago de servicios"</li>
                <li>4. Proporciona tu código y paga en efectivo</li>
              </ol>
            </div>
            
            <p className="text-xs text-gray-500">
              El código expira en 3 días. Tu pedido se procesa al confirmar el pago.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2 text-green-800">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">Pago 100% seguro</span>
        </div>
        <p className="text-xs text-green-700 mt-1">
          Todos los pagos están protegidos con tecnología de cifrado avanzada
        </p>
      </div>
    </Card>
  );
};

export default PaymentMethods;
