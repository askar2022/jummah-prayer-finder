import './globals.css';

export const metadata = {
  title: 'Jummah Prayer Finder',
  description: 'Find mosques and Jummah prayer times in your area',
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
          <div className="max-w-4xl mx-auto py-4 px-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-1">
                <img 
                  src="/images/logo.JPG" 
                  alt="Jummah Prayer Finder Logo" 
                  className="w-14 h-14 object-contain"
                />
                <div>
                  <h1 className="text-3xl font-bold text-teal-700 leading-tight">
                    Jummah Prayer Finder
                  </h1>
                  <p className="text-sm text-teal-600 font-medium">
                    Find mosques and prayer times in your area
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 pb-4">
          {children}
        </main>
        <footer className="bg-gray-900 text-white mt-8">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Company Info */}
              <div>
                <h3 className="text-xl font-bold mb-4">Jummah Prayer Finder</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Helping the Muslim community in Minnesota find accurate Jummah prayer times at local mosques. Built with care for our ummah.
                </p>
                <div className="flex items-center gap-2 text-pink-400">
                  <span className="text-sm">❤️</span>
                  <span className="text-sm">Made for the community</span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/"
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <span className="text-sm">🔍</span>
                      Search Mosques
                    </a>
                  </li>
                  <li>
                    <a
                      href="/admin"
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <span className="text-sm">⚙️</span>
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
                      <span className="text-sm">📧</span>
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* For Mosque Admins */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg text-teal-400">🛡️</span>
                  <h4 className="text-lg font-semibold">For Mosque Admins</h4>
                </div>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  Manage your mosque's prayer times and information with our secure admin panel.
                </p>
                <a
                  href="/admin"
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  <span className="text-sm">⚙️</span>
                  Admin Panel
                </a>
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
      </body>
    </html>
  );
}
