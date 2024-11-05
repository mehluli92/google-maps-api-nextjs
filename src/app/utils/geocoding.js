// utils/geocoding.js
import axios from 'axios';

const GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

export async function geocodeAddress(address) {
  try {
    const response = await axios.get(GOOGLE_MAPS_API_URL, {
      params: {
        address,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    });
    return response.data.results[0].geometry.location; // Returns { lat, lng }
  } catch (error) {
    console.error("Error geocoding address:", error);
    throw error;
  }
}

export async function reverseGeocode(lat, lng) {
  try {
    const response = await axios.get(GOOGLE_MAPS_API_URL, {
      params: {
        latlng: `${lat},${lng}`,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    });
    return response.data.results[0].formatted_address; // Returns address
  } catch (error) {
    console.error("Error reverse geocoding coordinates:", error);
    throw error;
  }
}
