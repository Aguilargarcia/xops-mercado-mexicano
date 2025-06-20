
import AdminLayout from '@/components/layout/AdminLayout';

const QRScan = () => {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-xops-dark mb-6">Escaneo QR</h1>
        <p className="text-gray-600">Escanea códigos QR de productos aquí.</p>
      </div>
    </AdminLayout>
  );
};

export default QRScan;
