import { Location } from '../types';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { cityCoordinates } from '../data/locations';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const geocoder = new MapboxGeocoder({
  accessToken: MAPBOX_TOKEN,
  countries: 'us',
  types: ['address']
});

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 3, backoff = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await delay(backoff * Math.pow(2, i)); // Exponential backoff
    }
  }
  throw new Error('Failed after retries');
}

export async function geocodeAddress(address: string, city: string, state: string): Promise<[number, number] | undefined> {
  try {
    // First try to get coordinates from our predefined city list
    const cityKey = city.toUpperCase();
    if (cityCoordinates[cityKey]) {
      return cityCoordinates[cityKey];
    }

    // If not found, try geocoding the address
    const encodedAddress = encodeURIComponent(`${address}, ${city}, ${state}`);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_TOKEN}&country=US&limit=1`;
    
    const response = await fetchWithRetry(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!data.features || data.features.length === 0) {
      console.warn(`No geocoding results found for: ${address}, ${city}, ${state}`);
      return undefined;
    }
    
    const [lng, lat] = data.features[0].center;
    return [lng, lat];
  } catch (error) {
    console.error('Geocoding error:', error);
    // Return undefined instead of throwing to handle the error gracefully
    return undefined;
  }
}

export async function geocodeLocations(locations: Location[]): Promise<Location[]> {
  const geocodedLocations: Location[] = [];
  
  for (const location of locations) {
    try {
      if (!location.coordinates) {
        const coordinates = await geocodeAddress(location.address, location.city, location.state);
        if (coordinates) {
          geocodedLocations.push({
            ...location,
            coordinates
          });
        } else {
          // If geocoding fails, still include the location but without coordinates
          geocodedLocations.push(location);
        }
        // Add a delay between requests to avoid rate limiting
        await delay(500);
      } else {
        geocodedLocations.push(location);
      }
    } catch (error) {
      // If there's an error processing a location, include it without coordinates
      console.error(`Error geocoding location ${location.id}:`, error);
      geocodedLocations.push(location);
    }
  }
  
  return geocodedLocations;
}