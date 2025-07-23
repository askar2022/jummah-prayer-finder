# 🕌 Masjid Setup Guide

## Adding New Masjids & Images

### Step 1: Add Masjid Image
1. Place your masjid image in: `public/images/MasjidNames/`
2. Name the file to match the masjid name (e.g., `Al-Noor.jfif`, `Islamic-Center.webp`)

### Step 2: Add Masjid Data
Edit `src/data/masjids.json` and add:

```json
{
  "id": 5,
  "name": "Masjid Example",
  "jummha": ["12:30 PM", "1:45 PM"],
  "address": "123 Example St",
  "khudba": ["Imam Name", "Dr. Speaker"],
  "image": "/images/MasjidNames/Example.jpg",
  "prayers": {
    "fajr": "5:00 AM",
    "dhuhr": "1:00 PM", 
    "asr": "5:00 PM",
    "maghrib": "8:45 PM",
    "isha": "10:00 PM"
  }
}
```

### Step 3: Auto-Matching (Optional)
The system can automatically match masjid names to images! Just:
- Name your image files clearly
- The system will find matching images automatically
- Update `src/utils/imageUtils.ts` to add new mappings

### Current Images Available:
- ✅ `Al-Nur.jfif` → Masjid Al-Noor
- ✅ `Abubakar-Islamic-Center.webp` → Abubakar Islamic Center  
- ✅ `alfurqan.jfif` → Masjid Al-Furqan
- ✅ `Tawfiq.jfif` → Masjid Tawfiq

### Mobile-First Features:
- 📱 **Directions Button** - Opens Google Maps
- 🔍 **Search** - Find by name, time, or address
- ⏰ **Multiple Prayer Times** - Prayer 1, Prayer 2, etc.
- 🗺️ **GPS Navigation** - One-tap directions

## File Structure:
```
public/images/MasjidNames/
├── Al-Nur.jfif
├── Abubakar-Islamic-Center.webp
├── alfurqan.jfif
└── Tawfiq.jfif

src/data/
└── masjids.json

src/utils/
└── imageUtils.ts
``` 