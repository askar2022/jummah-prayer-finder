'use client';

import React from 'react';
import { PlusIcon, ExternalLinkIcon } from 'lucide-react';
import Card from './UI/Card';
import Container from './UI/Container';

export default function AddMasjidCard() {
  return (
    <Container className="my-6">
      <Card className="p-6 border-l-4 border-l-teal-400 hover:shadow-lg transition-shadow duration-200">
        {/* Header with icon and title */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🕌</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Can't find your masjid?</h3>
          </div>
          {/* Submit button in top right */}
          <a
            href="https://docs.google.com/forms/d/1wmLS15RqCe5-QcaULd3HrVLXe9D01YUxeYoYiadhDkg/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-teal-600 border border-teal-200 rounded-md hover:bg-teal-50 transition-colors duration-200"
          >
            <PlusIcon className="w-4 h-4" />
            Submit
            <ExternalLinkIcon className="w-3 h-3" />
          </a>
        </div>

        {/* Badge */}
        <div className="mb-4 text-center">
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
            🕌 Help Muslims Find Prayer
          </span>
        </div>


      </Card>
    </Container>
  );
}

