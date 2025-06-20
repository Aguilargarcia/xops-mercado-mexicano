
import AdminLayout from '@/components/admin/AdminLayout';

const AdminOrders = () => {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-xops-dark mb-6">Pedidos</h1>
        <p className="text-gray-600">Gestiona los pedidos de tus clientes aquí.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
