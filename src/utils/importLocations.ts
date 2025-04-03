import { supabase } from '../lib/supabase';
import { locations } from '../data/locations';
import type { Database } from '../types/supabase';

type LocationInsert = Database['public']['Tables']['locations']['Insert'];

export async function importLocations() {
  try {
    // First, clear existing data
    const { error: deleteError } = await supabase
      .from('locations')
      .delete()
      .neq('id', ''); // Delete all records

    if (deleteError) {
      throw new Error(`Failed to clear existing data: ${deleteError.message}`);
    }

    // Transform locations data to match Supabase schema
    const locationsToInsert: LocationInsert[] = locations.map(location => ({
      id: `${location.groupNumber}-${location.id.split('-')[1] || location.id}`,
      group_number: location.groupNumber,
      group_name: location.groupName,
      manager: location.manager,
      name: location.name,
      address: location.address,
      address2: location.address2,
      city: location.city,
      state: location.state,
      zipcode: location.zipcode,
      phone: location.phone,
      fax: location.fax,
      region: location.region,
      coordinates: location.coordinates || null
    }));

    // Insert data in batches of 50 to avoid rate limits
    const batchSize = 50;
    for (let i = 0; i < locationsToInsert.length; i += batchSize) {
      const batch = locationsToInsert.slice(i, i + batchSize);
      const { error: insertError } = await supabase
        .from('locations')
        .insert(batch);

      if (insertError) {
        throw new Error(`Failed to insert batch ${i / batchSize + 1}: ${insertError.message}`);
      }

      console.log(`Imported batch ${i / batchSize + 1} of ${Math.ceil(locationsToInsert.length / batchSize)}`);
    }

    console.log('Successfully imported all locations');
    return { success: true, count: locationsToInsert.length };
  } catch (error) {
    console.error('Error importing locations:', error);
    return { success: false, error };
  }
}