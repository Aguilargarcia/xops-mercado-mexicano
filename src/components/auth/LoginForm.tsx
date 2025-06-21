
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Función mock para manejar el login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulamos una llamada al backend
    console.log('🔐 Datos de login:', { email, password });
    
    // Simulamos tiempo de carga
    setTimeout(() => {
      setIsLoading(false);
      alert('Login exitoso! (esto es una simulación)');
    }, 1000);
  };

  return (
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
          className="text-xops-blue hover:text-xops-blue/80"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      {/* Botón de submit */}
      <Button 
        type="submit" 
        className="w-full bg-xops-blue hover:bg-xops-blue/90"
        disabled={isLoading}
      >
        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
};

export default LoginForm;
