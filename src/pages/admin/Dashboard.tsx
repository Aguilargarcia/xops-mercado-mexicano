
import { useState } from 'react';
import ProductForm from '@/components/forms/ProductForm';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import StatsSection from '@/components/admin/dashboard/StatsSection';
import QuickActionsSection from '@/components/admin/dashboard/QuickActionsSection';
import RecentOrdersSection from '@/components/admin/dashboard/RecentOrdersSection';
import QRLabelsSection from '@/components/admin/dashboard/QRLabelsSection';
import SmartInvoice from '@/components/admin/SmartInvoice';
import { useProducts } from '@/hooks/useProducts';

const Dashboard = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const { products, addProduct, generateQRCode } = useProducts();

  return (
    <>
      <DashboardHeader onNewProduct={() => setShowProductForm(true)} />

      <div className="p-8 space-y-12">
        <div className="min-h-[200px]">
          <StatsSection productsCount={products.length} />
        </div>
        
        <div className="min-h-[180px]">
          <QuickActionsSection />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[300px]">
          <RecentOrdersSection />
          <QRLabelsSection products={products} onGenerateQR={generateQRCode} />
        </div>

        {/* Smart Invoice Section */}
        <div className="min-h-[250px]">
          <SmartInvoice />
        </div>
      </div>

      {showProductForm && (
        <ProductForm
          onSubmit={addProduct}
          onClose={() => setShowProductForm(false)}
        />
      )}
    </>
  );
};

export default Dashboard;
