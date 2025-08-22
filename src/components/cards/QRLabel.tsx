
import { useState } from 'react';
import { QrCode, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Product } from '@/types';

interface QRLabelProps {
  product: Product;
  onGenerateQR: (productId: string) => string;
}

const QRLabel = ({ product, onGenerateQR }: QRLabelProps) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerateQR = () => {
    onGenerateQR(product.id);
  };

  return (
    <Card className="p-6 border-0 shadow-lg bg-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-xops-dark">{product.name}</h3>
          <p className="text-sm text-gray-600">ID: {product.id}</p>
        </div>
        <div className="w-12 h-12 bg-xops-blue/10 rounded-lg flex items-center justify-center">
          <QrCode className="w-6 h-6 text-xops-blue" />
        </div>
      </div>

      <div className="space-y-3">
        {!product.qrCode ? (
          <Button 
            onClick={handleGenerateQR}
            className="w-full bg-xops-blue hover:bg-xops-blue/90"
          >
            <QrCode className="w-4 h-4 mr-2" />
            Generar Etiqueta QR
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
                className="flex-1"
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Ocultar' : 'Vista Previa'}
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar
              </Button>
            </div>

            {/* Vista previa de la etiqueta */}
            {showPreview && (
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center">
                <div className="bg-gray-100 w-24 h-24 mx-auto mb-4 rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-gray-400" />
                </div>
                <h4 className="font-semibold text-xops-dark mb-1">{product.name}</h4>
                <p className="text-sm text-gray-600">${product.price.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-2">XOPS.app/venta/{product.id}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default QRLabel;
