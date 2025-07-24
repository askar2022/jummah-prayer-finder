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
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setFiltered: (results: Masjid[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  data: Masjid[];
}

function SearchBar({ searchTerm, setSearchTerm, setFiltered, setIsSearching, data }: Props) {
  const matchesTimeSearch = (time: string, searchTerm: string): boolean => {
    console.log('Matching time:', time, 'with search:', searchTerm);
    
    const timeClean = time.replace(/\s+/g, '').toLowerCase();
    const searchClean = searchTerm.replace(/\s+/g, '').toLowerCase();
    
    // Direct substring match (existing functionality)
    if (timeClean.includes(searchClean)) {
      console.log('Direct match found!');
      return true;
    }
    
    // Enhanced time matching for formats like "12pm", "1pm", etc.
    const timePattern = /^(\d{1,2}):?(\d{2})?\s*(am|pm)$/i;
    const searchMatch = searchClean.match(timePattern);
    
    if (searchMatch) {
      console.log('Search pattern matched:', searchMatch);
      const [, searchHour, searchMinute, searchPeriod] = searchMatch;
      const searchHourNum = parseInt(searchHour);
      const searchPeriodLower = searchPeriod.toLowerCase();
      
      // Extract hour and period from the time - support multiple formats
      const timeMatch = time.match(/^(\d{1,2}):?(\d{2})?\s*(AM|PM)$/i);
      if (timeMatch) {
        console.log('Time pattern matched:', timeMatch);
        const [, timeHour, , timePeriod] = timeMatch;
        const timeHourNum = parseInt(timeHour);
        const timePeriodLower = timePeriod.toLowerCase();
        
        // Match if hour and period match (regardless of minutes)
        if (searchHourNum === timeHourNum && searchPeriodLower === timePeriodLower) {
          console.log('Hour and period match found!');
          return true;
        }
      }
    }
    
    return false;
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFiltered([]);
      setIsSearching(false);
    } else {
      // Debug: Log the data structure
      console.log('Search data:', data.length > 0 ? data[0] : 'No data');
      console.log('Search term:', searchTerm);
      
      const filtered = data.filter(
        (masjid) => {
          // Debug: Log jummha data for each masjid
          if (masjid.jummha) {
            console.log(`${masjid.name} jummha:`, masjid.jummha, 'Type:', typeof masjid.jummha);
          }
          
          const nameMatch = masjid.name.toLowerCase().includes(searchTerm.toLowerCase());
          const addressMatch = masjid.address.toLowerCase().includes(searchTerm.toLowerCase());
          
          // Handle jummha field properly - it might be a string instead of array
          let timeMatch = false;
          if (masjid.jummha) {
            if (Array.isArray(masjid.jummha)) {
              timeMatch = masjid.jummha.some((time: string) => matchesTimeSearch(time, searchTerm));
            } else if (typeof masjid.jummha === 'string') {
              timeMatch = matchesTimeSearch(masjid.jummha, searchTerm);
            }
          }
          
          return nameMatch || timeMatch || addressMatch;
        }
      );
      
      console.log('Filtered results:', filtered.length);
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
    <Container className="mb-4 sm:mb-6">
      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-white rounded-xl shadow-lg border border-teal-200">
        {/* Search Icon */}
        <div className="text-teal-500">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          placeholder="Search prayer time or masjid..."
          onChange={(e) => setSearchTerm(e.target.value.trimStart())}
          onKeyDown={handleKeyPress}
          className="flex-1 px-1 sm:px-2 py-1 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 border-none outline-none bg-transparent"
        />
        
        {/* Search Button */}
        <button 
          onClick={handleSearch} 
          className="bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm font-medium transition-all duration-200"
        >
          Search
        </button>
      </div>
      
      {/* Clear button when searching */}
      {searchTerm && (
        <div className="mt-2 sm:mt-3 text-center">
          <button 
            onClick={clearSearch} 
            className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 underline"
          >
            ✕ Clear search
          </button>
        </div>
      )}
    </Container>
  );
}

export default SearchBar;
