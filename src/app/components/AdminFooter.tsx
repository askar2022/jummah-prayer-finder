'use client';

import React from 'react';
import { Search, Settings, Mail, Heart, Shield } from 'lucide-react';

export default function AdminFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Jummah Times MN</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Helping the Muslim community in Minnesota find accurate Jummah prayer times at local mosques. Built with care for our ummah.
            </p>
            <div className="flex items-center gap-2 text-pink-400">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Made for the community</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Search className="w-4 h-4" />
                  Search Mosques
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Settings className="w-4 h-4" />
                  Manage Your Mosque
                </a>
              </li>
              <li>
                <a
                  href="https://docs.google.com/forms/d/1wmLS15RqCe5-QcaULd3HrVLXe9D01YUxeYoYiadhDkg/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* For Mosque Admins */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-teal-400" />
              <h4 className="text-lg font-semibold">For Mosque Admins</h4>
            </div>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Manage your mosque's prayer times and information with our secure admin panel.
            </p>
            <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
              <Settings className="w-4 h-4" />
              Admin Panel
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Jummah Prayer Finder by Dr. Askar. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a 
                href="https://docs.google.com/forms/d/1wmLS15RqCe5-QcaULd3HrVLXe9D01YUxeYoYiadhDkg/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 