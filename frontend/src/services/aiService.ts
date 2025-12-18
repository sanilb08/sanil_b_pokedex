// SiteRadar - AI Service (calls backend API)

import { Tour, Location, ChatMessage } from '../types';

const BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || '';

export const generateTour = async (location: Location): Promise<Tour> => {
  const response = await fetch(`${BACKEND_URL}/api/generate-tour`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ location }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to generate tour: ${err}`);
  }

  return response.json();
};

export const chatWithAssistant = async (
  messages: ChatMessage[],
  currentLocation?: Location,
  currentTour?: Tour
): Promise<string> => {
  const response = await fetch(`${BACKEND_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      location: currentLocation || null,
      tour: currentTour || null,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Chat failed: ${err}`);
  }

  const data = await response.json();
  return data.response;
};
