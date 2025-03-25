/*
  # Admin Role and Policies Setup

  1. Changes
    - Add admin role management
    - Create admin-specific policies
    - Set up secure admin access controls
  
  2. Security
    - Enable admin access to manage all resources
    - Maintain RLS security
*/

-- Create a secure function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (
    SELECT COALESCE(
      (NULLIF(current_setting('request.jwt.claims', true)::json->>'is_admin', '')::boolean),
      false
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add admin policies for properties
DO $$ BEGIN
  DROP POLICY IF EXISTS "Admins can manage all properties" ON properties;
  
  CREATE POLICY "Admins can manage all properties"
    ON properties
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
END $$;

-- Add admin policies for bookings
DO $$ BEGIN
  DROP POLICY IF EXISTS "Admins can manage all bookings" ON bookings;
  
  CREATE POLICY "Admins can manage all bookings"
    ON bookings
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
END $$;

-- Create a secure view for admin user management
CREATE OR REPLACE VIEW public.admin_user_management AS
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'is_admin', 'false')::boolean as is_admin,
  created_at,
  last_sign_in_at
FROM auth.users
WHERE public.is_admin() = true;

-- Grant necessary permissions
GRANT SELECT ON public.admin_user_management TO authenticated;