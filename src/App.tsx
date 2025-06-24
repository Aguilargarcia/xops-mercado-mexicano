import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthenticatedApp from "./components/auth/AuthenticatedApp";
import Index from "./pages/Index";
import Brands from "./pages/Brands";
import BrandDetail from "./pages/BrandDetail";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Inventory from "./pages/admin/Inventory";
import Orders from "./pages/admin/Orders";
import QRScan from "./pages/admin/QRScan";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthenticatedApp />} />
            <Route path="/brands" element={<AuthenticatedApp />} />
            <Route path="/brand/:id" element={<AuthenticatedApp />} />
            <Route path="/product/:id" element={<AuthenticatedApp />} />
            <Route path="/cart" element={<AuthenticatedApp />} />
            <Route path="/checkout" element={<AuthenticatedApp />} />
            <Route path="/profile" element={<AuthenticatedApp />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/dashboard" element={<AuthenticatedApp />} />
            <Route path="/inventory" element={<AuthenticatedApp />} />
            <Route path="/orders" element={<AuthenticatedApp />} />
            <Route path="/qr-scan" element={<AuthenticatedApp />} />
            <Route path="/settings" element={<AuthenticatedApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
