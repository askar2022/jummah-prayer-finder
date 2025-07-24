import './globals.css';
import Image from 'next/image';
import React from 'react';
import FooterWithContactModal from './components/FooterWithContactModal';

export const metadata = {
  title: 'Jummah Prayer Finder',
  description: 'Find masjids and Jummah prayer times in your area',
  manifest: '/manifest.json',
  themeColor: '#0d9488',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Jummah Finder',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">
        <header className="bg-white shadow-md border-b border-gray-100">
          <div className="max-w-4xl mx-auto py-2 sm:py-4 px-3 sm:px-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1">
                <Image 
                  src="/images/logo.JPG" 
                  alt="Jummah Prayer Finder Logo" 
                  width={40}
                  height={40}
                  className="object-contain sm:w-14 sm:h-14"
                />
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold text-teal-700 leading-tight">
                    Jummah Prayer Finder
                  </h1>
                  <p className="text-xs sm:text-sm text-teal-600 font-medium">
                    Find masjids and prayer times in your area
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 pb-4">
          {children}
        </main>
        <FooterWithContactModal />
      </body>
    </html>
  );
}
