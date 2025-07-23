'use client';

import React from 'react';
import { MapPinIcon, ChevronDownIcon } from 'lucide-react';

interface CityFilterProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  cities: string[];
}

export default function CityFilter({ selectedCity, onCityChange, cities }: CityFilterProps) {
  return (
    <div className="mb-4">
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <MapPinIcon className="w-4 h-4 text-teal-600" />
          <span className="text-sm font-medium text-gray-700">Filter by City</span>
        </div>
        
        <div className="relative">
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          
          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        {/* Selected city indicator */}
        {selectedCity && (
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-teal-100 text-teal-700 rounded-full">
              📍 {selectedCity}
            </span>
            <button
              onClick={() => onCityChange('')}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 