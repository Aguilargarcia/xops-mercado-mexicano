
import AdminLayout from '@/components/admin/AdminLayout';

const AdminInventory = () => {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-xops-dark mb-6">Inventario</h1>
        <p className="text-gray-600">Gestiona tu inventario de productos aquí.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminInventory;
