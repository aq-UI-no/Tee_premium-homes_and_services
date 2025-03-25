/*
  # Add Bookings System

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `user_id` (uuid, references auth.users)
      - `check_in` (date)
      - `check_out` (date)
      - `total_price` (numeric)
      - `status` (text) - 'pending', 'confirmed', 'cancelled'
      - `created_at` (timestamp)
      - `guests` (integer)
      - `special_requests` (text)

  2. Security
    - Enable RLS on bookings table
    - Add policies for:
      - Users can view their own bookings
      - Property owners can view bookings for their properties
      - Users can create bookings
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  total_price numeric NOT NULL CHECK (total_price > 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  guests integer NOT NULL CHECK (guests > 0),
  special_requests text,
  CONSTRAINT valid_dates CHECK (check_out > check_in)
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookings
CREATE POLICY "Users can view own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Property owners can view bookings for their properties
CREATE POLICY "Property owners can view property bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = bookings.property_id
      AND properties.owner_id = auth.uid()
    )
  );

-- Users can create bookings
CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create index for common queries
CREATE INDEX bookings_property_id_idx ON bookings(property_id);
CREATE INDEX bookings_user_id_idx ON bookings(user_id);
CREATE INDEX bookings_dates_idx ON bookings(check_in, check_out);