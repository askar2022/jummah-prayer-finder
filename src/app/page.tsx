'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MasjidList from './components/MasjidList';
import WelcomeMessage from './components/WelcomeMessage';
import NoResultsMessage from './components/NoResultsMessage';
import CityFilter from './components/CityFilter';
import NearMeButton from './components/NearMeButton';
import masjidData from '../data/masjids.json';
import DateTimeDisplay from './components/DateTimeDisplay';
import AddMasjidCard from './components/AddMasjidCard';
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {randomImage && (
        <div className="text-center mb-6">
          <img
            src={`/images/Masjids/${randomImage}`}
            alt="Masjid"
            className="max-w-full rounded-xl shadow-lg mx-auto"
          />
        </div>
      )}

      <DateTimeDisplay />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFiltered={setFiltered}
        setIsSearching={setIsSearching}
        data={getFilteredData()}
      />

      <NearMeButton 
        onLocationFound={handleLocationFound}
        isActive={isNearMeActive}
      />

      <CityFilter
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
        cities={cities}
      />

      {!isSearching && !selectedCity && !isNearMeActive && <WelcomeMessage />}
      {!isSearching && (selectedCity || isNearMeActive) && <MasjidList masjids={getFilteredData()} userLocation={userLocation} />}
      {isSearching && filtered.length > 0 && <MasjidList masjids={filtered} userLocation={userLocation} />}
      {isSearching && filtered.length === 0 && (
        <NoResultsMessage clear={() => setSearchTerm('')} />
      )}

      <AddMasjidCard />

      {/* Admin Access Link */}
      <div className="text-center mt-6">
        <a
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
        >
          🔐 Admin Panel
        </a>
      </div>
    </div>
  );
}
