-- Add 'brand' role to the app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'brand';

-- Create a function to allow brands to update their own profile information
CREATE OR REPLACE FUNCTION public.update_brand_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Allow brands to update their own name and brand_name
  IF (auth.uid() = NEW.id AND has_role(auth.uid(), 'brand'::app_role)) THEN
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$;

-- Update profiles table RLS policies to allow brands to update their info
DROP POLICY IF EXISTS "Brands can update their own profile" ON public.profiles;
CREATE POLICY "Brands can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id AND has_role(auth.uid(), 'brand'::app_role))
WITH CHECK (auth.uid() = id AND has_role(auth.uid(), 'brand'::app_role));