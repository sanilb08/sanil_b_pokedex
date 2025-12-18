// SiteRadar - 100 Curated Global Locations
// Distribution: 25% Europe, 25% Asia, 20% Americas, 20% Africa, 10% Oceania
// All images verified working - using Unsplash direct URLs

import { Location } from '../types';

export const LOCATIONS: Location[] = [
  // === EUROPE (25) ===
  { id: 'eiffel', name: 'Eiffel Tower', region: 'Europe', country: 'France', coords: { lat: 48.8584, lng: 2.2945 }, image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80', category: 'urban' },
  { id: 'colosseum', name: 'Colosseum', region: 'Europe', country: 'Italy', coords: { lat: 41.8902, lng: 12.4922 }, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80', category: 'ancient' },
  { id: 'sagrada', name: 'Sagrada Familia', region: 'Europe', country: 'Spain', coords: { lat: 41.4036, lng: 2.1744 }, image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=80', category: 'sacred' },
  { id: 'stonehenge', name: 'Stonehenge', region: 'Europe', country: 'UK', coords: { lat: 51.1789, lng: -1.8262 }, image: 'https://images.unsplash.com/photo-1599833975787-5c143f373c30?w=800&q=80', category: 'ancient' },
  { id: 'parthenon', name: 'Parthenon', region: 'Europe', country: 'Greece', coords: { lat: 37.9715, lng: 23.7267 }, image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80', category: 'ancient' },
  { id: 'neuschwanstein', name: 'Neuschwanstein Castle', region: 'Europe', country: 'Germany', coords: { lat: 47.5576, lng: 10.7498 }, image: 'https://images.unsplash.com/photo-1534313314376-a72289b6181e?w=800&q=80', category: 'urban' },
  { id: 'louvre', name: 'The Louvre', region: 'Europe', country: 'France', coords: { lat: 48.8606, lng: 2.3376 }, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80', category: 'urban' },
  { id: 'mont-michel', name: 'Mont Saint-Michel', region: 'Europe', country: 'France', coords: { lat: 48.6361, lng: -1.5115 }, image: 'https://images.unsplash.com/photo-1596394723269-b2cbca4e6313?w=800&q=80', category: 'wonder' },
  { id: 'santorini', name: 'Santorini', region: 'Europe', country: 'Greece', coords: { lat: 36.3932, lng: 25.4615 }, image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80', category: 'nature' },
  { id: 'prague-castle', name: 'Prague Castle', region: 'Europe', country: 'Czechia', coords: { lat: 50.0911, lng: 14.4012 }, image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80', category: 'urban' },
  { id: 'northern-lights', name: 'Northern Lights', region: 'Europe', country: 'Norway', coords: { lat: 69.6496, lng: 18.9560 }, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80', category: 'nature' },
  { id: 'alhambra', name: 'Alhambra', region: 'Europe', country: 'Spain', coords: { lat: 37.1760, lng: -3.5881 }, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80', category: 'ancient' },
  { id: 'vatican', name: 'Vatican City', region: 'Europe', country: 'Vatican', coords: { lat: 41.9029, lng: 12.4534 }, image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80', category: 'sacred' },
  { id: 'dubrovnik', name: 'Dubrovnik Old Town', region: 'Europe', country: 'Croatia', coords: { lat: 42.6507, lng: 18.0944 }, image: 'https://images.unsplash.com/photo-1555990538-1e6c1c741c69?w=800&q=80', category: 'urban' },
  { id: 'amsterdam', name: 'Amsterdam Canals', region: 'Europe', country: 'Netherlands', coords: { lat: 52.3676, lng: 4.9041 }, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80', category: 'urban' },
  { id: 'big-ben', name: 'Big Ben', region: 'Europe', country: 'UK', coords: { lat: 51.5007, lng: -0.1246 }, image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80', category: 'urban' },
  { id: 'vienna-opera', name: 'Vienna State Opera', region: 'Europe', country: 'Austria', coords: { lat: 48.2029, lng: 16.3689 }, image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80', category: 'urban' },
  { id: 'cinque-terre', name: 'Cinque Terre', region: 'Europe', country: 'Italy', coords: { lat: 44.1461, lng: 9.6439 }, image: 'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?w=800&q=80', category: 'nature' },
  { id: 'acropolis', name: 'Acropolis Museum', region: 'Europe', country: 'Greece', coords: { lat: 37.9685, lng: 23.7285 }, image: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=800&q=80', category: 'ancient' },
  { id: 'plitvice', name: 'Plitvice Lakes', region: 'Europe', country: 'Croatia', coords: { lat: 44.8654, lng: 15.5820 }, image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80', category: 'nature' },
  { id: 'moscow-red', name: 'Red Square', region: 'Europe', country: 'Russia', coords: { lat: 55.7539, lng: 37.6208 }, image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&q=80', category: 'urban' },
  { id: 'florence', name: 'Florence Cathedral', region: 'Europe', country: 'Italy', coords: { lat: 43.7731, lng: 11.2560 }, image: 'https://images.unsplash.com/photo-1534359265607-b9cbe3c0a9f1?w=800&q=80', category: 'sacred' },
  { id: 'edinburgh', name: 'Edinburgh Castle', region: 'Europe', country: 'UK', coords: { lat: 55.9486, lng: -3.1999 }, image: 'https://images.unsplash.com/photo-1548687544-e32d3cf3a0f9?w=800&q=80', category: 'urban' },
  { id: 'bruges', name: 'Bruges Historic Center', region: 'Europe', country: 'Belgium', coords: { lat: 51.2093, lng: 3.2247 }, image: 'https://images.unsplash.com/photo-1559113202-c916b8e44373?w=800&q=80', category: 'urban' },
  { id: 'swiss-alps', name: 'Swiss Alps', region: 'Europe', country: 'Switzerland', coords: { lat: 46.8182, lng: 8.2275 }, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: 'nature' },

  // === ASIA (25) ===
  { id: 'taj-mahal', name: 'Taj Mahal', region: 'Asia', country: 'India', coords: { lat: 27.1751, lng: 78.0421 }, image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80', category: 'wonder' },
  { id: 'great-wall', name: 'Great Wall of China', region: 'Asia', country: 'China', coords: { lat: 40.4319, lng: 116.5704 }, image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80', category: 'ancient' },
  { id: 'angkor-wat', name: 'Angkor Wat', region: 'Asia', country: 'Cambodia', coords: { lat: 13.4125, lng: 103.8670 }, image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80', category: 'ancient' },
  { id: 'fushimi-inari', name: 'Fushimi Inari Shrine', region: 'Asia', country: 'Japan', coords: { lat: 34.9671, lng: 135.7727 }, image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80', category: 'sacred' },
  { id: 'petra', name: 'Petra', region: 'Asia', country: 'Jordan', coords: { lat: 30.3285, lng: 35.4444 }, image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=800&q=80', category: 'ancient' },
  { id: 'hagia-sophia', name: 'Hagia Sophia', region: 'Asia', country: 'Turkey', coords: { lat: 41.0086, lng: 28.9802 }, image: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=800&q=80', category: 'sacred' },
  { id: 'borobudur', name: 'Borobudur', region: 'Asia', country: 'Indonesia', coords: { lat: -7.6079, lng: 110.2038 }, image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80', category: 'sacred' },
  { id: 'ha-long', name: 'Ha Long Bay', region: 'Asia', country: 'Vietnam', coords: { lat: 20.9101, lng: 107.1839 }, image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80', category: 'nature' },
  { id: 'mount-fuji', name: 'Mount Fuji', region: 'Asia', country: 'Japan', coords: { lat: 35.3606, lng: 138.7274 }, image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80', category: 'nature' },
  { id: 'forbidden-city', name: 'Forbidden City', region: 'Asia', country: 'China', coords: { lat: 39.9163, lng: 116.3972 }, image: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=800&q=80', category: 'ancient' },
  { id: 'bali-temples', name: 'Bali Temples', region: 'Asia', country: 'Indonesia', coords: { lat: -8.4095, lng: 115.1889 }, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', category: 'sacred' },
  { id: 'golden-temple', name: 'Golden Temple', region: 'Asia', country: 'India', coords: { lat: 31.6200, lng: 74.8765 }, image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&q=80', category: 'sacred' },
  { id: 'sigiriya', name: 'Sigiriya Rock', region: 'Asia', country: 'Sri Lanka', coords: { lat: 7.9570, lng: 80.7603 }, image: 'https://images.unsplash.com/photo-1586523969917-df3e0b91b6de?w=800&q=80', category: 'ancient' },
  { id: 'terracotta', name: 'Terracotta Army', region: 'Asia', country: 'China', coords: { lat: 34.3847, lng: 109.2785 }, image: 'https://images.unsplash.com/photo-1591012911207-0dbac31f37da?w=800&q=80', category: 'ancient' },
  { id: 'dubai-burj', name: 'Burj Khalifa', region: 'Asia', country: 'UAE', coords: { lat: 25.1972, lng: 55.2744 }, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', category: 'urban' },
  { id: 'tokyo-shibuya', name: 'Shibuya Crossing', region: 'Asia', country: 'Japan', coords: { lat: 35.6595, lng: 139.7004 }, image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80', category: 'urban' },
  { id: 'maldives', name: 'Maldives', region: 'Asia', country: 'Maldives', coords: { lat: 3.2028, lng: 73.2207 }, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', category: 'nature' },
  { id: 'zhangjiajie', name: 'Zhangjiajie', region: 'Asia', country: 'China', coords: { lat: 29.1170, lng: 110.4793 }, image: 'https://images.unsplash.com/photo-1518993053450-66758a4b4e3f?w=800&q=80', category: 'nature' },
  { id: 'seoul-palace', name: 'Gyeongbokgung Palace', region: 'Asia', country: 'South Korea', coords: { lat: 37.5796, lng: 126.9770 }, image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&q=80', category: 'ancient' },
  { id: 'varanasi', name: 'Varanasi Ghats', region: 'Asia', country: 'India', coords: { lat: 25.3176, lng: 83.0063 }, image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80', category: 'sacred' },
  { id: 'kathmandu', name: 'Kathmandu Valley', region: 'Asia', country: 'Nepal', coords: { lat: 27.7172, lng: 85.3240 }, image: 'https://images.unsplash.com/photo-1582654454409-778c786b3de5?w=800&q=80', category: 'sacred' },
  { id: 'bangkok-temples', name: 'Bangkok Grand Palace', region: 'Asia', country: 'Thailand', coords: { lat: 13.7500, lng: 100.4913 }, image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80', category: 'sacred' },
  { id: 'philippines', name: 'Chocolate Hills', region: 'Asia', country: 'Philippines', coords: { lat: 9.8152, lng: 124.0948 }, image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80', category: 'nature' },
  { id: 'himeji', name: 'Himeji Castle', region: 'Asia', country: 'Japan', coords: { lat: 34.8394, lng: 134.6939 }, image: 'https://images.unsplash.com/photo-1580479800053-eb89a5d5ab4d?w=800&q=80', category: 'ancient' },
  { id: 'cappadocia', name: 'Cappadocia', region: 'Asia', country: 'Turkey', coords: { lat: 38.6431, lng: 34.8307 }, image: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80', category: 'wonder' },

  // === AMERICAS (20) ===
  { id: 'machu-picchu', name: 'Machu Picchu', region: 'Americas', country: 'Peru', coords: { lat: -13.1631, lng: -72.5450 }, image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80', category: 'ancient' },
  { id: 'grand-canyon', name: 'Grand Canyon', region: 'Americas', country: 'USA', coords: { lat: 36.1069, lng: -112.1129 }, image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80', category: 'nature' },
  { id: 'chichen-itza', name: 'Chichen Itza', region: 'Americas', country: 'Mexico', coords: { lat: 20.6843, lng: -88.5678 }, image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&q=80', category: 'ancient' },
  { id: 'christ-redeemer', name: 'Christ the Redeemer', region: 'Americas', country: 'Brazil', coords: { lat: -22.9519, lng: -43.2105 }, image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80', category: 'sacred' },
  { id: 'golden-gate', name: 'Golden Gate Bridge', region: 'Americas', country: 'USA', coords: { lat: 37.8199, lng: -122.4783 }, image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&q=80', category: 'urban' },
  { id: 'niagara', name: 'Niagara Falls', region: 'Americas', country: 'USA/Canada', coords: { lat: 43.0962, lng: -79.0377 }, image: 'https://images.unsplash.com/photo-1489447068241-b3490214e879?w=800&q=80', category: 'nature' },
  { id: 'statue-liberty', name: 'Statue of Liberty', region: 'Americas', country: 'USA', coords: { lat: 40.6892, lng: -74.0445 }, image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80', category: 'urban' },
  { id: 'iguazu', name: 'Iguazu Falls', region: 'Americas', country: 'Argentina/Brazil', coords: { lat: -25.6953, lng: -54.4367 }, image: 'https://images.unsplash.com/photo-1551877094-a39b2ef8cc60?w=800&q=80', category: 'nature' },
  { id: 'tikal', name: 'Tikal', region: 'Americas', country: 'Guatemala', coords: { lat: 17.2220, lng: -89.6237 }, image: 'https://images.unsplash.com/photo-1608236415053-3691c036bbb7?w=800&q=80', category: 'ancient' },
  { id: 'yellowstone', name: 'Yellowstone', region: 'Americas', country: 'USA', coords: { lat: 44.4280, lng: -110.5885 }, image: 'https://images.unsplash.com/photo-1560712076-e2a0b3f04a0d?w=800&q=80', category: 'nature' },
  { id: 'havana', name: 'Old Havana', region: 'Americas', country: 'Cuba', coords: { lat: 23.1136, lng: -82.3666 }, image: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=800&q=80', category: 'urban' },
  { id: 'amazon', name: 'Amazon Rainforest', region: 'Americas', country: 'Brazil', coords: { lat: -3.4653, lng: -62.2159 }, image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80', category: 'nature' },
  { id: 'banff', name: 'Banff National Park', region: 'Americas', country: 'Canada', coords: { lat: 51.4968, lng: -115.9281 }, image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80', category: 'nature' },
  { id: 'cusco', name: 'Cusco Historic Center', region: 'Americas', country: 'Peru', coords: { lat: -13.5320, lng: -71.9675 }, image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=800&q=80', category: 'urban' },
  { id: 'cartagena', name: 'Cartagena Old Town', region: 'Americas', country: 'Colombia', coords: { lat: 10.3910, lng: -75.4794 }, image: 'https://images.unsplash.com/photo-1535097956782-fc7fa5b0e2a8?w=800&q=80', category: 'urban' },
  { id: 'antelope', name: 'Antelope Canyon', region: 'Americas', country: 'USA', coords: { lat: 36.8619, lng: -111.3743 }, image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&q=80', category: 'nature' },
  { id: 'patagonia', name: 'Patagonia', region: 'Americas', country: 'Argentina', coords: { lat: -50.9423, lng: -73.4068 }, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80', category: 'nature' },
  { id: 'teotihuacan', name: 'Teotihuacan', region: 'Americas', country: 'Mexico', coords: { lat: 19.6925, lng: -98.8438 }, image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&q=80', category: 'ancient' },
  { id: 'moai', name: 'Easter Island Moai', region: 'Americas', country: 'Chile', coords: { lat: -27.1127, lng: -109.3497 }, image: 'https://images.unsplash.com/photo-1555689102-8cf9886b7f84?w=800&q=80', category: 'ancient' },
  { id: 'nyc-times', name: 'Times Square', region: 'Americas', country: 'USA', coords: { lat: 40.7580, lng: -73.9855 }, image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80', category: 'urban' },

  // === AFRICA (20) ===
  { id: 'pyramids', name: 'Great Pyramids of Giza', region: 'Africa', country: 'Egypt', coords: { lat: 29.9792, lng: 31.1342 }, image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&q=80', category: 'ancient' },
  { id: 'table-mountain', name: 'Table Mountain', region: 'Africa', country: 'South Africa', coords: { lat: -33.9628, lng: 18.4098 }, image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80', category: 'nature' },
  { id: 'victoria-falls', name: 'Victoria Falls', region: 'Africa', country: 'Zimbabwe/Zambia', coords: { lat: -17.9243, lng: 25.8572 }, image: 'https://images.unsplash.com/photo-1544767632-dc833f2a2577?w=800&q=80', category: 'nature' },
  { id: 'serengeti', name: 'Serengeti', region: 'Africa', country: 'Tanzania', coords: { lat: -2.1540, lng: 34.6857 }, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', category: 'nature' },
  { id: 'marrakech', name: 'Marrakech Medina', region: 'Africa', country: 'Morocco', coords: { lat: 31.6295, lng: -7.9811 }, image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80', category: 'urban' },
  { id: 'chefchaouen', name: 'Chefchaouen Blue City', region: 'Africa', country: 'Morocco', coords: { lat: 35.1688, lng: -5.2636 }, image: 'https://images.unsplash.com/photo-1553522988-516dbe1c3c3e?w=800&q=80', category: 'urban' },
  { id: 'lalibela', name: 'Rock Churches of Lalibela', region: 'Africa', country: 'Ethiopia', coords: { lat: 12.0319, lng: 39.0447 }, image: 'https://images.unsplash.com/photo-1575999502951-4ab25b5ca889?w=800&q=80', category: 'sacred' },
  { id: 'luxor', name: 'Luxor Temple', region: 'Africa', country: 'Egypt', coords: { lat: 25.6996, lng: 32.6390 }, image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80', category: 'ancient' },
  { id: 'zanzibar', name: 'Zanzibar Stone Town', region: 'Africa', country: 'Tanzania', coords: { lat: -6.1659, lng: 39.1989 }, image: 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800&q=80', category: 'urban' },
  { id: 'sahara', name: 'Sahara Desert', region: 'Africa', country: 'Morocco', coords: { lat: 31.1025, lng: -3.9990 }, image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&q=80', category: 'nature' },
  { id: 'kilimanjaro', name: 'Mount Kilimanjaro', region: 'Africa', country: 'Tanzania', coords: { lat: -3.0674, lng: 37.3556 }, image: 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=800&q=80', category: 'nature' },
  { id: 'cape-good-hope', name: 'Cape of Good Hope', region: 'Africa', country: 'South Africa', coords: { lat: -34.3568, lng: 18.4740 }, image: 'https://images.unsplash.com/photo-1552553302-9211bf7f7053?w=800&q=80', category: 'nature' },
  { id: 'kruger', name: 'Kruger National Park', region: 'Africa', country: 'South Africa', coords: { lat: -23.9884, lng: 31.5547 }, image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', category: 'nature' },
  { id: 'fez', name: 'Fez Medina', region: 'Africa', country: 'Morocco', coords: { lat: 34.0181, lng: -5.0078 }, image: 'https://images.unsplash.com/photo-1548820955-f4e22e699a16?w=800&q=80', category: 'urban' },
  { id: 'timbuktu', name: 'Timbuktu', region: 'Africa', country: 'Mali', coords: { lat: 16.7735, lng: -3.0074 }, image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80', category: 'ancient' },
  { id: 'abu-simbel', name: 'Abu Simbel', region: 'Africa', country: 'Egypt', coords: { lat: 22.3372, lng: 31.6258 }, image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80', category: 'ancient' },
  { id: 'okavango', name: 'Okavango Delta', region: 'Africa', country: 'Botswana', coords: { lat: -19.2872, lng: 22.8374 }, image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80', category: 'nature' },
  { id: 'ngorongoro', name: 'Ngorongoro Crater', region: 'Africa', country: 'Tanzania', coords: { lat: -3.1722, lng: 35.5873 }, image: 'https://images.unsplash.com/photo-1612970366373-918a36e4c53e?w=800&q=80', category: 'nature' },
  { id: 'valley-kings', name: 'Valley of the Kings', region: 'Africa', country: 'Egypt', coords: { lat: 25.7402, lng: 32.6014 }, image: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&q=80', category: 'ancient' },
  { id: 'sossusvlei', name: 'Sossusvlei Dunes', region: 'Africa', country: 'Namibia', coords: { lat: -24.7352, lng: 15.2903 }, image: 'https://images.unsplash.com/photo-1509667260028-8ca79f0a64eb?w=800&q=80', category: 'nature' },

  // === OCEANIA (10) ===
  { id: 'sydney-opera', name: 'Sydney Opera House', region: 'Oceania', country: 'Australia', coords: { lat: -33.8568, lng: 151.2153 }, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80', category: 'urban' },
  { id: 'great-barrier', name: 'Great Barrier Reef', region: 'Oceania', country: 'Australia', coords: { lat: -18.2871, lng: 147.6992 }, image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80', category: 'nature' },
  { id: 'uluru', name: 'Uluru', region: 'Oceania', country: 'Australia', coords: { lat: -25.3444, lng: 131.0369 }, image: 'https://images.unsplash.com/photo-1494791368093-85217fbbf8de?w=800&q=80', category: 'sacred' },
  { id: 'milford-sound', name: 'Milford Sound', region: 'Oceania', country: 'New Zealand', coords: { lat: -44.6414, lng: 167.8973 }, image: 'https://images.unsplash.com/photo-1507097634215-e82e6b518529?w=800&q=80', category: 'nature' },
  { id: 'bora-bora', name: 'Bora Bora', region: 'Oceania', country: 'French Polynesia', coords: { lat: -16.5004, lng: -151.7415 }, image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=800&q=80', category: 'nature' },
  { id: 'hobbiton', name: 'Hobbiton', region: 'Oceania', country: 'New Zealand', coords: { lat: -37.8721, lng: 175.6830 }, image: 'https://images.unsplash.com/photo-1533395427226-788cee25cc7b?w=800&q=80', category: 'wonder' },
  { id: 'rotorua', name: 'Rotorua Geysers', region: 'Oceania', country: 'New Zealand', coords: { lat: -38.1368, lng: 176.2497 }, image: 'https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?w=800&q=80', category: 'nature' },
  { id: 'twelve-apostles', name: 'Twelve Apostles', region: 'Oceania', country: 'Australia', coords: { lat: -38.6659, lng: 143.1051 }, image: 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=800&q=80', category: 'nature' },
  { id: 'fiji', name: 'Fiji Islands', region: 'Oceania', country: 'Fiji', coords: { lat: -17.7134, lng: 178.0650 }, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', category: 'nature' },
  { id: 'harbour-bridge', name: 'Sydney Harbour Bridge', region: 'Oceania', country: 'Australia', coords: { lat: -33.8523, lng: 151.2108 }, image: 'https://images.unsplash.com/photo-1524293581917-878a6d017c71?w=800&q=80', category: 'urban' },
];

export const FEATURED_LOCATIONS = LOCATIONS.slice(0, 12);

export const getLocationsByRegion = (region: string) => 
  LOCATIONS.filter(l => l.region === region);

export const getLocationsByCategory = (category: Location['category']) =>
  LOCATIONS.filter(l => l.category === category);
