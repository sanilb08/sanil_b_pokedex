# SiteRadar Backend - AI Tour Generation API
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import httpx
import os
import json
import re

app = FastAPI(title="SiteRadar API", version="2.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY", "sk-emergent-4A1Cd627cB2866cF4C")
INTEGRATION_URL = os.environ.get("INTEGRATION_PROXY_URL", "https://integrations.emergentagent.com")

# Pydantic Models
class Coords(BaseModel):
    lat: float
    lng: float

class Location(BaseModel):
    id: str
    name: str
    region: str
    country: str
    coords: Coords
    image: str
    category: str

class TourStep(BaseModel):
    id: int
    title: str
    narrative: str
    duration: str
    highlight: str

class Tour(BaseModel):
    title: str
    tagline: str
    introduction: str
    steps: List[TourStep]
    tips: List[str]

class ChatMessage(BaseModel):
    role: str
    content: str

class GenerateTourRequest(BaseModel):
    location: Location

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    location: Optional[Location] = None
    tour: Optional[Tour] = None

# Helper functions
def clean_json_response(text: str) -> str:
    """Remove markdown code blocks if present"""
    cleaned = text.strip()
    if cleaned.startswith('```json'):
        cleaned = cleaned[7:]
    elif cleaned.startswith('```'):
        cleaned = cleaned[3:]
    if cleaned.endswith('```'):
        cleaned = cleaned[:-3]
    return cleaned.strip()

async def call_openai(messages: list, max_tokens: int = 2000) -> str:
    """Call OpenAI via Emergent integration proxy"""
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            f"{INTEGRATION_URL}/v1/chat/completions",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {EMERGENT_KEY}",
            },
            json={
                "model": "gpt-4o-mini",
                "messages": messages,
                "max_tokens": max_tokens,
                "temperature": 0.8,
            },
        )
        
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=f"AI service error: {response.text}")
        
        data = response.json()
        return data["choices"][0]["message"]["content"]

# Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "app": "SiteRadar", "version": "2.0.0"}

@app.post("/api/generate-tour")
async def generate_tour(request: GenerateTourRequest):
    """Generate an AI-powered tour for a location"""
    location = request.location
    
    system_prompt = """You are SiteRadar, a world-class travel historian and storyteller. Create immersive audio tour scripts that focus on HUMAN STORIES - conflict, mystery, triumph, and emotion. Avoid dry Wikipedia-style facts.

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
}"""

    user_prompt = f"""Create a 4-step walking audio tour for: {location.name}, {location.country}

Category: {location.category}
Coordinates: {location.coords.lat}, {location.coords.lng}

Focus on the human drama and emotional resonance of this place. What conflicts shaped it? What mysteries remain unsolved? What triumphs deserve to be remembered?"""

    try:
        response = await call_openai([
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ], 2500)
        
        cleaned = clean_json_response(response)
        tour_data = json.loads(cleaned)
        
        return tour_data
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse tour data: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
async def chat_with_assistant(request: ChatRequest):
    """Chat with the travel assistant"""
    location_context = ""
    if request.location:
        location_context = f"CONTEXT: The user is currently exploring {request.location.name} in {request.location.country}."
    
    tour_context = ""
    if request.tour:
        tour_context = f'CURRENT TOUR: "{request.tour.title}" - {request.tour.tagline}'
    
    system_prompt = f"""You are the SiteRadar Travel Assistant - a knowledgeable, friendly guide who helps travelers explore the world.

{location_context}
{tour_context}

Guidelines:
- Be conversational and warm, like a knowledgeable local friend
- Provide specific, actionable advice
- Share lesser-known insights when relevant
- Keep responses concise (2-3 paragraphs max)
- If asked about nearby places, suggest authentic local experiences"""

    messages = [{"role": "system", "content": system_prompt}]
    for msg in request.messages:
        messages.append({"role": msg.role, "content": msg.content})
    
    try:
        response = await call_openai(messages, 500)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
