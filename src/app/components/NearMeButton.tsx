'use client';

import React, { useState } from 'react';
import { Navigation, Loader2 } from 'lucide-react';

interface NearMeButtonProps {
  onLocationFound: (latitude: number, longitude: number) => void;
  isActive: boolean;
}

export default function NearMeButton({ onLocationFound, isActive }: NearMeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNearMe = async () => {
    if (isActive) {
      // If already active, reset
      window.location.reload();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000, // 5 minutes
          }
        );
      });

      onLocationFound(position.coords.latitude, position.coords.longitude);
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Location access denied. Please enable location sharing.');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Location information unavailable.');
            break;
          case err.TIMEOUT:
            setError('Location request timed out.');
            break;
          default:
            setError('An unknown error occurred.');
        }
      } else {
        setError('Unable to get your location.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleNearMe}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
          isActive
            ? 'bg-teal-600 text-white shadow-lg'
            : 'bg-white border-2 border-teal-200 text-teal-700 hover:bg-teal-50'
        } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Navigation className="w-5 h-5" />
        )}
        <span>
          {isActive ? 'Showing Nearby Masjids' : isLoading ? 'Finding Your Location...' : 'Show Near Me'}
        </span>
      </button>

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-xs text-red-600 underline mt-1"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
} 