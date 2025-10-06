
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { DEMO_CREDENTIALS } from '@/config/mockData';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login(email, password);
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
      });
      
      console.log('🔍 Usuario logueado:', user);
      console.log('🎯 Tipo de usuario:', user?.type);
      console.log('🎯 Role del usuario:', user?.role);
      
      // Redirección forzada para marcas
      if (user?.type === 'marca') {
        console.log('🔄 Redirigiendo marca al dashboard - FORZADO');
        // Usar setTimeout para asegurar que la navegación ocurra después del estado
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 100);
      } else {
        console.log('🔄 Redirigiendo cliente a home');
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 100);
      }
    } catch (error) {
      toast({
        title: "Error de autenticación",
        description: "Email o contraseña incorrectos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="w-full"
          />
        </div>

        {/* Contraseña */}
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              required
              className="w-full pr-10"
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

        {/* Recordar sesión y olvidé contraseña */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Recordar sesión
          </label>
          <button
            type="button"
            className="text-xops-black hover:text-xops-black/80"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Botón de submit */}
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
      </form>

      {/* Credenciales de prueba */}
      <div className="mt-6 p-4 bg-xops-cream/50 rounded-lg">
        <p className="text-sm font-medium text-xops-dark mb-2">Credenciales de prueba:</p>
        <div className="space-y-1">
          <p className="text-xs text-gray-600">
            <strong>Cliente:</strong> {DEMO_CREDENTIALS.client.email} / {DEMO_CREDENTIALS.client.password}
          </p>
          <p className="text-xs text-gray-600">
            <strong>Marca:</strong> {DEMO_CREDENTIALS.brand.email} / {DEMO_CREDENTIALS.brand.password}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
