'use client';

import React from 'react';
import { Clock, MapPin, Users, Settings, Plus, Edit3 } from 'lucide-react';
import Card from './UI/Card';
import Container from './UI/Container';

export default function AdminDashboard() {
  return (
    <Container className="my-6">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your mosque's information and prayer times</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-teal-50 border-teal-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Prayer Times</h3>
                <p className="text-sm text-gray-600">Manage Jummah schedules</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Mosque Info</h3>
                <p className="text-sm text-gray-600">Update details & location</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Community</h3>
                <p className="text-sm text-gray-600">View congregation data</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Management Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Prayer Times Management */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Prayer Times</h2>
              <Plus className="w-5 h-5 text-teal-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">First Jummah</span>
                <div className="flex items-center gap-2">
                  <span className="text-teal-600 font-semibold">12:30 PM</span>
                  <Edit3 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Second Jummah</span>
                <div className="flex items-center gap-2">
                  <span className="text-teal-600 font-semibold">1:45 PM</span>
                  <Edit3 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                </div>
              </div>
            </div>
            <button className="w-full mt-4 py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
              Update Prayer Times
            </button>
          </Card>

          {/* Mosque Information */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Mosque Information</h2>
              <Settings className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Mosque Name</label>
                <p className="text-gray-900">Masjid Al-Noor</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Address</label>
                <p className="text-gray-900">123 Main St, Minneapolis</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Contact</label>
                <p className="text-gray-900">(612) 555-0123</p>
              </div>
            </div>
            <button className="w-full mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Edit Information
            </button>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Prayer times updated for Friday, January 5th</span>
              <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Mosque information updated</span>
              <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">New prayer time slot added</span>
              <span className="text-xs text-gray-500 ml-auto">3 days ago</span>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
} 