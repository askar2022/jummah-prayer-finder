'use client';

import React from 'react';
import Card from './UI/Card';
import Container from './UI/Container';
import SectionTitle from './UI/SectionTitle';

function WelcomeMessage() {
  return (
    <Container className="my-6">
      <Card className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Welcome to Jummah Prayer Finder</h2>
        <p className="text-gray-600 mb-6">
          Find mosques and prayer times using multiple search methods below.
        </p>
        
        {/* Search Methods */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Search Bar Examples */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🔍</span>
              <h3 className="font-semibold text-blue-800">Search Bar</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Prayer time: <strong className="text-blue-600">1:30 PM</strong></li>
              <li>Masjid name: <strong className="text-green-600">Masjid Al-Noor</strong></li>
              <li>Address: <strong className="text-purple-600">Main Street</strong></li>
            </ul>
          </div>

          {/* Near Me Feature */}
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📍</span>
              <h3 className="font-semibold text-teal-800">Near Me</h3>
            </div>
            <p className="text-sm text-gray-700">
              Click <strong className="text-teal-600">"Show Near Me"</strong> to find the closest masjids with real distances from your location.
            </p>
          </div>

          {/* City Filter */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🏙️</span>
              <h3 className="font-semibold text-green-800">City Filter</h3>
            </div>
            <p className="text-sm text-gray-700">
              Use the <strong className="text-green-600">city dropdown</strong> to filter masjids by specific cities like Minneapolis, St. Paul, etc.
            </p>
          </div>

          {/* Add Masjid */}
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🕌</span>
              <h3 className="font-semibold text-orange-800">Missing Masjid?</h3>
            </div>
            <p className="text-sm text-gray-700">
              Don't see your masjid? Help the community by <strong className="text-orange-600">submitting it</strong> using the form below.
            </p>
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default WelcomeMessage;
