// SiteRadar - Global State Management

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, AppAction, PassportEntry } from '../types';

const initialState: AppState = {
  selectedLocation: null,
  currentTour: null,
  isGenerating: false,
  error: null,
  passport: [],
  chatMessages: [],
  isChatOpen: false,
  activeStep: 0,
  isSpeaking: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SELECT_LOCATION':
      return { ...state, selectedLocation: action.payload, currentTour: null, error: null, activeStep: 0 };
    case 'SET_TOUR':
      return { ...state, currentTour: action.payload, isGenerating: false };
    case 'SET_GENERATING':
      return { ...state, isGenerating: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isGenerating: false };
    case 'ADD_TO_PASSPORT':
      if (state.passport.find(p => p.location.id === action.payload.location.id)) return state;
      return { ...state, passport: [...state.passport, action.payload] };
    case 'REMOVE_FROM_PASSPORT':
      return { ...state, passport: state.passport.filter(p => p.location.id !== action.payload) };
    case 'ADD_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'TOGGLE_CHAT':
      return { ...state, isChatOpen: !state.isChatOpen };
    case 'SET_ACTIVE_STEP':
      return { ...state, activeStep: action.payload };
    case 'SET_SPEAKING':
      return { ...state, isSpeaking: action.payload };
    case 'RESET_TOUR':
      return { ...state, currentTour: null, selectedLocation: null, activeStep: 0 };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist passport to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('siteradar_passport');
    if (saved) {
      try {
        const entries: PassportEntry[] = JSON.parse(saved);
        entries.forEach(entry => dispatch({ type: 'ADD_TO_PASSPORT', payload: entry }));
      } catch (e) {
        console.warn('Failed to load passport');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('siteradar_passport', JSON.stringify(state.passport));
  }, [state.passport]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
