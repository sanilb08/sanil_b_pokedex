// SiteRadar - Tour Player Component (Refined Minimalist)

import React, { useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { generateTour } from '../services/aiService';
import { useSpeech } from '../hooks/useSpeech';
import { PlayIcon, PauseIcon, StopIcon, BookmarkIcon, BookmarkFilledIcon, MapPinIcon, ChevronRightIcon } from './ui/Icons';

const TourPlayer: React.FC = () => {
  const { state, dispatch } = useApp();
  const { speak, stop, isSpeaking, isPaused, pause, resume, isSupported } = useSpeech();
  const { selectedLocation, currentTour, isGenerating, error, activeStep, passport } = state;

  const isInPassport = selectedLocation && passport.some(p => p.location.id === selectedLocation.id);

  useEffect(() => {
    if (selectedLocation && !currentTour && !isGenerating) {
      dispatch({ type: 'SET_GENERATING', payload: true });
      generateTour(selectedLocation)
        .then(tour => dispatch({ type: 'SET_TOUR', payload: tour }))
        .catch(err => dispatch({ type: 'SET_ERROR', payload: err.message }));
    }
  }, [selectedLocation, currentTour, isGenerating, dispatch]);

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
      <div className="bg-white rounded-xl border border-paper-200 h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-paper-100 rounded-full flex items-center justify-center mb-5">
          <MapPinIcon className="w-8 h-8 text-ink-300" />
        </div>
        <h2 className="font-display text-2xl text-ink-700 mb-2">Begin Your Journey</h2>
        <p className="text-ink-400 text-sm max-w-xs font-body">
          Select a destination to unlock its hidden stories
        </p>
      </div>
    );
  }

  // Loading State
  if (isGenerating) {
    return (
      <div className="bg-white rounded-xl border border-paper-200 h-full flex flex-col items-center justify-center p-8">
        <div className="relative w-12 h-12 mb-5">
          <div className="absolute inset-0 border-2 border-paper-200 rounded-full" />
          <div className="absolute inset-0 border-2 border-gold-500 rounded-full border-t-transparent animate-spin" />
        </div>
        <h3 className="font-display text-xl text-ink-700 mb-1">
          Crafting Your Story
        </h3>
        <p className="text-ink-400 text-sm font-accent italic">
          Discovering {selectedLocation.name}...
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-white rounded-xl border border-red-100 h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">!</span>
        </div>
        <h3 className="font-display text-xl text-red-700 mb-2">Something Went Wrong</h3>
        <p className="text-red-500 text-sm mb-4 max-w-sm">{error}</p>
        <button
          onClick={() => dispatch({ type: 'RESET_TOUR' })}
          className="px-5 py-2 bg-ink-700 text-white rounded-full text-sm font-medium hover:bg-ink-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!currentTour) return null;

  return (
    <div className="bg-white rounded-xl border border-paper-200 h-full flex flex-col overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-44 flex-shrink-0">
        <img
          src={selectedLocation.image}
          alt={selectedLocation.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-gold-400 text-[10px] uppercase tracking-ultra-wide font-medium mb-1">
            {selectedLocation.category}
          </p>
          <h2 className="font-display text-xl text-white leading-tight">
            {currentTour.title}
          </h2>
          <p className="text-white/70 text-xs font-accent italic mt-1">{currentTour.tagline}</p>
        </div>
        {/* Bookmark */}
        <button
          onClick={isInPassport ? handleRemoveFromPassport : handleAddToPassport}
          data-testid="bookmark-btn"
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isInPassport ? 'bg-gold-500 text-white' : 'bg-white/90 text-ink-500 hover:bg-white'
          }`}
        >
          {isInPassport ? <BookmarkFilledIcon className="w-4 h-4" /> : <BookmarkIcon className="w-4 h-4" />}
        </button>
      </div>

      {/* Introduction */}
      <div className="p-4 border-b border-paper-100">
        <p className="text-ink-500 text-sm leading-relaxed font-body">{currentTour.introduction}</p>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {currentTour.steps.map((step, idx) => (
          <div
            key={step.id}
            onClick={() => handlePlayStep(idx)}
            data-testid={`tour-step-${idx}`}
            className={`p-3 rounded-lg cursor-pointer transition-all ${
              activeStep === idx
                ? 'bg-gold-50 border border-gold-200'
                : 'bg-paper-50 border border-transparent hover:border-paper-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                  activeStep === idx ? 'bg-gold-500 text-white' : 'bg-paper-200 text-ink-500'
                }`}
              >
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display text-sm text-ink-700 truncate">{step.title}</h4>
                  <span className="text-[10px] text-ink-400 flex-shrink-0">{step.duration}</span>
                </div>
                <p className="text-ink-400 text-[11px] mt-0.5 font-accent italic">{step.highlight}</p>
                {activeStep === idx && (
                  <p className="text-ink-600 text-sm mt-2 leading-relaxed font-body">{step.narrative}</p>
                )}
              </div>
              <ChevronRightIcon className={`w-4 h-4 text-ink-300 flex-shrink-0 transition-transform ${
                activeStep === idx ? 'rotate-90' : ''
              }`} />
            </div>
          </div>
        ))}
      </div>

      {/* Audio Controls */}
      {isSupported && (
        <div className="p-3 bg-paper-50 border-t border-paper-100">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleStop}
              disabled={!isSpeaking}
              data-testid="stop-btn"
              className="p-2.5 rounded-full bg-paper-200 text-ink-500 hover:bg-paper-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <StopIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleTogglePlay}
              data-testid="play-pause-btn"
              className="p-3.5 rounded-full bg-gold-500 text-white hover:bg-gold-600 transition-colors shadow-sm"
            >
              {isSpeaking && !isPaused ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
            </button>
            <div className="text-[11px] text-ink-400 font-medium">
              {activeStep + 1} / {currentTour.steps.length}
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      {currentTour.tips.length > 0 && (
        <div className="p-3 bg-gold-50/50 border-t border-gold-100">
          <p className="text-[9px] font-medium text-gold-600 uppercase tracking-ultra-wide mb-1.5">Insider Tips</p>
          <ul className="space-y-0.5">
            {currentTour.tips.map((tip, i) => (
              <li key={i} className="text-xs text-gold-700 font-accent">• {tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TourPlayer;
