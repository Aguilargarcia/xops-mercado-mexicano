
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import Brands from "@/pages/Brands";
import BrandDetail from "@/pages/BrandDetail";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Profile from "@/pages/Profile";
import AdminLayout from "../admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Inventory from "@/pages/admin/Inventory";
import Orders from "@/pages/admin/Orders";
import QRScan from "@/pages/admin/QRScan";
import Settings from "@/pages/admin/Settings";
import Checkout from "@/pages/Checkout";

const AuthenticatedApp = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.type === 'marca';

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAdmin ? <Navigate to="/dashboard" /> : <Index />} 
      />
      <Route 
        path="/brands" 
        element={isAdmin ? <Navigate to="/dashboard" /> : <Brands />} 
      />
      <Route 
        path="/brand/:id" 
        element={isAdmin ? <Navigate to="/dashboard" /> : <BrandDetail />} 
      />
      <Route 
        path="/product/:id" 
        element={isAdmin ? <Navigate to="/dashboard" /> : <ProductDetail />} 
      />
      <Route 
        path="/cart" 
        element={isAdmin ? <Navigate to="/dashboard" /> : <Cart />} 
      />
      <Route 
        path="/checkout" 
        element={isAdmin ? <Navigate to="/dashboard" /> : <Checkout />} 
      />
      <Route 
        path="/profile" 
        element={isAdmin ? <Navigate to="/dashboard" /> : <Profile />} 
      />
      
      {/* Admin routes */}
      <Route 
        path="/dashboard" 
        element={!isAdmin ? <Navigate to="/" /> : <AdminLayout><Dashboard /></AdminLayout>} 
      />
      <Route 
        path="/inventory" 
        element={!isAdmin ? <Navigate to="/" /> : <AdminLayout><Inventory /></AdminLayout>} 
      />
      <Route 
        path="/orders" 
        element={!isAdmin ? <Navigate to="/" /> : <AdminLayout><Orders /></AdminLayout>} 
      />
      <Route 
        path="/qr-scan" 
        element={!isAdmin ? <Navigate to="/" /> : <AdminLayout><QRScan /></AdminLayout>} 
      />
      <Route 
        path="/settings" 
        element={!isAdmin ? <Navigate to="/" /> : <AdminLayout><Settings /></AdminLayout>} 
      />
    </Routes>
  );
};

export default AuthenticatedApp;
