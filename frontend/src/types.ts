// SiteRadar - Type Definitions

export interface Location {
  id: string;
  name: string;
  region: string;
  country: string;
  coords: { lat: number; lng: number };
  image: string;
  category: 'ancient' | 'nature' | 'urban' | 'sacred' | 'wonder';
}

export interface TourStep {
  id: number;
  title: string;
  narrative: string;
  duration: string;
  highlight: string;
}

export interface Tour {
  title: string;
  tagline: string;
  introduction: string;
  steps: TourStep[];
  tips: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface PassportEntry {
  location: Location;
  visitedAt: number;
  tourTitle: string;
}

export interface AppState {
  selectedLocation: Location | null;
  currentTour: Tour | null;
  isGenerating: boolean;
  error: string | null;
  passport: PassportEntry[];
  chatMessages: ChatMessage[];
  isChatOpen: boolean;
  activeStep: number;
  isSpeaking: boolean;
}

export type AppAction =
  | { type: 'SELECT_LOCATION'; payload: Location }
  | { type: 'SET_TOUR'; payload: Tour }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_TO_PASSPORT'; payload: PassportEntry }
  | { type: 'REMOVE_FROM_PASSPORT'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'TOGGLE_CHAT' }
  | { type: 'SET_ACTIVE_STEP'; payload: number }
  | { type: 'SET_SPEAKING'; payload: boolean }
  | { type: 'RESET_TOUR' };
