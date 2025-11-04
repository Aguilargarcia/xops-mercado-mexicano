
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="font-montserrat text-3xl font-bold text-xops-blue">
              Xops<span className="text-xs font-black relative -top-2.5">®</span>
            </span>
          </Link>
        </div>

        <Card className="p-8 shadow-xl border-0">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-tertiary mb-2">
              {isLogin ? 'Bienvenido' : 'Crea tu cuenta'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Inicia sesión para continuar' : 'Únete a la comunidad Xops'}
            </p>
          </div>

          {/* Toggle entre Login y Registro */}
          <div className="flex mb-6 bg-gray-50 rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin
                  ? 'bg-white text-tertiary shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-tertiary'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin
                  ? 'bg-white text-tertiary shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-tertiary'
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Formularios */}
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-xops-blue">
            ← Volver al sitio principal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
