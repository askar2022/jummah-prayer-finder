'use client';

import React, { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface CompactToolbarProps {
  // Near Me props
  onLocationFound: (latitude: number, longitude: number) => void;
  isNearMeActive: boolean;
  
  // City Filter props
  selectedCity: string;
  onCityChange: (city: string) => void;
  cities: string[];
}

export default function CompactToolbar({
  onLocationFound,
  isNearMeActive,
  selectedCity,
  onCityChange,
  cities
}: CompactToolbarProps) {
  // PWA Install state
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  
  // Near Me state
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // PWA install listeners
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // PWA Install handler
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // Near Me handler
  const handleNearMeClick = () => {
    if (isNearMeActive) return;
    
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationFound(position.coords.latitude, position.coords.longitude);
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
          alert('Unable to get your location. Please enable location services.');
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setIsLocating(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-4 px-2 sm:px-4">
      {/* PWA Install Button */}
      {isInstalled ? (
        <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1">
          <span>✅</span>
          <span className="hidden sm:inline">App Installed</span>
          <span className="sm:hidden">Installed</span>
        </div>
      ) : (
        <button
          onClick={isInstallable ? handleInstallClick : () => {
            alert('To install this app:\n\n📱 On Mobile: Look for "Add to Home Screen" in your browser menu\n💻 On Desktop: Look for the install icon in your address bar\n\nOr visit this site in Chrome/Safari for the best install experience!');
          }}
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 transition-colors"
        >
          <span>📱</span>
          <span className="hidden sm:inline">{isInstallable ? 'Install App' : 'Add to Home'}</span>
          <span className="sm:hidden">Install</span>
        </button>
      )}

      {/* Near Me Button */}
      <button
        onClick={handleNearMeClick}
        disabled={isLocating || isNearMeActive}
        className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 transition-colors ${
          isNearMeActive
            ? 'bg-teal-100 text-teal-800'
            : isLocating
            ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
            : 'bg-purple-100 hover:bg-purple-200 text-purple-800'
        }`}
      >
        <span>📍</span>
        <span>
          {isLocating ? 'Finding...' : isNearMeActive ? 'Near Me Active' : 'Show Near Me'}
        </span>
      </button>

      {/* City Filter Dropdown */}
      <div className="relative">
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border-none outline-none cursor-pointer appearance-none pr-6 sm:pr-8"
        >
          <option value="">🏙️ Filter by All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              📍 {city}
            </option>
          ))}
        </select>
        <div className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <span className="text-orange-800 text-xs">▼</span>
        </div>
      </div>
    </div>
  );
} 