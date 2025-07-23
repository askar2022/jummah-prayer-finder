'use client';

import React from 'react';
import Container from './UI/Container';

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

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setFiltered: (results: Masjid[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  data: Masjid[];
}

function SearchBar({ searchTerm, setSearchTerm, setFiltered, setIsSearching, data }: Props) {
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFiltered([]);
      setIsSearching(false);
    } else {
      const filtered = data.filter(
        (masjid) =>
          masjid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          masjid.jummha.some((time: string) => 
            time.replace(/\s+/g, '').toLowerCase().includes(
              searchTerm.replace(/\s+/g, '').toLowerCase()
            )
          ) ||
          masjid.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltered(filtered);
      setIsSearching(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFiltered([]);
    setIsSearching(false);
  };

  return (
    <Container className="mb-6">
      <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-lg border border-teal-200">
        {/* Search Icon */}
        <div className="text-teal-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          placeholder="Search by prayer time or masjid name..."
          onChange={(e) => setSearchTerm(e.target.value.trimStart())}
          onKeyDown={handleKeyPress}
          className="flex-1 px-2 py-1 text-gray-900 placeholder:text-gray-400 border-none outline-none bg-transparent"
        />
        
        {/* Search Button */}
        <button 
          onClick={handleSearch} 
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-200"
        >
          Search
        </button>
      </div>
      
      {/* Clear button when searching */}
      {searchTerm && (
        <div className="mt-3 text-center">
          <button 
            onClick={clearSearch} 
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            ✕ Clear search
          </button>
        </div>
              )}
    </Container>
  );
}

export default SearchBar;
