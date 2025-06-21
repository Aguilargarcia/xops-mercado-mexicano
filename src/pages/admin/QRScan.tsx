
import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Scan, Search, Package, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AdminLayout from '@/components/admin/AdminLayout';

const QRScan = () => {
  const [scannedCode, setScannedCode] = useState('');
  const [scanHistory, setScanHistory] = useState([
    {
      id: '1',
      code: 'https://xops.app/venta/1',
      product: 'Bolsa Artesanal de Cuero',
      timestamp: new Date().toLocaleString(),
      status: 'Válido'
    },
    {
      id: '2',
      code: 'https://xops.app/venta/2',
      product: 'Collar de Jade Natural',
      timestamp: new Date(Date.now() - 3600000).toLocaleString(),
      status: 'Válido'
    },
    {
      id: '3',
      code: 'INVALID_CODE_123',
      product: 'Desconocido',
      timestamp: new Date(Date.now() - 7200000).toLocaleString(),
      status: 'Inválido'
    }
  ]);

  const handleScanCode = () => {
    // Simulamos un escaneo exitoso
    const newScan = {
      id: Date.now().toString(),
      code: `https://xops.app/venta/${Math.floor(Math.random() * 100)}`,
      product: 'Producto Escaneado',
      timestamp: new Date().toLocaleString(),
      status: 'Válido'
    };
    
    setScanHistory([newScan, ...scanHistory]);
    setScannedCode(newScan.code);
  };

  const handleManualInput = (code: string) => {
    setScannedCode(code);
    if (code.trim()) {
      const newScan = {
        id: Date.now().toString(),
        code: code,
        product: code.includes('xops.app') ? 'Producto Manual' : 'Desconocido',
        timestamp: new Date().toLocaleString(),
        status: code.includes('xops.app') ? 'Válido' : 'Inválido'
      };
      setScanHistory([newScan, ...scanHistory]);
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10"
      >
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-xops-dark">Escaneo QR</h1>
              <p className="text-gray-600 mt-2">Escanea códigos QR de productos para verificación</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar Historial
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="p-8 space-y-8">
        {/* Scanner principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Área de escaneo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8 border-0 shadow-lg">
              <h2 className="text-xl font-semibold text-xops-dark mb-6">Escanear Código QR</h2>
              
              {/* Simulador de cámara */}
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-6 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Cámara QR</p>
                  <p className="text-sm text-gray-500">Apunta al código QR</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleScanCode}
                  className="w-full btn-primary"
                >
                  <Scan className="w-4 h-4 mr-2" />
                  Simular Escaneo
                </Button>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="O ingresa código manualmente..."
                    value={scannedCode}
                    onChange={(e) => setScannedCode(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleManualInput(scannedCode)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-xops-blue focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => handleManualInput(scannedCode)}
                  className="w-full"
                >
                  Verificar Código
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Resultado del escaneo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8 border-0 shadow-lg">
              <h2 className="text-xl font-semibold text-xops-dark mb-6">Resultado del Escaneo</h2>
              
              {scannedCode ? (
                <div className="space-y-6">
                  <div className="p-6 bg-xops-cream rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-3 h-3 rounded-full ${
                        scannedCode.includes('xops.app') ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className={`font-medium ${
                        scannedCode.includes('xops.app') ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {scannedCode.includes('xops.app') ? 'Código Válido' : 'Código Inválido'}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Código QR:</p>
                        <p className="font-mono text-sm bg-white px-3 py-2 rounded border break-all">
                          {scannedCode}
                        </p>
                      </div>
                      
                      {scannedCode.includes('xops.app') && (
                        <>
                          <div>
                            <p className="text-sm text-gray-600">Producto:</p>
                            <p className="font-medium">Producto Escaneado</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600">ID Producto:</p>
                            <p className="font-medium">{scannedCode.split('/').pop()}</p>
                          </div>
                        </>
                      )}
                      
                      <div>
                        <p className="text-sm text-gray-600">Tiempo:</p>
                        <p className="font-medium">{new Date().toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  {scannedCode.includes('xops.app') && (
                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <Package className="w-4 h-4 mr-2" />
                        Ver Producto
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Editar
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Escanea un código QR para ver los detalles</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Historial de escaneos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-xops-dark mb-6">Historial de Escaneos</h2>
              
              <div className="space-y-4">
                {scanHistory.map((scan, index) => (
                  <motion.div
                    key={scan.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        scan.status === 'Válido' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      
                      <div className="space-y-1">
                        <p className="font-medium text-xops-dark">{scan.product}</p>
                        <p className="text-xs text-gray-500 font-mono">{scan.code}</p>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <p className={`text-sm font-medium ${
                        scan.status === 'Válido' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {scan.status}
                      </p>
                      <p className="text-xs text-gray-500">{scan.timestamp}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default QRScan;
