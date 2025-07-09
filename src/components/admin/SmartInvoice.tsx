import { useState } from 'react';
import { FileText, Download, Copy, Calendar, User, Package } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const SmartInvoice = () => {
  const [selectedOrder, setSelectedOrder] = useState<string>('');

  // Mock order data
  const mockOrders = [
    {
      id: '#001',
      customer: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+52 55 1234 5678',
      date: '15 Ene 2024',
      products: [
        { name: 'Bolsa Artesanal de Cuero', quantity: 1, price: 899 },
        { name: 'Collar de Jade Natural', quantity: 1, price: 650 }
      ],
      total: 1549
    },
    {
      id: '#002',
      customer: 'Carlos Ruiz',
      email: 'carlos.ruiz@email.com',
      phone: '+52 55 9876 5432',
      date: '10 Ene 2024',
      products: [
        { name: 'Aretes de Plata 925', quantity: 2, price: 450 }
      ],
      total: 900
    },
    {
      id: '#003',
      customer: 'Ana Pérez',
      email: 'ana.perez@email.com',
      phone: '+52 55 5555 5555',
      date: '5 Ene 2024',
      products: [
        { name: 'Reboso Tradicional', quantity: 1, price: 920 },
        { name: 'Huaraches Michoacán', quantity: 1, price: 780 }
      ],
      total: 1700
    }
  ];

  const selectedOrderData = mockOrders.find(order => order.id === selectedOrder);

  const handleCopyInvoice = () => {
    if (!selectedOrderData) return;

    const invoiceText = `
FACTURA INTELIGENTE - XOPS
================================

Cliente: ${selectedOrderData.customer}
Email: ${selectedOrderData.email}
Teléfono: ${selectedOrderData.phone}
Fecha: ${selectedOrderData.date}
Pedido: ${selectedOrderData.id}

PRODUCTOS:
${selectedOrderData.products.map(product => 
  `- ${product.name} (Cantidad: ${product.quantity}) - $${product.price.toLocaleString()}`
).join('\n')}

TOTAL: $${selectedOrderData.total.toLocaleString()}

Esta es una pre-factura generada automáticamente por Xops.
`;

    navigator.clipboard.writeText(invoiceText);
    toast({
      title: "Factura copiada",
      description: "La pre-factura ha sido copiada al portapapeles.",
    });
  };

  const handleDownloadInvoice = () => {
    if (!selectedOrderData) return;

    const invoiceContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Factura - ${selectedOrderData.id}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .invoice-info { margin-bottom: 20px; }
        .products-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .products-table th, .products-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .products-table th { background-color: #f2f2f2; }
        .total { text-align: right; font-weight: bold; font-size: 18px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>FACTURA INTELIGENTE - XOPS</h1>
    </div>
    
    <div class="invoice-info">
        <p><strong>Cliente:</strong> ${selectedOrderData.customer}</p>
        <p><strong>Email:</strong> ${selectedOrderData.email}</p>
        <p><strong>Teléfono:</strong> ${selectedOrderData.phone}</p>
        <p><strong>Fecha:</strong> ${selectedOrderData.date}</p>
        <p><strong>Pedido:</strong> ${selectedOrderData.id}</p>
    </div>
    
    <table class="products-table">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${selectedOrderData.products.map(product => `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>$${product.price.toLocaleString()}</td>
                    <td>$${(product.price * product.quantity).toLocaleString()}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    
    <div class="total">
        <p>TOTAL: $${selectedOrderData.total.toLocaleString()}</p>
    </div>
    
    <p><em>Esta es una pre-factura generada automáticamente por Xops.</em></p>
</body>
</html>
    `;

    const blob = new Blob([invoiceContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `factura-${selectedOrderData.id}.html`;
    link.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Factura descargada",
      description: "La pre-factura ha sido descargada como archivo HTML.",
    });
  };

  return (
    <Card className="p-6 border-0 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-xops-blue" />
        <h2 className="text-2xl font-bold text-xops-dark">Factura Inteligente</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Genera pre-facturas automáticamente basadas en tus pedidos recientes. 
        Ideal para agilizar el proceso de facturación con el SAT.
      </p>

      {/* Order Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar Pedido
        </label>
        <Select value={selectedOrder} onValueChange={setSelectedOrder}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Elige un pedido para generar la factura" />
          </SelectTrigger>
          <SelectContent>
            {mockOrders.map((order) => (
              <SelectItem key={order.id} value={order.id}>
                {order.id} - {order.customer} - ${order.total.toLocaleString()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Invoice Preview */}
      {selectedOrderData && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-xops-dark">PRE-FACTURA</h3>
            <p className="text-gray-600">Documento borrador para referencia</p>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Información del Cliente
              </h4>
              <div className="space-y-1 text-sm">
                <p><strong>Nombre:</strong> {selectedOrderData.customer}</p>
                <p><strong>Email:</strong> {selectedOrderData.email}</p>
                <p><strong>Teléfono:</strong> {selectedOrderData.phone}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Información del Pedido
              </h4>
              <div className="space-y-1 text-sm">
                <p><strong>Número:</strong> {selectedOrderData.id}</p>
                <p><strong>Fecha:</strong> {selectedOrderData.date}</p>
                <p><strong>Estado:</strong> Completado</p>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Productos
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Producto</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Cantidad</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Precio Unit.</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrderData.products.map((product, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{product.quantity}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">${product.price.toLocaleString()}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                        ${(product.price * product.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="border border-gray-300 px-4 py-2 text-right font-bold">
                      TOTAL:
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-bold text-lg">
                      ${selectedOrderData.total.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleCopyInvoice}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copiar Texto
            </Button>
            <Button
              onClick={handleDownloadInvoice}
              className="bg-xops-blue hover:bg-xops-blue/90 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Descargar HTML
            </Button>
          </div>
        </div>
      )}

      {!selectedOrder && (
        <div className="text-center py-12 text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>Selecciona un pedido para generar la pre-factura</p>
        </div>
      )}
    </Card>
  );
};

export default SmartInvoice;