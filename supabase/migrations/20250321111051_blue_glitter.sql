/*
  # Initial Schema Setup

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price_per_night` (numeric)
      - `location` (text)
      - `bedrooms` (integer)
      - `bathrooms` (integer)
      - `owner_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `images` (text array)
      - `amenities` (text array)
      - `status` (text) - 'available', 'booked', 'maintenance'
    
  2. Security
    - Enable RLS on properties table
    - Add policies for:
      - Anyone can view available properties
      - Owners can manage their properties
      - Admins can manage all properties
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price_per_night numeric NOT NULL CHECK (price_per_night > 0),
  location text NOT NULL,
  bedrooms integer NOT NULL CHECK (bedrooms > 0),
  bathrooms integer NOT NULL CHECK (bathrooms > 0),
  owner_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  images text[] DEFAULT '{}',
  amenities text[] DEFAULT '{}',
  status text DEFAULT 'available' CHECK (status IN ('available', 'booked', 'maintenance'))
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view available properties
CREATE POLICY "Anyone can view available properties"
  ON properties
  FOR SELECT
  USING (status = 'available');

-- Allow property owners to manage their properties
CREATE POLICY "Owners can manage their own properties"
  ON properties
  USING (auth.uid() = owner_id);

-- Allow admins to manage all properties (you'll need to set up admin roles)