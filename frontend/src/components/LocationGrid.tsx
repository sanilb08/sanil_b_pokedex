// SiteRadar - Location Grid Component (Refined)

import React, { useState, useMemo } from 'react';
import { Location } from '../types';
import { useApp } from '../context/AppContext';
import { LOCATIONS, FEATURED_LOCATIONS, getLocationsByRegion } from '../constants/locations';
import { SearchIcon, GlobeIcon, SparklesIcon, MapPinIcon } from './ui/Icons';

type TabType = 'featured' | 'explore' | 'search';
type RegionType = 'all' | 'Europe' | 'Asia' | 'Americas' | 'Africa' | 'Oceania';

const LocationCard: React.FC<{ location: Location; onSelect: () => void; isSelected: boolean }> = ({
  location,
  onSelect,
  isSelected,
}) => (
  <button
    onClick={onSelect}
    data-testid={`location-card-${location.id}`}
    className={`relative aspect-[4/3] w-full rounded-lg overflow-hidden group transition-all duration-300 
      ${isSelected ? 'ring-1 ring-gold-500 ring-offset-2 ring-offset-paper-50' : 'hover:shadow-md'}`}
  >
    <img
      src={location.image}
      alt={location.name}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80';
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-2.5 text-white text-left">
      <h3 className="font-display text-sm leading-tight line-clamp-2">{location.name}</h3>
      <div className="flex items-center gap-1 mt-0.5 opacity-80">
        <MapPinIcon className="w-2.5 h-2.5" />
        <span className="text-[10px] font-body">{location.country}</span>
      </div>
    </div>
  </button>
);

const LocationGrid: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<RegionType>('all');

  const handleSelectLocation = (location: Location) => {
    dispatch({ type: 'SELECT_LOCATION', payload: location });
  };

  const filteredLocations = useMemo(() => {
    if (activeTab === 'featured') return FEATURED_LOCATIONS;
    
    let locs = selectedRegion === 'all' ? LOCATIONS : getLocationsByRegion(selectedRegion);
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      locs = locs.filter(
        l => l.name.toLowerCase().includes(q) || l.country.toLowerCase().includes(q)
      );
    }
    
    return locs;
  }, [activeTab, selectedRegion, searchQuery]);

  const regions: RegionType[] = ['all', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania'];

  return (
    <div className="bg-white rounded-xl border border-paper-200 overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-paper-100">
        <div className="flex">
          {[
            { id: 'featured' as TabType, label: 'Featured', icon: <SparklesIcon className="w-3.5 h-3.5" /> },
            { id: 'explore' as TabType, label: 'Explore', icon: <GlobeIcon className="w-3.5 h-3.5" /> },
            { id: 'search' as TabType, label: 'Search', icon: <SearchIcon className="w-3.5 h-3.5" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`tab-${tab.id}`}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors border-b 
                ${activeTab === tab.id 
                  ? 'text-gold-600 border-gold-500 bg-gold-50/50' 
                  : 'text-ink-400 border-transparent hover:text-ink-600'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      {activeTab === 'search' && (
        <div className="p-3 border-b border-paper-100">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              data-testid="location-search"
              className="w-full pl-8 pr-3 py-2 text-sm bg-paper-50 border border-paper-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 placeholder:text-ink-300"
            />
          </div>
        </div>
      )}

      {/* Region Filter */}
      {activeTab === 'explore' && (
        <div className="p-3 border-b border-paper-100">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                data-testid={`region-${region}`}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-full whitespace-nowrap transition-colors 
                  ${selectedRegion === region 
                    ? 'bg-ink-700 text-white' 
                    : 'bg-paper-100 text-ink-500 hover:bg-paper-200'}`}
              >
                {region === 'all' ? 'All' : region}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="p-3 max-h-[60vh] overflow-y-auto">
        {filteredLocations.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5">
            {filteredLocations.map(location => (
              <LocationCard
                key={location.id}
                location={location}
                onSelect={() => handleSelectLocation(location)}
                isSelected={state.selectedLocation?.id === location.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-ink-400 text-sm">No locations found</p>
          </div>
        )}
      </div>

      {/* Count */}
      <div className="px-3 py-2 bg-paper-50 border-t border-paper-100">
        <p className="text-[10px] text-ink-400 text-center font-accent italic">
          {filteredLocations.length} of 100 curated destinations
        </p>
      </div>
    </div>
  );
};

export default LocationGrid;
