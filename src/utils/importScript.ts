import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fetch from 'cross-fetch';
import type { Database } from '../types/supabase';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// Set up fetch for Node.js environment
global.fetch = fetch;

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
const envPath = join(dirname(dirname(__dirname)), '.env');
const envContent = readFileSync(envPath, 'utf-8');
const env = dotenv.parse(envContent);

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.');
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  },
  global: {
    fetch: fetch
  }
});

type LocationInsert = Database['public']['Tables']['locations']['Insert'];

const locations: LocationInsert[] = [
  {
    id: '38-1',
    group_number: '38',
    group_name: 'JS ALBUQUERQUE - 38',
    manager: 'Nathan Winston',
    name: 'JS ALBUQUERQUE - 38',
    address: '2501 PHOENIX AVE NE',
    city: 'ALBUQUERQUE',
    state: 'NM',
    zipcode: '87107',
    phone: '(505) 884-4822',
    fax: '(505) 881-1739',
    region: 'VDC'
  },
  {
    id: '38-859',
    group_number: '38',
    group_name: 'JS ALBUQUERQUE - 38',
    manager: 'PHIL MARTINEZ',
    name: 'JS ALBUQUERQUE WHSE - 859',
    address: '4320 YALE BLVD NE',
    address2: 'SUITE D',
    city: 'ALBUQUERQUE',
    state: 'NM',
    zipcode: '87107',
    phone: '(505) 884-4822',
    fax: '(505) 881-1739',
    region: 'VDC'
  },
  {
    id: '38-606',
    group_number: '38',
    group_name: 'JS ALBUQUERQUE - 38',
    manager: 'SEAN KERWICK',
    name: 'JS CLOVIS - 606',
    address: '817 LEXINGTON RD',
    city: 'CLOVIS',
    state: 'NM',
    zipcode: '88101',
    phone: '(575) 530-0560',
    fax: '(505) 881-1739',
    region: 'TDC'
  },
  {
    id: '38-363',
    group_number: '38',
    group_name: 'JS ALBUQUERQUE - 38',
    manager: 'Aaron Kreilick',
    name: 'JS FARMINGTON - 363',
    address: '210 So FAIRVIEW AVENUE',
    city: 'FARMINGTON',
    state: 'NM',
    zipcode: '87401-2202',
    phone: '(505) 564-2665',
    fax: '(505) 564-4398',
    region: 'VDC'
  },
  {
    id: '38-506',
    group_number: '38',
    group_name: 'JS ALBUQUERQUE - 38',
    manager: 'Tina Corral',
    name: 'JS RIO RANCHO - 506',
    address: '5115 INDUSTRIAL PARK LOOP',
    city: 'RIO RANCHO',
    state: 'NM',
    zipcode: '87124',
    phone: '(505) 312-4344',
    fax: '(505) 881-1739',
    region: 'VDC'
  },
  {
    id: '38-430',
    group_number: '38',
    group_name: 'JS ALBUQUERQUE - 38',
    manager: 'Manuel Martinez',
    name: 'JS ROSWELL NM - 430',
    address: '401 SO MAIN ST',
    city: 'ROSWELL',
    state: 'NM',
    zipcode: '88203',
    phone: '(575) 622-1232',
    fax: '(575) 622-1184',
    region: 'TDC'
  },
  {
    id: '38-350',
    group_number: '38',
    group_name: 'JS ALBUQUERQUE - 38',
    manager: 'TBA',
    name: 'JS SANTA FE - 350',
    address: '1259 SILER ROAD',
    city: 'SANTA FE',
    state: 'NM',
    zipcode: '87507',
    phone: '(505) 424-4328',
    fax: '(505) 216-3340',
    region: 'VDC'
  },
  {
    id: '55-55',
    group_number: '55',
    group_name: 'JS AUSTIN - 55',
    manager: 'Ben Thomas',
    name: 'JS AUSTIN - 55',
    address: '10620 METRIC BLVD',
    city: 'AUSTIN',
    state: 'TX',
    zipcode: '78758',
    phone: '(512) 834-0346',
    fax: '(512) 834-8103',
    region: 'TDC'
  },
  {
    id: '55-458',
    group_number: '55',
    group_name: 'JS AUSTIN - 55',
    manager: 'TBD',
    name: 'JS LAKEWAY - 458',
    address: '2009 RANCH ROAD 620 NORTH',
    address2: 'BUILDING 5',
    city: 'LAKEWAY',
    state: 'TX',
    zipcode: '78734',
    phone: '(512) 296-2424',
    fax: '(512) 358-4837',
    region: 'TDC'
  },
  {
    id: '55-651',
    group_number: '55',
    group_name: 'JS AUSTIN - 55',
    manager: 'PAT REPA',
    name: 'JS PFLUGERVILLE - 651',
    address: '19101 NORTH HEATHERWILDE BLVD',
    address2: 'BLDG 4, SUITE 155',
    city: 'PFLUGERVILLE',
    state: 'TX',
    zipcode: '78660',
    phone: '(512) 829-8070',
    fax: '(512) 829-8086',
    region: 'TDC'
  },
  {
    id: '55-225',
    group_number: '55',
    group_name: 'JS AUSTIN - 55',
    manager: 'Brian Burnes',
    name: 'JS S. AUSTIN - 225',
    address: '4114 TODD LANE',
    city: 'AUSTIN',
    state: 'TX',
    zipcode: '78744',
    phone: '(512) 440-7229',
    fax: '(512) 440-7254',
    region: 'TDC'
  },
  {
    id: '20-20',
    group_number: '20',
    group_name: 'JS BILLINGS - 20',
    manager: 'Paul Keneally',
    name: 'JS BILLINGS - 20',
    address: '5253 SOUTHGATE DRIVE',
    city: 'BILLINGS',
    state: 'MT',
    zipcode: '59101',
    phone: '(406) 252-1207',
    fax: '(406) 248-4862',
    region: 'PDC'
  },
  {
    id: '20-167',
    group_number: '20',
    group_name: 'JS BILLINGS - 20',
    manager: 'DOUG BOND',
    name: 'JS MISSOULA - 167',
    address: '734 HOLMES',
    city: 'MISSOULA',
    state: 'MT',
    zipcode: '59802',
    phone: '(406) 542-1418',
    fax: '(406) 542-1569',
    region: 'PDC'
  },
  {
    id: '103-568',
    group_number: '103',
    group_name: 'JS BLOOMINGTON - 103',
    manager: 'Ryan Scimeca',
    name: 'JS BENSENVILLE - 568',
    address: '595-601 SUPREME DRIVE',
    city: 'BENSENVILLE',
    state: 'IL',
    zipcode: '60106',
    phone: '(847) 956-0810',
    fax: '(847) 956-1095',
    region: 'IDC'
  },
  {
    id: '103-103',
    group_number: '103',
    group_name: 'JS BLOOMINGTON - 103',
    manager: 'Zach Friederich',
    name: 'JS BLOOMINGTON - 103',
    address: '1401 W 94th STREET',
    city: 'BLOOMINGTON',
    state: 'MN',
    zipcode: '55431',
    phone: '(952) 853-9898',
    fax: '(952) 853-2277',
    region: 'IDC'
  },
  {
    id: '103-569',
    group_number: '103',
    group_name: 'JS BLOOMINGTON - 103',
    manager: 'Stephanie Beyerl',
    name: 'JS CARY - 569',
    address: '1000 ALEXANDER COURT',
    city: 'CARY',
    state: 'IL',
    zipcode: '60013',
    phone: '(847) 383-6997',
    fax: '(847) 966-2794',
    region: 'IDC'
  },
  {
    id: '103-570',
    group_number: '103',
    group_name: 'JS BLOOMINGTON - 103',
    manager: 'Ron Horton',
    name: 'JS CHICAGO CENTRAL - 570',
    address: '1200 W CERMAK STREET',
    address2: 'SUITE D',
    city: 'CHICAGO',
    state: 'IL',
    zipcode: '60608',
    phone: '(847) 966-2700',
    fax: '(847) 966-2794',
    region: 'IDC'
  },
  {
    id: '103-565',
    group_number: '103',
    group_name: 'JS BLOOMINGTON - 103',
    manager: 'Tony Flores',
    name: 'JS CHICAGO NORTH - 565',
    address: '4150 N KNOX AVE',
    city: 'CHICAGO',
    state: 'IL',
    zipcode: '60641',
    phone: '(773) 486-2525',
    fax: '(952) 853-2277',
    region: 'IDC'
  },
  {
    id: '103-567',
    group_number: '103',
    group_name: 'JS BLOOMINGTON - 103',
    manager: 'Tiommi Clay',
    name: 'JS DOWNERS GROVE - 567',
    address: '5375 WALNUT AVE',
    city: 'DOWNERS GROVE',
    state: 'IL',
    zipcode: '60515',
    phone: '(630) 427-6200',
    fax: '(630) 324-1937',
    region: 'IDC'
  }
];

async function run() {
  try {
    console.log('Starting locations import...');
    console.log('Importing locations...');

    // Insert locations in smaller batches to avoid timeouts
    const batchSize = 10;
    for (let i = 0; i < locations.length; i += batchSize) {
      const batch = locations.slice(i, i + batchSize);
      const { error: upsertError } = await supabase
        .from('locations')
        .upsert(batch, {
          onConflict: 'id',
          ignoreDuplicates: false
        });

      if (upsertError) {
        throw new Error(`Failed to upsert batch ${Math.floor(i / batchSize) + 1}: ${upsertError.message}`);
      }

      console.log(`Imported batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(locations.length / batchSize)}`);
      
      // Add a small delay between batches to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('Successfully imported all locations');
    process.exit(0);
  } catch (error) {
    console.error('Error during import:', error);
    process.exit(1);
  }
}

run();