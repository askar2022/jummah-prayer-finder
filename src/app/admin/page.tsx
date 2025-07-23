'use client';

import React, { useState } from 'react';
import AdminLogin from '../components/AdminLogin';

export default function AdminPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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