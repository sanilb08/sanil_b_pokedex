
import React, { useState } from 'react';
import { Place, RegionalData, Continent, Country, City } from '../types';
import { SearchIcon, GlobeAltIcon, MapPinIcon, CompassIcon } from './icons';

interface PlaceListProps {
  popularPlaces: Place[];
  regionalData: RegionalData;
  onSelectPlace: (place: Place) => void;
  onSelectCurrentLocation: () => void;
  isLoading: boolean;
  isLocationLoading: boolean;
  hasLocation: boolean;
  selectedPlace: Place | null;
}

const PlaceButton: React.FC<{ place: Place; onSelect: () => void; isSelected: boolean; disabled: boolean; }> = ({ place, onSelect, isSelected, disabled }) => (
    <button
        onClick={onSelect}
        disabled={disabled}
        className={`w-full text-left p-3 rounded-xl flex items-center transition-all duration-200 ease-in-out disabled:opacity-50
        ${isSelected ? 'bg-accent text-white shadow-md' : 'bg-muted hover:bg-gray-100'}`}
    >
        <img src={place.image} alt={place.name} className="h-12 w-12 rounded-lg object-cover mr-4" />
        <div>
            <p className="font-bold font-display">{place.name}</p>
            <p className={`text-xs font-body ${isSelected ? 'text-blue-100' : 'text-secondary'}`}>{place.location}</p>
        </div>
    </button>
);

const PlaceGridItem: React.FC<{ place: Place; onSelect: () => void; isSelected: boolean; disabled: boolean; }> = ({ place, onSelect, isSelected, disabled }) => (
    <button
        onClick={onSelect}
        disabled={disabled}
        className={`relative aspect-square w-full rounded-xl overflow-hidden group transition-all duration-300
        disabled:opacity-60 disabled:cursor-not-allowed
        ${isSelected ? 'ring-4 ring-accent ring-offset-2' : 'hover:scale-[1.02]'}`}
    >
        <img src={place.image} alt={place.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-left">
            <h3 className="font-display font-bold text-sm leading-tight">{place.name}</h3>
            <p className="font-body text-[10px] text-gray-300 uppercase tracking-tighter">{place.location}</p>
        </div>
    </button>
);


const PlaceList: React.FC<PlaceListProps> = ({ popularPlaces, regionalData, onSelectPlace, onSelectCurrentLocation, isLoading, isLocationLoading, hasLocation, selectedPlace }) => {
  const [activeTab, setActiveTab] = useState<'popular' | 'explore' | 'search'>('popular');
  const [customPlace, setCustomPlace] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPlace.trim() && !isLoading) {
      onSelectPlace({ 
          name: customPlace.trim(), 
          location: 'Custom Search', 
          image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=200'
      });
      setCustomPlace('');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'popular':
        return (
          <div className="grid grid-cols-2 gap-3">
            {popularPlaces.map((place) => (
              <PlaceGridItem 
                key={place.name}
                place={place} 
                onSelect={() => onSelectPlace(place)} 
                isSelected={selectedPlace?.name === place.name}
                disabled={isLoading}
              />
            ))}
          </div>
        );
      case 'explore':
        if(selectedCity) {
            return (
                 <div className="space-y-2 animate-in fade-in slide-in-from-right-2 duration-300">
                    <button onClick={() => setSelectedCity(null)} className="text-xs font-hand text-accent mb-2 hover:underline">← Back to Cities</button>
                    {selectedCity.places.map(place => (
                         <PlaceButton 
                            key={place.name}
                            place={place} 
                            onSelect={() => onSelectPlace(place)} 
                            isSelected={selectedPlace?.name === place.name}
                            disabled={isLoading}
                        />
                    ))}
                 </div>
            )
        }
        if(selectedCountry) {
            return (
                 <div className="space-y-1 animate-in fade-in slide-in-from-right-2 duration-300">
                    <button onClick={() => setSelectedCountry(null)} className="text-xs font-hand text-accent mb-2 hover:underline">← Back to Countries</button>
                    {selectedCountry.cities.map(city => (
                        <button key={city.name} onClick={() => setSelectedCity(city)} className="w-full text-left px-4 py-3 rounded-lg font-display text-sm bg-muted hover:bg-gray-100 transition-colors">
                            {city.name}
                        </button>
                    ))}
                 </div>
            )
        }
        if(selectedContinent) {
            return (
                 <div className="space-y-1 animate-in fade-in slide-in-from-right-2 duration-300">
                    <button onClick={() => setSelectedContinent(null)} className="text-xs font-hand text-accent mb-2 hover:underline">← Back to Continents</button>
                    {selectedContinent.countries.map(country => (
                        <button key={country.name} onClick={() => setSelectedCountry(country)} className="w-full text-left px-4 py-3 rounded-lg font-display text-sm bg-muted hover:bg-gray-100 transition-colors">
                            {country.name}
                        </button>
                    ))}
                 </div>
            )
        }
        return (
             <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {regionalData.map(continent => (
                    <button key={continent.name} onClick={() => setSelectedContinent(continent)} className="w-full text-left px-4 py-3 rounded-lg font-display text-sm bg-muted hover:bg-gray-100 transition-colors">
                        {continent.name}
                    </button>
                ))}
             </div>
        )

      case 'search':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <form onSubmit={handleCustomSubmit} className="relative">
              <input
                type="text"
                value={customPlace}
                onChange={(e) => setCustomPlace(e.target.value)}
                placeholder="Name a landmark..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                disabled={isLoading}
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                <SearchIcon className="h-4 w-4 text-gray-400" />
              </div>
            </form>
            <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="flex-shrink mx-4 text-gray-300 text-[10px] font-hand">TRAVELER HINT</span>
                <div className="flex-grow border-t border-gray-100"></div>
            </div>
            <button
                onClick={onSelectCurrentLocation}
                disabled={isLocationLoading || !hasLocation || isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-xl text-white bg-accent hover:bg-accent-hover transition-all disabled:opacity-50"
            >
                <MapPinIcon className="h-4 w-4"/>
                {isLocationLoading ? 'Pinpointing...' : 'Tours Near Me'}
            </button>
          </div>
        );
    }
  };

  const TabButton: React.FC<{tab: 'popular' | 'explore' | 'search', label: string, icon: React.ReactNode}> = ({tab, label, icon}) => (
      <button 
        onClick={() => {
            setActiveTab(tab);
            setSelectedContinent(null);
            setSelectedCountry(null);
            setSelectedCity(null);
        }}
        className={`flex-1 flex flex-col items-center justify-center py-3 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2
        ${activeTab === tab ? 'text-accent border-accent' : 'text-gray-400 border-transparent hover:text-secondary'}`}
    >
        {icon}
        <span className="mt-1 font-body">{label}</span>
    </button>
  );

  return (
    <div className="bg-surface rounded-2xl shadow-sm p-5 flex flex-col h-full border border-gray-100">
      <h2 className="text-lg font-display font-extrabold mb-4 tracking-tight">Traveler's Log</h2>
      <div className="border-b border-gray-100 mb-6">
        <div className="flex -mb-px">
            <TabButton tab="popular" label="Must See" icon={<CompassIcon className="h-4 w-4"/>} />
            <TabButton tab="explore" label="Explore" icon={<GlobeAltIcon className="h-4 w-4"/>} />
            <TabButton tab="search" label="Search" icon={<SearchIcon className="h-4 w-4"/>} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {renderContent()}
      </div>
    </div>
  );
};

export default PlaceList;
