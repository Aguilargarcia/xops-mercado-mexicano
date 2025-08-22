
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2A2A2A] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-xops-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-archivo-black text-sm">X</span>
              </div>
              <span className="text-xl font-archivo-black">XOPS</span>
            </div>
            <p className="text-gray-300 font-archivo">
              Conectando México con el mundo, una marca a la vez.
            </p>
          </div>
          
          <div>
            <h4 className="font-archivo mb-4">Compra</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/brands" className="hover:text-white transition-colors font-archivo">Marcas</Link></li>
              <li><a href="#" className="hover:text-white transition-colors font-archivo">Categorías</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-archivo">Nuevos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-archivo mb-4">Soporte</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors font-archivo">Ayuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-archivo">Envíos</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-archivo">Devoluciones</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-archivo mb-4">¿Eres marca?</h4>
            <p className="text-gray-300 mb-4 font-archivo">Únete a nuestra plataforma</p>
            <Link to="/admin/login" className="btn-primary inline-block">
              Vender en XOPS
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
          <p className="font-archivo">&copy; 2024 XOPS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
