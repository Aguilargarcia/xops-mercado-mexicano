
import { useState } from 'react';
import { Product } from '@/types/admin';

export const useAdminStore = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const generateQR = (productId: string) => {
    const qrUrl = `https://xops.app/venta/${productId}`;
    setProducts(prev => 
      prev.map(p => 
        p.id === productId ? { ...p, qrCode: qrUrl } : p
      )
    );
    return qrUrl;
  };

  return {
    products,
    addProduct,
    generateQR
  };
};
