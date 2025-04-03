/*
  # Create companies table

  1. New Tables
    - `companies`
      - `id` (text, primary key)
      - `name` (text)
      - `type` (text, either 'distributor' or 'manufacturer')
      - `verticals` (text array)
      - `logo` (text, URL)
      - `description` (text)
      - `website` (text)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `companies` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS companies (
  id text PRIMARY KEY,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('distributor', 'manufacturer')),
  verticals text[] NOT NULL,
  logo text,
  description text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Add policy for public read access
CREATE POLICY "Allow public read access to companies"
  ON companies
  FOR SELECT
  TO public
  USING (true);

-- Insert sample companies
INSERT INTO companies (id, name, type, verticals, logo, description, website) VALUES
  (
    'johnstone',
    'Johnstone Supply',
    'distributor',
    ARRAY['HVAC', 'Plumbing'],
    'https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&q=80&w=80&h=80',
    'Leading HVAC/R distributor with nationwide coverage',
    'https://www.johnstonesupply.com'
  ),
  (
    'ferguson',
    'Ferguson',
    'distributor',
    ARRAY['Plumbing', 'HVAC', 'Building Products'],
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=80&h=80',
    'America''s largest distributor of plumbing supplies',
    'https://www.ferguson.com'
  ),
  (
    'carrier',
    'Carrier Corporation',
    'manufacturer',
    ARRAY['HVAC'],
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=80&h=80',
    'Global leader in HVAC manufacturing',
    'https://www.carrier.com'
  ),
  (
    'trex',
    'Trex Company',
    'manufacturer',
    ARRAY['Decking', 'Building Products'],
    'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&q=80&w=80&h=80',
    'Leading manufacturer of composite decking',
    'https://www.trex.com'
  ),
  (
    'graybar',
    'Graybar',
    'distributor',
    ARRAY['Electrical', 'Safety Equipment'],
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=80&h=80',
    'Fortune 500 distributor of electrical products',
    'https://www.graybar.com'
  ),
  (
    'milwaukee',
    'Milwaukee Tool',
    'manufacturer',
    ARRAY['Tools', 'Safety Equipment'],
    'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=80&h=80',
    'Premium power tool manufacturer',
    'https://www.milwaukeetool.com'
  );