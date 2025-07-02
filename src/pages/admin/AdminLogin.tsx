
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { DEMO_CREDENTIALS, SITE_CONFIG } from '@/config/mockData';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loginWithUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - replace with real authentication
    setTimeout(() => {
      if (email === DEMO_CREDENTIALS.brand.email && password === DEMO_CREDENTIALS.brand.password) {
        loginWithUser({
          id: '1',
          email: email,
          name: 'Marca Demo',
          type: 'marca',
          role: 'admin'
        });
        
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente",
        });
        navigate(SITE_CONFIG.routes.dashboard);
      } else {
        toast({
          title: "Error de autenticación",
          description: "Email o contraseña incorrectos",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-xops-blue/10 to-xops-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to={SITE_CONFIG.routes.home} className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-xops-blue rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">X</span>
            </div>
            <span className="text-2xl font-bold text-xops-dark">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-2 text-gray-600">Panel de Administrador</p>
        </div>

        <Card className="p-8 shadow-xl border-0">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-xops-dark mb-2">
              Acceso para Marcas
            </h1>
            <p className="text-gray-600">
              Inicia sesión para gestionar tu tienda
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-xops-dark">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="tu@marca.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-xops-dark">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <a href="#" className="text-xops-blue hover:text-xops-blue/80 font-medium">
                Regístrate como marca
              </a>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-xops-cream/50 rounded-lg">
            <p className="text-sm font-medium text-xops-dark mb-2">Credenciales Demo:</p>
            <p className="text-xs text-gray-600">Email: {DEMO_CREDENTIALS.brand.email}</p>
            <p className="text-xs text-gray-600">Contraseña: {DEMO_CREDENTIALS.brand.password}</p>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Link to={SITE_CONFIG.routes.home} className="text-sm text-gray-600 hover:text-xops-blue">
            ← Volver al sitio principal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
