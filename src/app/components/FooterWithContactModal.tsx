'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ContactModal from './ContactModal';

export default function FooterWithContactModal() {
  const [showContactModal, setShowContactModal] = useState(false);

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  return (
    <>
      <footer className="bg-gray-900 text-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Jummah Prayer Finder</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Helping the Muslim community in Minnesota find accurate Jummah prayer times at local masjids. Built with care for our ummah.
              </p>
              <div className="flex items-center gap-2 text-pink-400">
                <span className="text-sm">❤️</span>
                <span className="text-sm">Made for the community</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-3">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span className="text-sm">🔍</span>
                  Search Masjids
                </Link>
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span className="text-sm">⚙️</span>
                  Manage Your Masjid
                </Link>
                <button
                  onClick={handleContactClick}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-left"
                >
                  <span className="text-sm">📧</span>
                  Contact Us
                </button>
              </div>
            </div>

            {/* For App Admins */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg text-teal-400">🛡️</span>
                <h4 className="text-lg font-semibold">For App Admins</h4>
              </div>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                Manage app content and masjid information with our secure admin panel.
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                <span className="text-sm">⚙️</span>
                Admin Panel
              </Link>
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
                <button
                  onClick={handleContactClick}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </>
  );
} 