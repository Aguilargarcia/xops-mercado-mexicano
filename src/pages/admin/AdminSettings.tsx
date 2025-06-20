
import AdminLayout from '@/components/admin/AdminLayout';

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-xops-dark mb-6">Opciones</h1>
        <p className="text-gray-600">Configura las opciones de tu cuenta aquí.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
