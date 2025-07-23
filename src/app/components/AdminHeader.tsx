'use client';

import React from 'react';
import { Search, Settings } from 'lucide-react';

interface AdminHeaderProps {
  onSearchClick?: () => void;
  onAdminClick?: () => void;
}

export default function AdminHeader({ onSearchClick, onAdminClick }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-label="mosque">
                <path d="M12 2L8 6h1v2H7v12h10V8h-2V6h1l-4-4zM10 7h4v1h-4V7zm-1 3h6v10h-2v-6h-2v6H9V10zm3 4v4h-2v-4h2z"/>
                <circle cx="6" cy="4" r="1"/>
                <circle cx="18" cy="4" r="1"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Jummah Times MN</h1>
              <p className="text-xs text-gray-500">Minnesota Prayer Times</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={onSearchClick}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <Search className="w-4 h-4" />
              <span className="font-medium">Search</span>
            </button>

            {/* Admin Button */}
            <button
              onClick={onAdminClick}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200 shadow-sm"
            >
              <Settings className="w-4 h-4" />
              <span className="font-medium">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 