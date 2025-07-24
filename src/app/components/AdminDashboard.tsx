'use client';

import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Users, Plus, Edit3, LogOut } from 'lucide-react';
import Card from './UI/Card';
import Container from './UI/Container';
import AdminMasjidForm from './AdminMasjidForm';
import { supabase } from '../lib/supabase';

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
  created_at?: string;
  updated_at?: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [masjids, setMasjids] = useState<Masjid[]>([]);
  const [contacts, setContacts] = useState<Array<{id: string, name: string, email: string, phone?: string, comments?: string, submitted_at: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch masjids
      const { data: masjidData, error: masjidError } = await supabase
        .from('masjids')
        .select('*')
        .order('name');

      if (masjidError) throw masjidError;

      // Fetch recent contacts
      const { data: contactData, error: contactError } = await supabase
        .from('contacts')
        .select('*')
        .order('submitted_at', { ascending: false })
        .limit(5);

      if (contactError) throw contactError;

      setMasjids(masjidData || []);
      setContacts(contactData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMasjidSuccess = () => {
    setShowAddForm(false);
    fetchData(); // Refresh the data
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="my-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-6">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchData}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-6">
      <div className="space-y-6">
        {/* Header with Logout */}
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your masjid&apos;s information and prayer times</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Show Add Masjid Form if active */}
        {showAddForm && (
          <AdminMasjidForm
            onSuccess={handleAddMasjidSuccess}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-teal-50 border-teal-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Total Masjids</h3>
                <p className="text-2xl font-bold text-teal-600">{masjids.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Contact Messages</h3>
                <p className="text-2xl font-bold text-blue-600">{contacts.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Cities Covered</h3>
                <p className="text-2xl font-bold text-green-600">
                  {[...new Set(masjids.map(m => m.city).filter(Boolean))].length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Masjids */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Masjids</h2>
            <button 
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
            >
              <Plus className="w-4 h-4" />
              Add Masjid
            </button>
          </div>
          <div className="space-y-3">
            {masjids.slice(0, 5).map((masjid) => (
              <div key={masjid.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{masjid.name}</h3>
                  <p className="text-sm text-gray-600">{masjid.address}, {masjid.city}</p>
                  <p className="text-xs text-gray-500">
                    Jummah: {masjid.jummha.join(', ')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Contacts */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Contact Messages</h2>
          <div className="space-y-3">
            {contacts.length > 0 ? contacts.map((contact) => (
              <div key={contact.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    {contact.phone && <p className="text-sm text-gray-600">{contact.phone}</p>}
                    {contact.comments && (
                      <p className="text-sm text-gray-700 mt-2">{contact.comments}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(contact.submitted_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No contact messages yet</p>
            )}
          </div>
        </Card>
      </div>
    </Container>
  );
} 