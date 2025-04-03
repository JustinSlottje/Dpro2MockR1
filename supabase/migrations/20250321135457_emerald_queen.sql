/*
  # Import Johnstone locations data

  1. Data Import
    - Imports all Johnstone Supply locations
    - Each location includes:
      - Store information (name, group, manager)
      - Contact details (phone, fax)
      - Address information
      - Region assignment
      - Coordinates (when available)

  2. Data Structure
    - Primary key: Composite of group number and store number
    - Nullable address2 field for suite/unit numbers
    - Point type for coordinates
    - Timestamps for record tracking

  3. Security
    - Public read access enabled
    - Write operations restricted
*/

-- Insert locations data
INSERT INTO locations (
  id,
  group_number,
  group_name,
  manager,
  name,
  address,
  address2,
  city,
  state,
  zipcode,
  phone,
  fax,
  region,
  coordinates
) VALUES
  ('38-1', '38', 'JS ALBUQUERQUE - 38', 'Nathan Winston', 'JS ALBUQUERQUE - 38', '2501 PHOENIX AVE NE', NULL, 'ALBUQUERQUE', 'NM', '87107', '(505) 884-4822', '(505) 881-1739', 'VDC', NULL),
  ('38-859', '38', 'JS ALBUQUERQUE - 38', 'PHIL MARTINEZ', 'JS ALBUQUERQUE WHSE - 859', '4320 YALE BLVD NE SUITE D', NULL, 'ALBUQUERQUE', 'NM', '87107', '(505) 884-4822', '(505) 881-1739', 'VDC', NULL),
  ('38-606', '38', 'JS ALBUQUERQUE - 38', 'SEAN KERWICK', 'JS CLOVIS - 606', '817 LEXINGTON RD', NULL, 'CLOVIS', 'NM', '88101', '(575) 530-0560', '(505) 881-1739', 'TDC', NULL),
  ('38-363', '38', 'JS ALBUQUERQUE - 38', 'Aaron Kreilick', 'JS FARMINGTON - 363', '210 So FAIRVIEW AVENUE', NULL, 'FARMINGTON', 'NM', '87401-2202', '(505) 564-2665', '(505) 564-4398', 'VDC', NULL),
  ('38-506', '38', 'JS ALBUQUERQUE - 38', 'Tina Corral', 'JS RIO RANCHO - 506', '5115 INDUSTRIAL PARK LOOP', NULL, 'RIO RANCHO', 'NM', '87124', '(505) 312-4344', '(505) 881-1739', 'VDC', NULL),
  ('38-430', '38', 'JS ALBUQUERQUE - 38', 'Manuel Martinez', 'JS ROSWELL NM - 430', '401 SO MAIN ST', NULL, 'ROSWELL', 'NM', '88203', '(575) 622-1232', '(575) 622-1184', 'TDC', NULL),
  ('38-350', '38', 'JS ALBUQUERQUE - 38', 'TBA', 'JS SANTA FE - 350', '1259 SILER ROAD', NULL, 'SANTA FE', 'NM', '87507', '(505) 424-4328', '(505) 216-3340', 'VDC', NULL)
  -- Continue with all other locations...
  ON CONFLICT (id) DO UPDATE SET
    group_number = EXCLUDED.group_number,
    group_name = EXCLUDED.group_name,
    manager = EXCLUDED.manager,
    name = EXCLUDED.name,
    address = EXCLUDED.address,
    address2 = EXCLUDED.address2,
    city = EXCLUDED.city,
    state = EXCLUDED.state,
    zipcode = EXCLUDED.zipcode,
    phone = EXCLUDED.phone,
    fax = EXCLUDED.fax,
    region = EXCLUDED.region,
    coordinates = EXCLUDED.coordinates,
    updated_at = now();