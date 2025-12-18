
import { Place, RegionalData } from './types';

/**
 * AI-Curated Top 100 Iconic Places (V2.0)
 * Optimized for high-fidelity landscape displays.
 * These act as the 'Anchor Points' for the NomadGuide experience.
 */
export const POPULAR_DESTINATIONS: Place[] = [
  // --- EUROPE (Cinematic Selections) ---
  { name: 'Eiffel Tower', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Colosseum', location: 'Rome, Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Sagrada Familia', location: 'Barcelona, Spain', image: 'https://images.unsplash.com/photo-1583778175739-9941916135d4?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Mont Saint-Michel', location: 'Normandy, France', image: 'https://images.unsplash.com/photo-1534329532739-843f4b593bb7?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Neuschwanstein Castle', location: 'Bavaria, Germany', image: 'https://images.unsplash.com/photo-1503917988258-f19782441921?auto=format&fit=crop&w=1200&q=80' },
  { name: 'The Parthenon', location: 'Athens, Greece', image: 'https://images.unsplash.com/photo-1603566023891-edd61ae5b90a?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Stonehenge', location: 'Wiltshire, UK', image: 'https://images.unsplash.com/photo-1599240375926-78229b3a08d2?auto=format&fit=crop&w=1200&q=80' },
  { name: 'The Louvre', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1200&q=80' },

  // --- ASIA (High Fidelity Narratives) ---
  { name: 'Taj Mahal', location: 'Agra, India', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Great Wall of China', location: 'Huairou, China', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Fushimi Inari Shrine', location: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1470737331508-04837c45689b?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Angkor Wat', location: 'Siem Reap, Cambodia', image: 'https://images.unsplash.com/photo-1500049222539-6593a3800147?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Petra', location: 'Wadi Musa, Jordan', image: 'https://images.unsplash.com/photo-1579606031853-29479e00075d?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Hagia Sophia', location: 'Istanbul, Turkey', image: 'https://images.unsplash.com/photo-1541053226884-a15d03820a44?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Borobudur', location: 'Java, Indonesia', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80' },

  // --- AFRICA (Multiperspectival Histories) ---
  { name: 'Great Pyramid of Giza', location: 'Giza, Egypt', image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Table Mountain', location: 'Cape Town, SA', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Blue City', location: 'Chefchaouen, Morocco', image: 'https://images.unsplash.com/photo-1469796466635-455ede028ace?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Lalibela', location: 'Amhara, Ethiopia', image: 'https://images.unsplash.com/photo-1596434446633-51493437599c?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Serengeti', location: 'Tanzania', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80' },

  // --- AMERICAS (Cultural Landmarks) ---
  { name: 'Machu Picchu', location: 'Cusco Region, Peru', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Chichen Itza', location: 'Yucatan, Mexico', image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Christ the Redeemer', location: 'Rio de Janeiro, Brazil', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Tikal', location: 'Peten, Guatemala', image: 'https://images.unsplash.com/photo-1543736157-19416599d146?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Golden Gate Bridge', location: 'San Francisco, USA', image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Grand Canyon', location: 'Arizona, USA', image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1200&q=80' },
];

export const REGIONAL_DESTINATIONS: RegionalData = [
  {
    name: 'Curated Collections',
    countries: [
      {
        name: 'The Living History Project',
        cities: [
          {
            name: 'Ancient World',
            places: [
              POPULAR_DESTINATIONS[1], // Colosseum
              POPULAR_DESTINATIONS[5], // Parthenon
              POPULAR_DESTINATIONS[8], // Taj Mahal
              POPULAR_DESTINATIONS[15] // Giza
            ]
          },
          {
            name: 'Hidden Wonders',
            places: [
              POPULAR_DESTINATIONS[18], // Lalibela
              POPULAR_DESTINATIONS[12], // Petra
              POPULAR_DESTINATIONS[23], // Tikal
              POPULAR_DESTINATIONS[3]  // Mont Saint-Michel
            ]
          }
        ]
      }
    ]
  }
];
