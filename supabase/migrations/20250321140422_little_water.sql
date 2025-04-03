/*
  # Import Johnstone Supply Locations

  1. Data Structure
    - Imports specific set of Johnstone Supply locations
    - Preserves store hierarchy and regional assignments
    - Maintains manager and contact information
    - Handles address formatting consistently

  2. Data Integrity
    - Uses ON CONFLICT for upsert operations
    - Preserves existing IDs and relationships
    - Maintains timestamps appropriately
    - Handles NULL values correctly

  3. Security
    - Maintains existing RLS policies
    - Preserves public read access
*/

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
  created_at,
  updated_at
) VALUES
  ('38-1', '38', 'JS ALBUQUERQUE - 38', 'Nathan Winston', 'JS ALBUQUERQUE - 38', '2501 PHOENIX AVE NE', NULL, 'ALBUQUERQUE', 'NM', '87107', '(505) 884-4822', '(505) 881-1739', 'VDC', now(), now()),
  ('38-859', '38', 'JS ALBUQUERQUE - 38', 'PHIL MARTINEZ', 'JS ALBUQUERQUE WHSE - 859', '4320 YALE BLVD NE', 'SUITE D', 'ALBUQUERQUE', 'NM', '87107', '(505) 884-4822', '(505) 881-1739', 'VDC', now(), now()),
  ('38-606', '38', 'JS ALBUQUERQUE - 38', 'SEAN KERWICK', 'JS CLOVIS - 606', '817 LEXINGTON RD', NULL, 'CLOVIS', 'NM', '88101', '(575) 530-0560', '(505) 881-1739', 'TDC', now(), now()),
  ('38-363', '38', 'JS ALBUQUERQUE - 38', 'Aaron Kreilick', 'JS FARMINGTON - 363', '210 So FAIRVIEW AVENUE', NULL, 'FARMINGTON', 'NM', '87401-2202', '(505) 564-2665', '(505) 564-4398', 'VDC', now(), now()),
  ('38-506', '38', 'JS ALBUQUERQUE - 38', 'Tina Corral', 'JS RIO RANCHO - 506', '5115 INDUSTRIAL PARK LOOP', NULL, 'RIO RANCHO', 'NM', '87124', '(505) 312-4344', '(505) 881-1739', 'VDC', now(), now()),
  ('38-430', '38', 'JS ALBUQUERQUE - 38', 'Manuel Martinez', 'JS ROSWELL NM - 430', '401 SO MAIN ST', NULL, 'ROSWELL', 'NM', '88203', '(575) 622-1232', '(575) 622-1184', 'TDC', now(), now()),
  ('38-350', '38', 'JS ALBUQUERQUE - 38', 'TBA', 'JS SANTA FE - 350', '1259 SILER ROAD', NULL, 'SANTA FE', 'NM', '87507', '(505) 424-4328', '(505) 216-3340', 'VDC', now(), now()),
  ('55-55', '55', 'JS AUSTIN - 55', 'Ben Thomas', 'JS AUSTIN - 55', '10620 METRIC BLVD', NULL, 'AUSTIN', 'TX', '78758', '(512) 834-0346', '(512) 834-8103', 'TDC', now(), now()),
  ('55-458', '55', 'JS AUSTIN - 55', 'TBD', 'JS LAKEWAY - 458', '2009 RANCH ROAD 620 NORTH', 'BUILDING 5', 'LAKEWAY', 'TX', '78734', '(512) 296-2424', '(512) 358-4837', 'TDC', now(), now()),
  ('55-651', '55', 'JS AUSTIN - 55', 'PAT REPA', 'JS PFLUGERVILLE - 651', '19101 NORTH HEATHERWILDE BLVD', 'BLDG 4, SUITE 155', 'PFLUGERVILLE', 'TX', '78660', '(512) 829-8070', '(512) 829-8086', 'TDC', now(), now()),
  ('55-225', '55', 'JS AUSTIN - 55', 'Brian Burnes', 'JS S. AUSTIN - 225', '4114 TODD LANE', NULL, 'AUSTIN', 'TX', '78744', '(512) 440-7229', '(512) 440-7254', 'TDC', now(), now()),
  ('20-20', '20', 'JS BILLINGS - 20', 'Paul Keneally', 'JS BILLINGS - 20', '5253 SOUTHGATE DRIVE', NULL, 'BILLINGS', 'MT', '59101', '(406) 252-1207', '(406) 248-4862', 'PDC', now(), now()),
  ('20-167', '20', 'JS BILLINGS - 20', 'DOUG BOND', 'JS MISSOULA - 167', '734 HOLMES', NULL, 'MISSOULA', 'MT', '59802', '(406) 542-1418', '(406) 542-1569', 'PDC', now(), now()),
  ('103-568', '103', 'JS BLOOMINGTON - 103', 'Ryan Scimeca', 'JS BENSENVILLE - 568', '595-601 SUPREME DRIVE', NULL, 'BENSENVILLE', 'IL', '60106', '(847) 956-0810', '(847) 956-1095', 'IDC', now(), now()),
  ('103-103', '103', 'JS BLOOMINGTON - 103', 'Zach Friederich', 'JS BLOOMINGTON - 103', '1401 W 94th STREET', NULL, 'BLOOMINGTON', 'MN', '55431', '(952) 853-9898', '(952) 853-2277', 'IDC', now(), now()),
  ('103-569', '103', 'JS BLOOMINGTON - 103', 'Stephanie Beyerl', 'JS CARY - 569', '1000 ALEXANDER COURT', NULL, 'CARY', 'IL', '60013', '(847) 383-6997', '(847) 966-2794', 'IDC', now(), now()),
  ('103-570', '103', 'JS BLOOMINGTON - 103', 'Ron Horton', 'JS CHICAGO CENTRAL - 570', '1200 W CERMAK STREET', 'SUITE D', 'CHICAGO', 'IL', '60608', '(847) 966-2700', '(847) 966-2794', 'IDC', now(), now()),
  ('103-565', '103', 'JS BLOOMINGTON - 103', 'Tony Flores', 'JS CHICAGO NORTH - 565', '4150 N KNOX AVE', NULL, 'CHICAGO', 'IL', '60641', '(773) 486-2525', '(952) 853-2277', 'IDC', now(), now()),
  ('103-567', '103', 'JS BLOOMINGTON - 103', 'Tiommi Clay', 'JS DOWNERS GROVE - 567', '5375 WALNUT AVE', NULL, 'DOWNERS GROVE', 'IL', '60515', '(630) 427-6200', '(630) 324-1937', 'IDC', now(), now())
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
  updated_at = now();

-- Update indexes to ensure they include the new data
REINDEX INDEX idx_locations_search;
REINDEX INDEX idx_locations_group_name;
REINDEX INDEX idx_locations_manager;
REINDEX INDEX idx_locations_city_state;