
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-xops-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-xops-blue mb-2">Xops</h1>
          </Link>
          <p className="text-xops-dark/70">
            Crea tu cuenta en Xops
          </p>
        </div>

        {/* Tarjeta principal */}
        <Card className="p-6 bg-white shadow-lg border-0">
          <RegisterForm />
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

export default Register;
