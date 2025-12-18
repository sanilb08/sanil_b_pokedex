# SiteRadar Backend - Minimal API Server
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="SiteRadar API", version="2.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "app": "SiteRadar", "version": "2.0.0"}

@app.get("/api/info")
async def get_info():
    return {
        "name": "SiteRadar",
        "tagline": "AI Travel Explorer",
        "version": "2.0.0",
        "features": [
            "100 curated global destinations",
            "AI-powered narrative tours",
            "Browser-native TTS audio",
            "Contextual travel assistant",
            "Digital passport collection"
        ]
    }
