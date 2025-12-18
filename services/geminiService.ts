
import { GoogleGenAI, GenerateContentResponse, Chat, Type } from "@google/genai";
import { TourGuide, Place, ChatMessage, GeolocationCoordinates, GroundingSource } from "../types";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const tourSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    intro_script: { type: Type.STRING },
    tour_steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          script: { type: Type.STRING },
          location_description: { type: Type.STRING },
        },
        required: ['title', 'script', 'location_description'],
      },
    },
  },
  required: ['title', 'intro_script', 'tour_steps'],
};

export const generateTourGuide = async (place: Place, location: GeolocationCoordinates): Promise<{guide: TourGuide, grounding: GroundingSource[]}> => {
  const model = 'gemini-3-flash-preview'; 
  
  const promptPlaceName = place.name === 'My Current Location' ? `the area around me` : `${place.name}, ${place.location}`;
  const prompt = `You are a world-class storyteller and travel historian. Create an immersive, 4-step walking audio tour for ${promptPlaceName}.
  User Coordinates: Lat ${location.latitude}, Lon ${location.longitude}.

  GUIDELINES:
  - THEME: Focus on "Human Conflict" or "Architectural Triumph." Avoid dry lists of dates.
  - TONE: Warm, expert, and slightly mysterious.
  - STRUCTURE: Each step must be walkable. The intro should set the emotional stage.
  - LENGTH: Intro ~80 words. Each step ~120 words.
  - PERSPECTIVE: Mention non-mainstream or indigenous history where applicable.`;

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: tourSchema,
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: location.latitude,
            longitude: location.longitude,
          }
        }
      }
    },
  });

  const guide: TourGuide = JSON.parse(response.text);

  const groundingData = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const grounding: GroundingSource[] = groundingData
    .filter(chunk => chunk.maps)
    .map(chunk => ({
      uri: chunk.maps.uri,
      title: chunk.maps.title
    }));

  return { guide, grounding };
};

export const generateAudio = async (text: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Say as a professional, warm storyteller: ${text}` }] }],
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
      },
    },
  });
  
  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("Audio generation failed.");
  return base64Audio;
};

export const chatWithBot = async (history: ChatMessage[], tourContext?: string): Promise<string> => {
    const model = 'gemini-3-flash-preview';
    const lastUserMessage = history[history.length - 1].text;
    
    const systemInstruction = `You are the NomadGuide Travel Assistant. 
    ${tourContext ? `CURRENT CONTEXT: The user is listening to this tour: ${tourContext}.` : "The user is exploring the world."}
    
    RULES:
    - Be conversational and expert. 
    - If the user asks about something nearby, use Google Search to find current info (prices, hours, etc).
    - Maintain the "Storyteller" persona. No robotic responses.`;

    const response = await ai.models.generateContent({
      model,
      contents: lastUserMessage,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }] 
      }
    });

    return response.text;
};
