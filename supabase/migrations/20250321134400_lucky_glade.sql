/*
  # Create locations table for Johnstone locations

  1. New Tables
    - `locations`
      - `id` (text, primary key) - Store format: groupNumber-storeNumber
      - `group_number` (text)
      - `group_name` (text)
      - `manager` (text)
      - `name` (text)
      - `address` (text)
      - `address2` (text, nullable)
      - `city` (text)
      - `state` (text)
      - `zipcode` (text)
      - `phone` (text)
      - `fax` (text)
      - `region` (text)
      - `coordinates` (point, nullable)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)

  2. Security
    - Enable RLS on locations table
    - Add policy for authenticated users to read locations
*/

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id text PRIMARY KEY,
  group_number text NOT NULL,
  group_name text NOT NULL,
  manager text NOT NULL,
  name text NOT NULL,
  address text NOT NULL,
  address2 text,
  city text NOT NULL,
  state text NOT NULL,
  zipcode text NOT NULL,
  phone text NOT NULL,
  fax text NOT NULL,
  region text NOT NULL,
  coordinates point,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to locations"
  ON locations
  FOR SELECT
  TO public
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_locations_updated_at
  BEFORE UPDATE ON locations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for common search fields
CREATE INDEX IF NOT EXISTS idx_locations_search 
ON locations USING GIN (
  to_tsvector('english',
    coalesce(name, '') || ' ' ||
    coalesce(city, '') || ' ' ||
    coalesce(state, '') || ' ' ||
    coalesce(region, '')
  )
);

-- Create index for group filtering
CREATE INDEX IF NOT EXISTS idx_locations_group_number 
ON locations(group_number);

-- Create index for region filtering
CREATE INDEX IF NOT EXISTS idx_locations_region 
ON locations(region);