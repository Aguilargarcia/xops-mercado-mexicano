import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingBag, UserCircle, Users } from 'lucide-react';

interface CartAuthPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onGuest: () => void;
  productName: string;
}

const CartAuthPrompt = ({ isOpen, onClose, onLogin, onGuest, productName }: CartAuthPromptProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-xops-dark">
            ¿Cómo deseas continuar?
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <ShoppingBag className="w-12 h-12 text-xops-black mx-auto mb-3" />
            <p className="text-gray-600 text-sm">
              Para agregar <strong>{productName}</strong> a tu cesta
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={onLogin}
              className="w-full bg-white text-black border border-black hover:bg-black hover:text-white py-3"
            >
              <UserCircle className="w-5 h-5 mr-2" />
              Iniciar Sesión
            </Button>

            <Button 
              onClick={onGuest}
              variant="outline"
              className="w-full border-xops-black text-xops-black hover:bg-xops-black hover:text-white py-3"
            >
              <Users className="w-5 h-5 mr-2" />
              Comprar como Invitado
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Con una cuenta puedes guardar tus productos favoritos y hacer seguimiento a tus pedidos
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartAuthPrompt;