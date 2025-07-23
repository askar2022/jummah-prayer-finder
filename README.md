# Jummah Prayer Finder 🌻

A modern Next.js application to help Muslims find local masjid Jummah (Friday) prayer times and other daily prayers.

## Features

- **🕌 Mosque Search**: Search and filter through local mosques
- **⏰ Prayer Times**: View Jummah and daily prayer times for each mosque
- **🎯 Interactive UI**: Clean, responsive design with modal components
- **📱 Mobile Friendly**: Responsive design that works on all devices
- **🌅 Date & Time Display**: Real-time display with Hijri calendar integration
- **🖼️ Dynamic Images**: Random mosque images to enhance visual appeal
- **➕ Add Mosques**: Interface for adding new mosque information

## Tech Stack

- **Frontend**: Next.js 15.4.1 with React 19.1.0
- **Styling**: Tailwind CSS 4.1.11 + CSS Modules
- **Language**: TypeScript
- **Build Tool**: Next.js with ESLint

## Project Structure

```
jummah-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── UI/                    # Reusable UI components
│   │   │   │   ├── Modal.tsx         # Modal component
│   │   │   │   ├── Button.tsx        # Button component
│   │   │   │   ├── Card.tsx          # Card component
│   │   │   │   └── ...               # Other UI components
│   │   │   ├── MasjidList.tsx        # Display list of mosques
│   │   │   ├── MasjidCard.tsx        # Individual mosque card
│   │   │   ├── SearchBar.tsx         # Search functionality
│   │   │   ├── DateTimeDisplay.tsx   # Date/time with Hijri calendar
│   │   │   ├── AddMasjidCard.tsx     # Add new mosque interface
│   │   │   ├── WelcomeMessage.tsx    # Welcome screen
│   │   │   └── NoResultsMessage.tsx  # No search results screen
│   │   ├── page.tsx                  # Main page component
│   │   ├── layout.tsx                # App layout and metadata
│   │   └── globals.css               # Global styles
│   ├── data/
│   │   └── masjids.json              # Mosque data
│   ├── styles/                       # CSS Modules
│   └── utils/
│       └── hijriUtils.ts             # Hijri calendar utilities
├── public/
│   └── images/
│       └── masjids/                  # Mosque images
└── package.json
```

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd jummah-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Data Structure

Each mosque entry in `masjids.json` contains:

```json
{
  "id": 1,
  "name": "Masjid Al-Noor",
  "jummha": "12:30 PM",
  "address": "123 Main St",
  "khudba": "Imam Kareem",
  "prayers": {
    "fajr": "5:00 AM",
    "dhuhr": "1:00 PM",
    "asr": "5:00 PM",
    "maghrib": "8:45 PM",
    "isha": "10:00 PM"
  }
}
```

## Features Overview

### Search & Filter
- Real-time search through mosque names and addresses
- Dynamic filtering with instant results
- Clear search functionality

### Prayer Times Display
- Jummah prayer times prominently displayed
- Complete daily prayer schedule (Fajr, Dhuhr, Asr, Maghrib, Isha)
- Khutbah (sermon) speaker information

### UI Components
- Reusable Modal component for dialogs
- Responsive Card components for mosque information
- Modern Button and Input components
- Badge components for prayer time highlighting

### Date & Time Features
- Real-time clock display
- Hijri calendar integration
- Automatic date updates

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is private and all rights reserved.

---

**Built with ❤️ for the Muslim community**
