
import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Product } from '@/types/admin';

interface QRLabelGeneratorProps {
  product: Product;
  onGenerateQR: (productId: string) => string;
}

const QRLabelGenerator = ({ product, onGenerateQR }: QRLabelGeneratorProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [qrUrl, setQrUrl] = useState(product.qrCode || '');

  const handleGenerateQR = () => {
    const url = onGenerateQR(product.id);
    setQrUrl(url);
    setShowPreview(true);
  };

  return (
    <Card className="p-6 border-0 shadow-lg bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-xops-dark">{product.name}</h3>
        <Button 
          onClick={handleGenerateQR}
          className="btn-primary"
        >
          <QrCode className="w-4 h-4 mr-2" />
          Generar etiqueta QR
        </Button>
      </div>

      {showPreview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <div className="bg-white border-2 border-gray-200 p-6 rounded-lg max-w-sm mx-auto">
            <div className="text-center">
              <h4 className="font-bold text-lg text-xops-dark mb-2">{product.name}</h4>
              <p className="text-sm text-gray-600 mb-4">Código: {product.id}</p>
              
              {/* QR Code Placeholder */}
              <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 mx-auto mb-4 flex items-center justify-center rounded-lg">
                <QrCode className="w-16 h-16 text-gray-400" />
              </div>
              
              <p className="text-xs text-gray-500 break-all">{qrUrl}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-4 justify-center">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
          </div>
        </motion.div>
      )}
    </Card>
  );
};

export default QRLabelGenerator;
