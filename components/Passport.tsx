import React from 'react';
import { Place } from '../types';
import { CloseIcon, BookOpenIcon } from './icons';

interface PassportProps {
  isOpen: boolean;
  onClose: () => void;
  passportPlaces: Place[];
  onSelectPlace: (place: Place) => void;
  onRemovePlace: (placeName: string) => void;
}

const Passport: React.FC<PassportProps> = ({ isOpen, onClose, passportPlaces, onSelectPlace, onRemovePlace }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <BookOpenIcon className="h-6 w-6 text-accent dark:text-blue-400" />
              <h2 className="text-xl font-bold tracking-tight">My Travel Passport</h2>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Close passport">
              <CloseIcon className="h-6 w-6" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4">
            {passportPlaces.length === 0 ? (
              <div className="text-center text-secondary dark:text-gray-400 h-full flex flex-col items-center justify-center">
                <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full mb-4">
                    <BookOpenIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="font-semibold text-lg text-primary dark:text-white">Your Passport is Empty</h3>
                <p className="mt-1 max-w-xs">Save generated tours using the bookmark icon to add them here.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {passportPlaces.map((place) => (
                  <li key={place.name} className="bg-surface dark:bg-gray-700/50 p-3 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <button onClick={() => onSelectPlace(place)} className="flex items-center gap-4 text-left flex-1">
                      <img src={place.image} alt={place.name} className="h-14 w-14 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold">{place.name}</p>
                        <p className="text-sm text-secondary dark:text-gray-400">{place.location}</p>
                      </div>
                    </button>
                    <button 
                      onClick={() => onRemovePlace(place.name)}
                      className="ml-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${place.name} from passport`}
                    >
                      <CloseIcon className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Passport;