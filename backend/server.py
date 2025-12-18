# SiteRadar Backend - Refined Story Generation Engine
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import json

from emergentintegrations.llm.chat import LlmChat, UserMessage, ChatError

app = FastAPI(title="SiteRadar API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY", "sk-emergent-4A1Cd627cB2866cF4C")

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

class ChatMessageModel(BaseModel):
    role: str
    content: str

class GenerateTourRequest(BaseModel):
    location: Location

class ChatRequest(BaseModel):
    messages: List[ChatMessageModel]
    location: Optional[Location] = None
    tour: Optional[Tour] = None

def clean_json_response(text: str) -> str:
    cleaned = text.strip()
    if cleaned.startswith('```json'):
        cleaned = cleaned[7:]
    elif cleaned.startswith('```'):
        cleaned = cleaned[3:]
    if cleaned.endswith('```'):
        cleaned = cleaned[:-3]
    return cleaned.strip()

# Refined Story Generation Prompt
STORY_SYSTEM_PROMPT = '''You are a master storyteller narrating intimate audio tours for discerning travelers. Your voice is that of a cultured, well-traveled woman who has spent decades uncovering the hidden stories of the world's most fascinating places.

YOUR NARRATIVE VOICE:
- Speak as if sharing secrets with a close friend over wine
- Use sensory language that creates vivid mental imagery
- Weave personal anecdotes and local whispers into history
- Balance intellectual depth with emotional resonance
- Your tone is warm, knowing, slightly mysterious—like you hold secrets

STORY ARCHITECTURE:
Each narrative must follow the "Arc of Discovery":
1. THE HOOK: Open with an unexpected detail that challenges assumptions
2. THE TENSION: Reveal a conflict, mystery, or human struggle
3. THE REVELATION: Uncover a truth most visitors never learn
4. THE RESONANCE: Connect the past to universal human experience

WRITING STYLE:
- Short, rhythmic sentences for dramatic effect
- Longer, flowing passages for atmospheric moments
- Use present tense to create immediacy
- Include specific sensory details (the smell of stone, the quality of light)
- Name real people—their dreams, fears, loves

WHAT TO AVOID:
- Wikipedia-style dates and facts without context
- Generic superlatives ("amazing", "beautiful", "incredible")
- Tourist clichés
- Passive voice
- Lists of architectural features without human connection

Respond ONLY with valid JSON matching this schema:
{
  "title": "Evocative cinematic title (5-8 words)",
  "tagline": "Poetic one-line essence",
  "introduction": "90-120 words. Set the scene with sensory immersion. Make listeners feel they've stepped through a portal.",
  "steps": [
    {
      "id": 1,
      "title": "Compelling chapter title",
      "narrative": "120-180 words. A complete mini-story with its own arc. Written for spoken delivery—natural pauses, conversational rhythm.",
      "duration": "2-3 min",
      "highlight": "The one image or sensation to carry away"
    }
  ],
  "tips": ["2-3 insider tips a local friend would share"]
}'''

CHAT_SYSTEM_TEMPLATE = '''You are a sophisticated travel companion—knowledgeable, warm, and genuinely helpful. Think of yourself as that well-connected friend who knows the hidden gems everywhere.

{context}

YOUR PERSONALITY:
- Cultured but not pretentious
- Specific rather than vague
- Share insider knowledge freely
- Acknowledge when you're uncertain
- Keep responses conversational (2-3 short paragraphs max)

RESPONSE STYLE:
- Lead with the most useful insight
- Include one unexpected recommendation when relevant
- End with something actionable'''

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "app": "SiteRadar", "version": "2.0.0"}

@app.post("/api/generate-tour")
async def generate_tour(request: GenerateTourRequest):
    location = request.location
    
    user_prompt = f'''Create an intimate 4-step audio journey for: {location.name}, {location.country}

LOCATION ESSENCE:
- Category: {location.category}
- Coordinates: {location.coords.lat}, {location.coords.lng}

NARRATIVE DIRECTION:
Focus on the untold human stories. Who loved here? Who lost here? What secrets do these stones keep? What would a lifelong local whisper to you that no guidebook contains?

Create a journey that makes the listener feel like a privileged insider, not a tourist.'''

    try:
        chat = LlmChat(
            api_key=EMERGENT_KEY,
            session_id=f"tour_{location.id}",
            system_message=STORY_SYSTEM_PROMPT
        ).with_model("openai", "gpt-4o-mini").with_params(temperature=0.85, max_tokens=2800)
        
        response = await chat.send_message(UserMessage(text=user_prompt))
        cleaned = clean_json_response(response)
        tour_data = json.loads(cleaned)
        
        return tour_data
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse tour: {str(e)}")
    except ChatError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
async def chat_with_assistant(request: ChatRequest):
    context_parts = []
    if request.location:
        context_parts.append(f"Currently exploring: {request.location.name}, {request.location.country}")
    if request.tour:
        context_parts.append(f"Active tour: \"{request.tour.title}\"")
    
    context = "\n".join(context_parts) if context_parts else "General travel assistance"
    system_prompt = CHAT_SYSTEM_TEMPLATE.format(context=context)
    
    initial_messages = [{"role": "system", "content": system_prompt}]
    for msg in request.messages[:-1]:
        initial_messages.append({"role": msg.role, "content": msg.content})
    
    try:
        chat = LlmChat(
            api_key=EMERGENT_KEY,
            session_id=f"chat_{id(request)}",
            system_message=system_prompt,
            initial_messages=initial_messages
        ).with_model("openai", "gpt-4o-mini").with_params(temperature=0.7, max_tokens=400)
        
        last_message = request.messages[-1]
        response = await chat.send_message(UserMessage(text=last_message.content))
        
        return {"response": response}
    except ChatError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
