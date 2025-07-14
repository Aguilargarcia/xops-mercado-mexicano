import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { BrandFollowProvider } from './contexts/BrandFollowContext'
import { Toaster } from '@/components/ui/toaster'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrandFollowProvider>
          <App />
          <Toaster />
        </BrandFollowProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
