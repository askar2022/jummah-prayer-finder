'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminLogin from '../components/AdminLogin';

export default function AdminPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Back to App Button */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            ← Back to Prayer Finder
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {showLogin ? (
          <AdminLogin />
        ) : (
          <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome to the admin panel!</p>
          </div>
        )}
      </main>
    </div>
  );
} 