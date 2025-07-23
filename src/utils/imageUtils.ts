/**
 * Utility functions for matching masjid names to image files
 */

export const normalizeNameForImage = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/masjid\s+/gi, '') // Remove "Masjid" prefix
    .replace(/islamic\s+center/gi, 'islamic-center') // Handle Islamic Center
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9\-]/g, ''); // Remove special characters except hyphens
};

export const findMasjidImage = (masjidName: string): string => {
  // Try to match the normalized name to available images
  const normalizedName = normalizeNameForImage(masjidName);
  
  // Direct matches
  const directMatches: { [key: string]: string } = {
    'al-noor': 'Al-Nur.jfif',
    'al-nur': 'Al-Nur.jfif',
    'abubakar-islamic-center': 'Abubakar-Islamic-Center.webp',
    'al-furqan': 'alfurqan.jfif',
    'alfurqan': 'alfurqan.jfif',
    'tawfiq': 'Tawfiq.jfif'
  };

  const matchedImage = directMatches[normalizedName];
  
  if (matchedImage) {
    return `/images/MasjidNames/${matchedImage}`;
  }

  // Fallback to a default image or return null
  return `/images/MasjidNames/Al-Nur.jfif`; // Default fallback
};

export const getMasjidImagePath = (masjidName: string, providedPath?: string): string => {
  // If a specific path is provided, use it
  if (providedPath) {
    return providedPath;
  }
  
  // Otherwise, try to find a matching image
  return findMasjidImage(masjidName);
}; 