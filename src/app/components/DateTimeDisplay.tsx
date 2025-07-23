'use client';

import React, { useEffect, useState } from 'react';
import { getHijriDate } from '../../utils/hijriUtils';
import Container from './UI/Container';

export default function DateTimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hijriDate, setHijriDate] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setHijriDate(getHijriDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <Container className="my-3">
      <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Time with Icon */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-sm text-teal-600">🕐</span>
            </div>
            <div>
              <div className="text-lg font-bold text-teal-600 leading-tight">
                {formattedTime}
              </div>
              <div className="text-xs font-medium text-teal-500">
                {formattedDate}
              </div>
            </div>
          </div>
          
          {/* Right: Hijri Date */}
          <div className="text-right">
            <div className="text-sm font-semibold text-teal-600">
              {hijriDate}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
