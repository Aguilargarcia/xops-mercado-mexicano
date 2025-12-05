import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Brands from "./pages/Brands";
import BrandDetail from "./pages/BrandDetail";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Accessories from "./pages/Accessories";
import XopperAIPage from "./pages/XopperAI";
import Explore from "./pages/Explore";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Inventory from "./pages/admin/Inventory";
import Orders from "./pages/admin/Orders";
import CRM from "./pages/admin/CRM";
import SmartInvoicePage from "./pages/admin/SmartInvoice";
import QRScan from "./pages/admin/QRScan";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brand/:id" element={<BrandDetail />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/xopper-ai" element={<XopperAIPage />} />
            <Route path="/explore" element={<Explore />} />
            
            {/* Category routes */}
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/accessories" element={<Accessories />} />
            
            {/* Admin login - separate from admin layout */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Admin routes - single AdminLayout wrapper */}
            <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/inventory" element={<AdminLayout><Inventory /></AdminLayout>} />
            <Route path="/orders" element={<AdminLayout><Orders /></AdminLayout>} />
            <Route path="/crm" element={<AdminLayout><CRM /></AdminLayout>} />
            <Route path="/smart-invoice" element={<AdminLayout><SmartInvoicePage /></AdminLayout>} />
            <Route path="/qr-scan" element={<AdminLayout><QRScan /></AdminLayout>} />
            <Route path="/settings" element={<AdminLayout><Settings /></AdminLayout>} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
