
import { motion } from 'framer-motion';
import { X, Mail, Phone, Calendar, ShoppingBag, Tag, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  lastPurchase?: string;
  lastInteraction: string;
  status: 'Nuevo' | 'Recurrente' | 'Inactivo';
  totalSpent: number;
  tags: string[];
  notes?: string;
  purchaseHistory: Array<{
    id: string;
    product: string;
    amount: number;
    date: string;
  }>;
}

interface CustomerDetailModalProps {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
}

const CustomerDetailModal = ({ customer, isOpen, onClose }: CustomerDetailModalProps) => {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recurrente':
        return 'bg-green-100 text-green-800';
      case 'Nuevo':
        return 'bg-blue-100 text-blue-800';
      case 'Inactivo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-xops-blue to-xops-blue/80 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {customer.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-xops-dark">{customer.name}</h2>
              <Badge className={`text-sm ${getStatusColor(customer.status)} mt-1`}>
                {customer.status}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Información de contacto */}
          <Card className="p-4 border-0 bg-gray-50">
            <h3 className="text-lg font-semibold text-xops-dark mb-4">Información de Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{customer.email}</p>
                </div>
              </div>
              {customer.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-medium">{customer.phone}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Última interacción</p>
                  <p className="font-medium">{customer.lastInteraction}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Total gastado</p>
                  <p className="font-bold text-xops-blue text-lg">${customer.totalSpent.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Etiquetas */}
          <Card className="p-4 border-0 bg-gray-50">
            <h3 className="text-lg font-semibold text-xops-dark mb-4">Etiquetas</h3>
            <div className="flex flex-wrap gap-2">
              {customer.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Notas */}
          {customer.notes && (
            <Card className="p-4 border-0 bg-gray-50">
              <h3 className="text-lg font-semibold text-xops-dark mb-4">Notas</h3>
              <p className="text-gray-700">{customer.notes}</p>
            </Card>
          )}

          {/* Historial de compras */}
          <Card className="p-4 border-0 bg-gray-50">
            <h3 className="text-lg font-semibold text-xops-dark mb-4">Historial de Compras</h3>
            <div className="space-y-3">
              {customer.purchaseHistory.map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div>
                    <p className="font-medium text-xops-dark">{purchase.product}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(purchase.date).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <p className="font-bold text-xops-blue">${purchase.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Acciones */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button className="flex-1" variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Editar Cliente
            </Button>
            <Button className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Enviar Email
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerDetailModal;
