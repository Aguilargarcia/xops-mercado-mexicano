
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, MapPin } from 'lucide-react';
import { CustomerInfo } from '@/pages/Checkout';

interface CustomerInfoFormProps {
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
}

const CustomerInfoForm = ({ customerInfo, setCustomerInfo }: CustomerInfoFormProps) => {
  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo({ ...customerInfo, [field]: value });
  };

  return (
    <Card className="p-6 border-0 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-xops-blue/10 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-xops-blue" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-xops-dark">Información Personal</h2>
          <p className="text-sm text-gray-600">Datos necesarios para la entrega</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Información Personal */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Mail className="w-4 h-4" />
            Contacto
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre completo *</Label>
              <Input
                id="fullName"
                placeholder="Ingresa tu nombre completo"
                value={customerInfo.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="focus:ring-xops-blue focus:border-xops-blue"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico *</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={customerInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="focus:ring-xops-blue focus:border-xops-blue"
              />
            </div>
          </div>
        </div>

        {/* Dirección de Envío */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <MapPin className="w-4 h-4" />
            Dirección de envío
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="street">Calle *</Label>
              <Input
                id="street"
                placeholder="Nombre de la calle"
                value={customerInfo.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                className="focus:ring-xops-blue focus:border-xops-blue"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="number">Número *</Label>
              <Input
                id="number"
                placeholder="123"
                value={customerInfo.number}
                onChange={(e) => handleInputChange('number', e.target.value)}
                className="focus:ring-xops-blue focus:border-xops-blue"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Colonia *</Label>
              <Input
                id="neighborhood"
                placeholder="Nombre de la colonia"
                value={customerInfo.neighborhood}
                onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                className="focus:ring-xops-blue focus:border-xops-blue"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad *</Label>
              <Input
                id="city"
                placeholder="Ciudad"
                value={customerInfo.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="focus:ring-xops-blue focus:border-xops-blue"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">Estado *</Label>
              <Input
                id="state"
                placeholder="Estado"
                value={customerInfo.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="focus:ring-xops-blue focus:border-xops-blue"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zipCode">Código Postal *</Label>
              <Input
                id="zipCode"
                placeholder="12345"
                value={customerInfo.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className="focus:ring-xops-blue focus:border-xops-blue"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomerInfoForm;
