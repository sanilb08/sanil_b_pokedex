// SiteRadar - Location Grid Component

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
    className={`relative aspect-[4/3] w-full rounded-xl overflow-hidden group transition-all duration-300 
      ${isSelected ? 'ring-2 ring-amber-500 ring-offset-2 scale-[1.02]' : 'hover:scale-[1.02] hover:shadow-lg'}`}
  >
    <img
      src={location.image}
      alt={location.name}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-left">
      <h3 className="font-display font-bold text-sm leading-tight truncate">{location.name}</h3>
      <div className="flex items-center gap-1 mt-0.5">
        <MapPinIcon className="w-3 h-3 text-amber-400" />
        <span className="text-[10px] text-stone-300 truncate">{location.country}</span>
      </div>
    </div>
    {isSelected && (
      <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
        Selected
      </div>
    )}
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
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-stone-100">
        <div className="flex">
          {[
            { id: 'featured' as TabType, label: 'Featured', icon: <SparklesIcon className="w-4 h-4" /> },
            { id: 'explore' as TabType, label: 'Explore', icon: <GlobeIcon className="w-4 h-4" /> },
            { id: 'search' as TabType, label: 'Search', icon: <SearchIcon className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`tab-${tab.id}`}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors border-b-2 
                ${activeTab === tab.id 
                  ? 'text-amber-600 border-amber-500 bg-amber-50/50' 
                  : 'text-stone-500 border-transparent hover:text-stone-700'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      {activeTab === 'search' && (
        <div className="p-4 border-b border-stone-100">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search 100 locations..."
              data-testid="location-search"
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            />
          </div>
        </div>
      )}

      {/* Region Filter */}
      {activeTab === 'explore' && (
        <div className="p-4 border-b border-stone-100">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                data-testid={`region-${region}`}
                className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors 
                  ${selectedRegion === region 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                {region === 'all' ? 'All Regions' : region}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="p-4 max-h-[60vh] overflow-y-auto">
        {filteredLocations.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
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
          <div className="text-center py-12">
            <p className="text-stone-500 text-sm">No locations found</p>
          </div>
        )}
      </div>

      {/* Count */}
      <div className="px-4 py-2 bg-stone-50 border-t border-stone-100">
        <p className="text-[10px] text-stone-400 font-hand text-center">
          {filteredLocations.length} of 100 curated destinations
        </p>
      </div>
    </div>
  );
};

export default LocationGrid;
