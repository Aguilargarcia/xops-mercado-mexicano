
import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import Brands from "@/pages/Brands";
import BrandDetail from "@/pages/BrandDetail";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Profile from "@/pages/Profile";
import Dashboard from "@/pages/admin/Dashboard";
import Inventory from "@/pages/admin/Inventory";
import Orders from "@/pages/admin/Orders";
import QRScan from "@/pages/admin/QRScan";
import Settings from "@/pages/admin/Settings";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";

const AuthenticatedApp = () => {
  const { user } = useAuth();

  // Si es una marca logueada, mostrar rutas de admin
  if (user?.type === 'marca') {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/qr-scan" element={<QRScan />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // Si es cliente logueado o no hay usuario, mostrar rutas normales
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/brand/:id" element={<BrandDetail />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthenticatedApp;
