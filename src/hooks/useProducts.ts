
import { useState } from 'react';
import { Product } from '@/types';

// Hook para manejar productos
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const generateQRCode = (productId: string) => {
    const qrUrl = `https://xops.app/venta/${productId}`;
    setProducts(prev => 
      prev.map(product => 
        product.id === productId ? { ...product, qrCode: qrUrl } : product
      )
    );
    return qrUrl;
  };

  return {
    products,
    addProduct,
    generateQRCode
  };
};
