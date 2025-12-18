
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Place, TourGuide, ChatMessage, GeolocationCoordinates, GroundingSource } from './types';
import { POPULAR_DESTINATIONS, REGIONAL_DESTINATIONS } from './constants';
import { generateTourGuide, chatWithBot } from './services/geminiService';
import Header from './components/Header';
import PlaceList from './components/PlaceList';
import TourView from './components/TourView';
import ChatBot from './components/ChatBot';
import Passport from './components/Passport';
import useGeolocation from './hooks/useGeolocation';
import { Spinner } from './components/Spinner';

const App: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [tourGuide, setTourGuide] = useState<TourGuide | null>(null);
  const [tourGrounding, setTourGrounding] = useState<GroundingSource[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  
  const [passport, setPassport] = useState<Place[]>([]);
  const [isPassportOpen, setIsPassportOpen] = useState(false);

  const { location, error: locationError, isLoading: isLocationLoading } = useGeolocation();
  const generationControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('travelPassport');
    if (saved) setPassport(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('travelPassport', JSON.stringify(passport));
  }, [passport]);

  const handleSelectPlace = useCallback(async (place: Place) => {
    if (generationControllerRef.current) generationControllerRef.current.abort();
    const controller = new AbortController();
    generationControllerRef.current = controller;

    setSelectedPlace(place);
    setTourGuide(null);
    setTourGrounding([]);
    setError(null);
    setIsGenerating(true);
    setIsPassportOpen(false);

    try {
      const { guide, grounding } = await generateTourGuide(place, location as GeolocationCoordinates);
      if (!controller.signal.aborted) {
        setTourGuide(guide);
        setTourGrounding(grounding);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to generate tour.');
      }
    } finally {
      if (!controller.signal.aborted) setIsGenerating(false);
    }
  }, [location]);

  const handleSendMessage = useCallback(async (message: string) => {
    const userMessage: ChatMessage = { sender: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
    setIsBotTyping(true);

    const tourContext = tourGuide ? `${tourGuide.title}: ${tourGuide.intro_script}` : undefined;

    try {
      const botResponse = await chatWithBot([...chatHistory, userMessage], tourContext);
      setChatHistory(prev => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { sender: 'bot', text: "I'm sorry, I'm having trouble thinking right now." }]);
    } finally {
      setIsBotTyping(false);
    }
  }, [chatHistory, tourGuide]);

  const handleAddToPassport = (place: Place) => {
    if (!passport.find(p => p.name === place.name)) setPassport(prev => [...prev, place]);
  };

  const handleRemoveFromPassport = (placeName: string) => {
    setPassport(prev => prev.filter(p => p.name !== placeName));
  };

  return (
    <div className="min-h-screen bg-background text-primary">
      <Header onTogglePassport={() => setIsPassportOpen(!isPassportOpen)} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4 xl:col-span-3">
            <PlaceList
              popularPlaces={POPULAR_DESTINATIONS}
              regionalData={REGIONAL_DESTINATIONS}
              onSelectPlace={handleSelectPlace}
              onSelectCurrentLocation={() => {}}
              isLocationLoading={isLocationLoading}
              hasLocation={!!location}
              isLoading={isGenerating}
              selectedPlace={selectedPlace}
            />
          </aside>
          <section className="lg:col-span-8 xl:col-span-9 bg-surface rounded-[2rem] shadow-xl p-6 lg:p-10 min-h-[80vh] border border-gray-100">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Spinner className="h-12 w-12" />
                <h3 className="text-2xl font-display font-bold text-accent animate-pulse">Curating your adventure...</h3>
                <p className="text-secondary font-hand">Checking local maps and historical records</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full text-red-500 space-y-4">
                 <h3 className="text-2xl font-display font-bold">Oops! Something went wrong</h3>
                 <p className="font-body max-w-md text-center">{error}</p>
                 <button onClick={() => setError(null)} className="px-6 py-2 bg-accent text-white rounded-full">Try Again</button>
              </div>
            ) : tourGuide && selectedPlace ? (
              <TourView 
                key={selectedPlace.name}
                place={selectedPlace}
                tourGuide={tourGuide} 
                grounding={tourGrounding}
                passport={passport}
                onAddToPassport={handleAddToPassport}
                onRemoveFromPassport={handleRemoveFromPassport}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                 <div className="p-8 bg-muted rounded-full">
                    <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80" alt="Travel" className="h-64 w-64 object-cover rounded-full shadow-2xl ring-8 ring-white" />
                 </div>
                 <div>
                    <h2 className="text-4xl font-display font-extrabold mb-2">Adventure Awaits</h2>
                    <p className="text-secondary max-w-sm font-body text-lg">Choose a landmark to begin your personal AI-guided tour.</p>
                 </div>
              </div>
            )}
          </section>
        </div>
      </main>
      <Passport
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        passportPlaces={passport}
        onSelectPlace={handleSelectPlace}
        onRemovePlace={handleRemoveFromPassport}
      />
      <ChatBot 
        isOpen={isChatBotOpen}
        onToggle={() => setIsChatBotOpen(!isChatBotOpen)}
        messages={chatHistory}
        onSendMessage={handleSendMessage}
        isTyping={isBotTyping}
      />
    </div>
  );
};

export default App;
