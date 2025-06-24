
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-xops-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-xops-blue mb-2">Xops</h1>
          </Link>
          <p className="text-xops-dark/70">
            {isLogin ? 'Inicia sesión en tu cuenta' : 'Crea tu cuenta en Xops'}
          </p>
        </div>

        {/* Tarjeta principal */}
        <Card className="p-6 bg-white shadow-lg border-0">
          {/* Toggle entre Login y Registro */}
          <div className="flex mb-6 bg-xops-cream rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin
                  ? 'bg-white text-xops-dark shadow-sm'
                  : 'text-xops-dark/60 hover:text-xops-dark'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin
                  ? 'bg-white text-xops-dark shadow-sm'
                  : 'text-xops-dark/60 hover:text-xops-dark'
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Formularios */}
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </Card>

        {/* Enlaces adicionales */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-xops-blue hover:text-xops-blue/80 text-sm"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
