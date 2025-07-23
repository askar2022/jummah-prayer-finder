'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SearchBar from './components/SearchBar';
import MasjidList from './components/MasjidList';
import NoResultsMessage from './components/NoResultsMessage';
import masjidData from '../data/masjids.json';
import DateTimeDisplay from './components/DateTimeDisplay';
import AddMasjidCard from './components/AddMasjidCard';
import CompactToolbar from './components/CompactToolbar';
import { sortMasjidsByDistance } from '../utils/locationUtils';
// import TestStyles from './test-styles'; // Temporary test component

interface Masjid {
  id: number;
  name: string;
  jummha: string[];
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  khudba: string[];
  image: string;
  notes: string;
  prayers: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
}

const masjidImages = [
  'masjid1.jpg',
  'masjid2.jpg',
  'masjid3.jpg',
  'masjid4.jpg',
  'masjid5.jpg'
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState<Masjid[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | undefined>(undefined);
  const [isNearMeActive, setIsNearMeActive] = useState(false);
  const [randomImage, setRandomImage] = useState<string | null>(null);

  // Get unique cities from masjid data
  const cities = [...new Set(masjidData.map(masjid => masjid.city))].sort();

  useEffect(() => {
    const random = masjidImages[Math.floor(Math.random() * masjidImages.length)];
    setRandomImage(random);
  }, []);

  // Filter masjids by city or location
  const getFilteredData = () => {
    let data = masjidData;
    
    if (selectedCity) {
      data = data.filter(masjid => masjid.city === selectedCity);
    }
    
    if (isNearMeActive && userLocation) {
      // Sort by distance from user location
      const sortedData = sortMasjidsByDistance(data, userLocation);
      return sortedData.slice(0, 10); // Limit to closest 10 masjids
    }
    
    return data;
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    // Clear search and near me when city changes
    setSearchTerm('');
    setFiltered([]);
    setIsSearching(false);
    setIsNearMeActive(false);
    setUserLocation(undefined);
  };

  const handleLocationFound = (latitude: number, longitude: number) => {
    setUserLocation({ latitude, longitude });
    setIsNearMeActive(true);
    // Clear other filters when using near me
    setSelectedCity('');
    setSearchTerm('');
    setFiltered([]);
    setIsSearching(false);
  };

  // Uncomment the next line to test styling:
  // return <TestStyles />;

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-4xl">
      {randomImage && (
        <div className="text-center mb-4 sm:mb-6">
          <Image
            src={`/images/Masjids/${randomImage}`}
            alt="Masjid"
            width={800}
            height={400}
            className="max-w-full h-32 sm:h-auto rounded-xl shadow-lg mx-auto object-cover"
            style={{ height: 'auto' }}
          />
        </div>
      )}

      <DateTimeDisplay />
      
      <div className="text-center mb-3 sm:mb-4">
        <p className="text-xs sm:text-sm text-gray-600 font-medium">
          Find masjids and prayer times using multiple search methods below.
        </p>
      </div>

      <CompactToolbar
        onLocationFound={handleLocationFound}
        isNearMeActive={isNearMeActive}
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
        cities={cities}
      />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFiltered={setFiltered}
        setIsSearching={setIsSearching}
        data={getFilteredData()}
      />

      {!isSearching && !selectedCity && !isNearMeActive && (
        <div className="text-center py-8 sm:py-12">
          <div className="text-4xl sm:text-6xl mb-4">🕌</div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Ready to find your masjid?</h3>
          <p className="text-sm sm:text-base text-gray-500 mb-4">Use the search bar, select a city, or find masjids near you</p>
        </div>
      )}
      {!isSearching && (selectedCity || isNearMeActive) && <MasjidList masjids={getFilteredData()} userLocation={userLocation} />}
      {isSearching && filtered.length > 0 && <MasjidList masjids={filtered} userLocation={userLocation} />}
      {isSearching && filtered.length === 0 && (
        <NoResultsMessage clear={() => setSearchTerm('')} />
      )}

      <AddMasjidCard />
    </div>
  );
}
