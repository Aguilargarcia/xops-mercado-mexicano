
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Eye, EyeOff, User, Store } from 'lucide-react';

const RegisterForm = () => {
  const [userType, setUserType] = useState('cliente'); // 'cliente' o 'marca'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    brandName: '', // Solo para marcas
    phone: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Función para actualizar datos del formulario
  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Función mock para manejar el registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (!formData.acceptTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    setIsLoading(true);

    // Simulamos una llamada al backend
    console.log('📝 Datos de registro:', {
      ...formData,
      userType
    });
    
    // Simulamos tiempo de carga
    setTimeout(() => {
      setIsLoading(false);
      alert(`Registro exitoso como ${userType}! (esto es una simulación)`);
    }, 1000);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {/* Selector de tipo de usuario */}
      <div className="space-y-3">
        <Label>¿Qué tipo de cuenta quieres crear?</Label>
        <RadioGroup 
          value={userType} 
          onValueChange={setUserType}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cliente" id="cliente" />
            <Label htmlFor="cliente" className="flex items-center gap-2 cursor-pointer">
              <User size={16} />
              Soy cliente
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="marca" id="marca" />
            <Label htmlFor="marca" className="flex items-center gap-2 cursor-pointer">
              <Store size={16} />
              Tengo una marca
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Nombre */}
      <div className="space-y-2">
        <Label htmlFor="name">
          {userType === 'marca' ? 'Nombre del responsable' : 'Nombre completo'}
        </Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          placeholder={userType === 'marca' ? 'Juan Pérez' : 'Tu nombre completo'}
          required
        />
      </div>

      {/* Nombre de marca (solo para marcas) */}
      {userType === 'marca' && (
        <div className="space-y-2">
          <Label htmlFor="brandName">Nombre de la marca</Label>
          <Input
            id="brandName"
            type="text"
            value={formData.brandName}
            onChange={(e) => updateFormData('brandName', e.target.value)}
            placeholder="Nombre de tu marca"
            required
          />
        </div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          placeholder="tu@email.com"
          required
        />
      </div>

      {/* Teléfono */}
      <div className="space-y-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          placeholder="+52 123 456 7890"
          required
        />
      </div>

      {/* Contraseña */}
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
            placeholder="Mínimo 8 caracteres"
            required
            minLength={8}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* Confirmar contraseña */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => updateFormData('confirmPassword', e.target.value)}
          placeholder="Repite tu contraseña"
          required
        />
      </div>

      {/* Términos y condiciones */}
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={formData.acceptTerms}
          onChange={(e) => updateFormData('acceptTerms', e.target.checked)}
          className="mt-1"
          required
        />
        <Label htmlFor="terms" className="text-sm cursor-pointer">
          Acepto los{' '}
          <button type="button" className="text-xops-blue hover:text-xops-blue/80">
            términos y condiciones
          </button>
          {' '}y la{' '}
          <button type="button" className="text-xops-blue hover:text-xops-blue/80">
            política de privacidad
          </button>
        </Label>
      </div>

      {/* Botón de submit */}
      <Button 
        type="submit" 
        className="w-full bg-xops-blue hover:bg-xops-blue/90"
        disabled={isLoading}
      >
        {isLoading ? 'Creando cuenta...' : `Crear cuenta ${userType === 'marca' ? 'de marca' : 'de cliente'}`}
      </Button>
    </form>
  );
};

export default RegisterForm;
