
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  QrCode, 
  Scan, 
  Package, 
  CheckCircle, 
  XCircle, 
  Camera,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const AdminQRScan = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [lastScannedProduct, setLastScannedProduct] = useState<any>(null);

  const simulateScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      const mockProduct = {
        id: 'QR-001',
        name: 'Bolsa Artesanal Oaxaca',
        sku: 'BAO-001',
        price: 899,
        stock: 5,
        category: 'Artesanías'
      };
      
      setScanResult(mockProduct.id);
      setLastScannedProduct(mockProduct);
      setIsScanning(false);
    }, 2000);
  };

  const processManualCode = () => {
    if (manualCode.trim()) {
      const mockProduct = {
        id: manualCode,
        name: 'Producto Manual',
        sku: manualCode,
        price: 599,
        stock: 3,
        category: 'General'
      };
      
      setScanResult(manualCode);
      setLastScannedProduct(mockProduct);
      setManualCode('');
    }
  };

  const confirmSale = () => {
    if (lastScannedProduct) {
      // Here you would typically update the database
      console.log('Venta confirmada:', lastScannedProduct);
      setScanResult(null);
      setLastScannedProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-xops-cream">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/admin/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-xops-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">X</span>
                </div>
                <span className="text-xl font-bold text-xops-dark">Admin Panel</span>
              </Link>
            </div>

            <nav className="flex space-x-6">
              <Link to="/admin/dashboard" className="text-gray-600 hover:text-xops-blue">
                Dashboard
              </Link>
              <Link to="/admin/inventory" className="text-gray-600 hover:text-xops-blue">
                Inventario
              </Link>
              <Link to="/admin/orders" className="text-gray-600 hover:text-xops-blue">
                Pedidos
              </Link>
              <Link to="/admin/qr-scan" className="text-xops-blue font-medium">
                Escaneo QR
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-xops-dark mb-2">Escaneo de Códigos QR</h1>
          <p className="text-gray-600">
            Escanea códigos QR de productos para registrar ventas automáticamente
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scanner Section */}
          <div className="space-y-6">
            {/* Camera Scanner */}
            <Card className="p-6 border-0 shadow-md bg-white">
              <h2 className="text-xl font-semibold text-xops-dark mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Escanear con Cámara
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                {isScanning ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-xops-blue/10 rounded-full mx-auto flex items-center justify-center animate-pulse">
                      <Scan className="w-8 h-8 text-xops-blue" />
                    </div>
                    <p className="text-gray-600">Escaneando código QR...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600">
                      Posiciona el código QR del producto frente a la cámara
                    </p>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={simulateScan}
                disabled={isScanning}
                className="w-full btn-primary"
              >
                {isScanning ? 'Escaneando...' : 'Iniciar Escaneo'}
              </Button>
            </Card>

            {/* Manual Entry */}
            <Card className="p-6 border-0 shadow-md bg-white">
              <h2 className="text-xl font-semibold text-xops-dark mb-4">
                Entrada Manual
              </h2>
              
              <div className="space-y-4">
                <Input
                  placeholder="Ingresa el código del producto"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && processManualCode()}
                />
                <Button 
                  onClick={processManualCode}
                  disabled={!manualCode.trim()}
                  variant="outline" 
                  className="w-full"
                >
                  Procesar Código
                </Button>
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Scan Result */}
            {scanResult && lastScannedProduct ? (
              <Card className="p-6 border-0 shadow-md bg-white">
                <h2 className="text-xl font-semibold text-xops-dark mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Producto Encontrado
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-xops-dark">
                          {lastScannedProduct.name}
                        </h3>
                        <p className="text-sm text-gray-600">SKU: {lastScannedProduct.sku}</p>
                        <p className="text-sm text-gray-600">Categoría: {lastScannedProduct.category}</p>
                      </div>
                      <Package className="w-8 h-8 text-xops-blue" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <p className="text-2xl font-bold text-xops-dark">
                          ${lastScannedProduct.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Stock disponible: {lastScannedProduct.stock}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button onClick={confirmSale} className="flex-1 btn-primary">
                      Confirmar Venta
                    </Button>
                    <Button 
                      onClick={() => {
                        setScanResult(null);
                        setLastScannedProduct(null);
                      }}
                      variant="outline"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6 border-0 shadow-md bg-white">
                <h2 className="text-xl font-semibold text-xops-dark mb-4">
                  Esperando Escaneo
                </h2>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">
                    Los detalles del producto aparecerán aquí después del escaneo
                  </p>
                </div>
              </Card>
            )}

            {/* Instructions */}
            <Card className="p-6 border-0 shadow-md bg-white">
              <h2 className="text-xl font-semibold text-xops-dark mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-500" />
                Instrucciones
              </h2>
              
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-xops-blue rounded-full mt-2 flex-shrink-0"></span>
                  Asegúrate de que el código QR esté bien iluminado
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-xops-blue rounded-full mt-2 flex-shrink-0"></span>
                  Mantén el código QR estable frente a la cámara
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-xops-blue rounded-full mt-2 flex-shrink-0"></span>
                  Si el escaneo falla, usa la entrada manual
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-xops-blue rounded-full mt-2 flex-shrink-0"></span>
                  Confirma siempre la venta después del escaneo
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQRScan;
