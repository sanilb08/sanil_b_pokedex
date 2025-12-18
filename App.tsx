// SiteRadar - Main Application

import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import LocationGrid from './components/LocationGrid';
import TourPlayer from './components/TourPlayer';
import ChatPanel from './components/ChatPanel';

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Location Selection */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <LocationGrid />
          </aside>
          
          {/* Tour Player */}
          <section className="lg:col-span-8 xl:col-span-9">
            <TourPlayer />
          </section>
        </div>
      </main>

      {/* Chat Assistant */}
      <ChatPanel />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
