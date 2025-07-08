
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DEMO_CREDENTIALS } from '@/config/mockData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const user = await login(email, password);
      onClose();
      // Reset form
      setEmail('');
      setPassword('');
      
      // Redirección basada en tipo de usuario
      console.log('🔍 Usuario logueado desde modal:', user);
      console.log('🎯 Tipo de usuario:', user?.type);
      
      if (user?.type === 'marca') {
        console.log('🔄 Redirigiendo marca al dashboard desde modal');
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 100);
      } else {
        console.log('🔄 Redirigiendo cliente a home desde modal');
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 100);
      }
    } catch (err) {
      setError(`Credenciales incorrectas. Intenta con: ${DEMO_CREDENTIALS.client.email} / ${DEMO_CREDENTIALS.brand.email} (contraseña: 123456)`);
    }
  };

  const handleClose = () => {
    onClose();
    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-xops-blue">
            Iniciar Sesión
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

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

          <div className="space-y-3">
            <Button 
              type="submit" 
              className="w-full bg-xops-blue hover:bg-xops-blue/90"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  window.location.href = '/register';
                }}
                className="text-xops-blue hover:text-xops-blue/80 font-medium"
              >
                Regístrate aquí
              </button>
            </div>
          </div>

          {/* Credenciales de prueba */}
          <div className="border-t pt-4 space-y-2">
            <p className="text-xs text-gray-500 text-center">Credenciales de prueba:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Cliente: {DEMO_CREDENTIALS.client.email}</div>
              <div>Marca: {DEMO_CREDENTIALS.brand.email}</div>
              <div>Contraseña: 123456</div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
