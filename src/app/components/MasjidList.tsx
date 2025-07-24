'use client';

import React from 'react';
import MasjidCard from './MasjidCard';
import Container from './UI/Container';
import SectionTitle from './UI/SectionTitle';

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
  masjids: Masjid[];
  userLocation?: { latitude: number; longitude: number };
}

export default function MasjidList({ masjids, userLocation }: Props) {
  // Calculate total prayer time cards
  const totalPrayerTimes = masjids.reduce((total, masjid) => total + masjid.jummha.length, 0);

  return (
    <Container className="my-6">
      <SectionTitle className="mb-6">
        Found {totalPrayerTimes} prayer time{totalPrayerTimes !== 1 ? 's' : ''} at {masjids.length} masjid{masjids.length !== 1 ? 's' : ''}
      </SectionTitle>
      <div className="space-y-4">
        {masjids.map((masjid) => (
          <MasjidCard 
            key={masjid.id}
            masjid={masjid}
            userLocation={userLocation}
          />
        ))}
      </div>
    </Container>
  );
}
