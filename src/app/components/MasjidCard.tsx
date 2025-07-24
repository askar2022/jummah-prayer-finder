'use client';

import React from 'react';
import { MapPinIcon, ClockIcon } from 'lucide-react';
import Card from './UI/Card';
import { calculateDistance, formatDistance } from '../../utils/locationUtils';

interface MasjidCardProps {
  masjid: {
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
  };
  userLocation?: { latitude: number; longitude: number };
}

export default function MasjidCard({ masjid, userLocation }: MasjidCardProps) {
  const handleDirections = () => {
    const address = encodeURIComponent(masjid.address);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
    window.open(directionsUrl, '_blank');
  };

  // Calculate distance if user location is available
  const distance = userLocation
    ? calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        masjid.latitude,
        masjid.longitude
      )
    : undefined;

  return (
    <Card className="mb-3 sm:mb-4 p-3 sm:p-6 border-l-4 border-l-teal-400 hover:shadow-lg transition-shadow duration-200">
      {/* Header with name and directions button */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 pr-2">{masjid.name}</h3>
        <button
          onClick={handleDirections}
          className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-teal-600 border border-teal-200 rounded-md hover:bg-teal-50 transition-colors duration-200 flex-shrink-0"
        >
          <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Directions</span>
          <span className="sm:hidden">📍</span>
        </button>
      </div>

      {/* Address and distance */}
      <div className="mb-3">
        <div className="flex items-center text-gray-600 text-xs sm:text-sm">
          <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          {masjid.address}
        </div>
        {distance !== undefined && (
          <div className="text-teal-600 text-xs sm:text-sm font-medium mt-1">
            {formatDistance(distance)}
          </div>
        )}
      </div>

      {/* Free Parking Badge */}
      <div className="mb-3 sm:mb-4">
        <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
          🅿️ Free Parking
        </span>
      </div>

      {/* All Prayer Times for this Masjid */}
      {masjid.jummha.map((prayerTime, index) => (
        <div key={index} className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gray-50 rounded-lg border-2 border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center text-teal-600">
              <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm font-medium">Prayer Time {index + 1}</span>
            </div>
            <div className="text-xl sm:text-3xl font-bold text-teal-600">
              {prayerTime}
            </div>
          </div>
          
          {/* Khutba and Imam in same box */}
          <div className="space-y-1 sm:space-y-2">
            <div className="text-xs sm:text-sm text-gray-700">
              <span className="font-medium">Khutba:</span> Unity and Brotherhood
            </div>
            <div className="text-xs sm:text-sm text-gray-700">
              <span className="font-medium">Imam:</span> {masjid.khudba[index] || masjid.khudba[0]}
            </div>
          </div>
        </div>
      ))}

      {/* Notes */}
      <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-100">
        <div>
          <span className="text-xs sm:text-sm font-semibold text-gray-700">Notes: </span>
          <span className="text-xs sm:text-sm text-gray-600">{masjid.notes}</span>
        </div>
      </div>
    </Card>
  );
}
