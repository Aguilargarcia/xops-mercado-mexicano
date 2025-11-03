-- Update products table to reference profiles instead of auth.users
-- This follows Supabase best practices and avoids tight coupling to managed schemas

-- First, drop the existing foreign key constraint
ALTER TABLE public.products 
DROP CONSTRAINT IF EXISTS products_brand_id_fkey;

-- Add new foreign key constraint referencing profiles table
ALTER TABLE public.products 
ADD CONSTRAINT products_brand_id_fkey 
FOREIGN KEY (brand_id) 
REFERENCES public.profiles(id) 
ON DELETE CASCADE;