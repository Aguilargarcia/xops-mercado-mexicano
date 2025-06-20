
import { useState } from 'react';
import { Brand, Product } from '@/types/admin';

// Mock data - en una app real vendría de la API
const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'Xops',
    logo: '/placeholder.svg',
    primaryColor: '#7bafd4',
    secondaryColor: '#f9f2eb',
    products: []
  },
  {
    id: '2',
    name: 'Artesanías Maya',
    logo: '/placeholder.svg',
    primaryColor: '#8B4513',
    secondaryColor: '#F4A460',
    products: []
  }
];

export const useAdminStore = () => {
  const [currentBrand, setCurrentBrand] = useState<Brand>(mockBrands[0]);
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
    currentBrand,
    setCurrentBrand,
    products,
    addProduct,
    generateQR,
    availableBrands: mockBrands
  };
};
