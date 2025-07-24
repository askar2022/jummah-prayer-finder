/**
 * Location utilities for finding nearby masjids
 */

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Masjid {
  id: number;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  jummha: string[];
  khudba: string[];
  image: string;
  notes: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface MasjidWithDistance extends Masjid {
  distance: number;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in miles
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3958.8; // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Get user's current location using browser geolocation API
 */
export function getCurrentLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
}

/**
 * Sort masjids by distance from user location
 */
export function sortMasjidsByDistance(
  masjids: Masjid[],
  userLocation: Location
): MasjidWithDistance[] {
  return masjids
    .map((masjid) => ({
      ...masjid,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        masjid.latitude,
        masjid.longitude
      ),
    }))
    .sort((a, b) => a.distance - b.distance);
}

/**
 * Format distance for display
 */
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${(distance * 5280).toFixed(0)} ft away`;
  }
  return `${distance.toFixed(1)} miles away`;
} 