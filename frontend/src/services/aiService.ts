// SiteRadar - AI Service using Emergent LLM Key (OpenAI)

import { Tour, Location, ChatMessage } from '../types';

const EMERGENT_KEY = import.meta.env.EMERGENT_LLM_KEY || process.env.EMERGENT_LLM_KEY;
const BASE_URL = 'https://integrations.emergentagent.com';

const callOpenAI = async (messages: { role: string; content: string }[], maxTokens = 2000): Promise<string> => {
  const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${EMERGENT_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: maxTokens,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`AI request failed: ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

const cleanJsonResponse = (text: string): string => {
  // Remove markdown code blocks if present
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
  else if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  return cleaned.trim();
};

export const generateTour = async (location: Location): Promise<Tour> => {
  const systemPrompt = `You are SiteRadar, a world-class travel historian and storyteller. Create immersive audio tour scripts that focus on HUMAN STORIES - conflict, mystery, triumph, and emotion. Avoid dry Wikipedia-style facts.

Your narratives should:
- Open with an emotional hook that transports the listener
- Focus on the people who built/lived/died here - their struggles and dreams
- Include sensory details (sounds, smells, textures)
- Reveal hidden mysteries or lesser-known tales
- Maintain a warm, expert, slightly mysterious tone

Respond ONLY with valid JSON matching this exact schema:
{
  "title": "Cinematic title with emotional hook",
  "tagline": "One-line poetic summary",
  "introduction": "80-100 word emotional opening that sets the scene",
  "steps": [
    {
      "id": 1,
      "title": "Step title",
      "narrative": "100-150 word immersive narrative",
      "duration": "estimated duration",
      "highlight": "Key visual/sensory highlight"
    }
  ],
  "tips": ["Array of 2-3 traveler insider tips"]
}`;

  const userPrompt = `Create a 4-step walking audio tour for: ${location.name}, ${location.country}

Category: ${location.category}
Coordinates: ${location.coords.lat}, ${location.coords.lng}

Focus on the human drama and emotional resonance of this place. What conflicts shaped it? What mysteries remain unsolved? What triumphs deserve to be remembered?`;

  const response = await callOpenAI([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ], 2500);

  const cleaned = cleanJsonResponse(response);
  
  try {
    return JSON.parse(cleaned) as Tour;
  } catch (e) {
    console.error('JSON parse error:', e, '\nResponse:', cleaned);
    throw new Error('Failed to parse tour data. Please try again.');
  }
};

export const chatWithAssistant = async (
  messages: ChatMessage[],
  currentLocation?: Location,
  currentTour?: Tour
): Promise<string> => {
  const systemPrompt = `You are the SiteRadar Travel Assistant - a knowledgeable, friendly guide who helps travelers explore the world.

${currentLocation ? `CONTEXT: The user is currently exploring ${currentLocation.name} in ${currentLocation.country}.` : ''}
${currentTour ? `CURRENT TOUR: "${currentTour.title}" - ${currentTour.tagline}` : ''}

Guidelines:
- Be conversational and warm, like a knowledgeable local friend
- Provide specific, actionable advice
- Share lesser-known insights when relevant
- Keep responses concise (2-3 paragraphs max)
- If asked about nearby places, suggest authentic local experiences`;

  const chatHistory = messages.map(m => ({
    role: m.role === 'user' ? 'user' : 'assistant',
    content: m.content
  }));

  return await callOpenAI([
    { role: 'system', content: systemPrompt },
    ...chatHistory
  ], 500);
};
