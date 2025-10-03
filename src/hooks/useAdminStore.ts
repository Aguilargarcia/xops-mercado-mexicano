import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  qr_code?: string;
  brand_id: string;
  created_at: string;
  updated_at: string;
}

export const useAdminStore = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async (productData: {
    name: string;
    description?: string;
    price: number;
    images: string[];
    category: string;
    stock: number;
  }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .insert({
          ...productData,
          brand_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      setProducts(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (productId: string, updates: Partial<Product>) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', productId)
        .select()
        .single();

      if (error) throw error;

      setProducts(prev => prev.map(p => p.id === productId ? data : p));
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const generateQR = async (productId: string) => {
    const qrUrl = `https://xops.app/venta/${productId}`;
    await updateProduct(productId, { qr_code: qrUrl });
    return qrUrl;
  };

  return {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    generateQR,
    refreshProducts: fetchProducts
  };
};
