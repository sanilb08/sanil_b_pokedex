// SiteRadar - Tour Player Component

import React, { useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { generateTour } from '../services/aiService';
import { useSpeech } from '../hooks/useSpeech';
import { PlayIcon, PauseIcon, StopIcon, BookmarkIcon, BookmarkFilledIcon, MapPinIcon, SparklesIcon, ChevronRightIcon } from './ui/Icons';

const TourPlayer: React.FC = () => {
  const { state, dispatch } = useApp();
  const { speak, stop, isSpeaking, isPaused, pause, resume, isSupported } = useSpeech();
  const { selectedLocation, currentTour, isGenerating, error, activeStep, passport } = state;

  const isInPassport = selectedLocation && passport.some(p => p.location.id === selectedLocation.id);

  // Generate tour when location selected
  useEffect(() => {
    if (selectedLocation && !currentTour && !isGenerating) {
      dispatch({ type: 'SET_GENERATING', payload: true });
      generateTour(selectedLocation)
        .then(tour => dispatch({ type: 'SET_TOUR', payload: tour }))
        .catch(err => dispatch({ type: 'SET_ERROR', payload: err.message }));
    }
  }, [selectedLocation, currentTour, isGenerating, dispatch]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => stop();
  }, [stop]);

  const handlePlayStep = useCallback((stepIndex: number) => {
    if (!currentTour) return;
    const step = currentTour.steps[stepIndex];
    if (!step) return;

    dispatch({ type: 'SET_ACTIVE_STEP', payload: stepIndex });
    speak(step.narrative);
  }, [currentTour, speak, dispatch]);

  const handleTogglePlay = useCallback(() => {
    if (isSpeaking) {
      if (isPaused) resume();
      else pause();
    } else if (currentTour) {
      handlePlayStep(activeStep);
    }
  }, [isSpeaking, isPaused, pause, resume, currentTour, activeStep, handlePlayStep]);

  const handleStop = useCallback(() => {
    stop();
  }, [stop]);

  const handleAddToPassport = useCallback(() => {
    if (!selectedLocation || !currentTour) return;
    dispatch({
      type: 'ADD_TO_PASSPORT',
      payload: {
        location: selectedLocation,
        visitedAt: Date.now(),
        tourTitle: currentTour.title,
      },
    });
  }, [selectedLocation, currentTour, dispatch]);

  const handleRemoveFromPassport = useCallback(() => {
    if (!selectedLocation) return;
    dispatch({ type: 'REMOVE_FROM_PASSPORT', payload: selectedLocation.id });
  }, [selectedLocation, dispatch]);

  // Empty State
  if (!selectedLocation) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-6">
          <MapPinIcon className="w-10 h-10 text-amber-500" />
        </div>
        <h2 className="font-display text-2xl font-bold text-stone-800 mb-2">Begin Your Journey</h2>
        <p className="text-stone-500 max-w-sm">
          Select a destination from the grid to unlock its hidden stories and secrets.
        </p>
      </div>
    );
  }

  // Loading State
  if (isGenerating) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 h-full flex flex-col items-center justify-center p-8">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 border-4 border-amber-200 rounded-full" />
          <div className="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin" />
        </div>
        <h3 className="font-display text-xl font-bold text-stone-800 mb-1 animate-pulse">
          Crafting Your Story...
        </h3>
        <p className="text-stone-500 text-sm font-hand">
          Discovering hidden tales of {selectedLocation.name}
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-red-100 h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">⚠️</span>
        </div>
        <h3 className="font-display text-xl font-bold text-red-800 mb-2">Something Went Wrong</h3>
        <p className="text-red-600 text-sm mb-4 max-w-sm">{error}</p>
        <button
          onClick={() => dispatch({ type: 'RESET_TOUR' })}
          className="px-6 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Tour Display
  if (!currentTour) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 h-full flex flex-col overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-48 flex-shrink-0">
        <img
          src={selectedLocation.image}
          alt={selectedLocation.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs mb-1">
            <SparklesIcon className="w-3 h-3" />
            <span className="font-hand">{selectedLocation.category}</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white leading-tight">
            {currentTour.title}
          </h2>
          <p className="text-stone-300 text-sm font-hand mt-1">{currentTour.tagline}</p>
        </div>
        {/* Bookmark Button */}
        <button
          onClick={isInPassport ? handleRemoveFromPassport : handleAddToPassport}
          data-testid="bookmark-btn"
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isInPassport ? 'bg-amber-500 text-white' : 'bg-white/90 text-stone-600 hover:bg-white'
          }`}
        >
          {isInPassport ? <BookmarkFilledIcon className="w-5 h-5" /> : <BookmarkIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Introduction */}
      <div className="p-4 border-b border-stone-100">
        <p className="text-stone-600 text-sm leading-relaxed">{currentTour.introduction}</p>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {currentTour.steps.map((step, idx) => (
          <div
            key={step.id}
            onClick={() => handlePlayStep(idx)}
            data-testid={`tour-step-${idx}`}
            className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
              activeStep === idx
                ? 'bg-amber-50 border-amber-300 shadow-md'
                : 'bg-stone-50 border-transparent hover:border-stone-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  activeStep === idx ? 'bg-amber-500 text-white' : 'bg-stone-200 text-stone-600'
                }`}
              >
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display font-bold text-stone-800 truncate">{step.title}</h4>
                  <span className="text-[10px] text-stone-400 flex-shrink-0">{step.duration}</span>
                </div>
                <p className="text-stone-500 text-xs mt-1 font-hand">{step.highlight}</p>
                {activeStep === idx && (
                  <p className="text-stone-600 text-sm mt-2 leading-relaxed">{step.narrative}</p>
                )}
              </div>
              <ChevronRightIcon className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${
                activeStep === idx ? 'rotate-90' : ''
              }`} />
            </div>
          </div>
        ))}
      </div>

      {/* Audio Controls */}
      {isSupported && (
        <div className="p-4 bg-stone-50 border-t border-stone-100">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleStop}
              disabled={!isSpeaking}
              data-testid="stop-btn"
              className="p-3 rounded-full bg-stone-200 text-stone-600 hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <StopIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleTogglePlay}
              data-testid="play-pause-btn"
              className="p-4 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/30"
            >
              {isSpeaking && !isPaused ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
            </button>
            <div className="text-xs text-stone-500">
              Step {activeStep + 1} of {currentTour.steps.length}
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      {currentTour.tips.length > 0 && (
        <div className="p-4 bg-amber-50 border-t border-amber-100">
          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-2">Traveler Tips</p>
          <ul className="space-y-1">
            {currentTour.tips.map((tip, i) => (
              <li key={i} className="text-xs text-amber-800 font-hand">• {tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TourPlayer;
