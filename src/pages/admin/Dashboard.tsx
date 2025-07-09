
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

      <div className="p-8 space-y-8">
        <StatsSection productsCount={products.length} />
        
        <QuickActionsSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentOrdersSection />
          <QRLabelsSection products={products} onGenerateQR={generateQRCode} />
        </div>

        {/* Smart Invoice Section */}
        <SmartInvoice />
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
