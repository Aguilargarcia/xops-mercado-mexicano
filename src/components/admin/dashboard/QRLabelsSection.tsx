
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';
import { Card } from '@/components/ui/card';
import QRLabel from '@/components/cards/QRLabel';
import { Product } from '@/types';

interface QRLabelsSectionProps {
  products: Product[];
  onGenerateQR: (productId: string) => string;
}

const QRLabelsSection = ({ products, onGenerateQR }: QRLabelsSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7 }}
      className="space-y-6"
    >
      {products.length > 0 ? (
        products.slice(0, 2).map((product) => (
          <QRLabel
            key={product.id}
            product={product}
            onGenerateQR={onGenerateQR}
          />
        ))
      ) : (
        <Card className="p-8 border-0 shadow-lg bg-white">
          <h2 className="text-2xl font-archivo-black text-xops-dark mb-6">Etiquetas QR</h2>
          <div className="bg-gradient-to-br from-xops-blue/5 to-xops-blue/10 rounded-xl p-12 text-center">
            <QrCode className="w-16 h-16 text-xops-blue/60 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Agrega productos para generar etiquetas QR</p>
            <p className="text-sm text-gray-500 mt-1">Las etiquetas facilitarán las ventas</p>
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default QRLabelsSection;
