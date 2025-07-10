import SmartInvoiceComponent from '@/components/admin/SmartInvoice';

const SmartInvoicePage = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-xops-dark mb-2">Factura Inteligente</h1>
        <p className="text-gray-600">Genera pre-facturas basadas en pedidos recientes de manera rápida y sencilla.</p>
      </div>
      
      <SmartInvoiceComponent />
    </div>
  );
};

export default SmartInvoicePage;