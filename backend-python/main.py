import os
import logging
import asyncio
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from transformers import pipeline

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load configuration from environment variables
ALLOWED_ORIGINS_ENV = os.environ.get("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000")
ALLOWED_ORIGINS = [origin.strip() for origin in ALLOWED_ORIGINS_ENV.split(",") if origin.strip()]
MODEL_NAME = os.environ.get("MODEL_NAME", "google/flan-t5-small")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model on startup
    logger.info(f"Loading text generation model: {MODEL_NAME}")
    try:
        # Offload model loading to a thread to prevent blocking the event loop
        generator = await asyncio.to_thread(pipeline, 'text2text-generation', model=MODEL_NAME)
        app.state.generator = generator
        logger.info("Model loaded successfully.")
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
        app.state.generator = None
    
    yield
    
    # Cleanup on shutdown
    logger.info("Shutting down AI Backend...")
    app.state.generator = None

app = FastAPI(
    title='Portfolio AI Backend',
    version='1.0.0',
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=500)

class ProjectSummaryRequest(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    stack: str = Field(..., min_length=1, max_length=200)

def generate_text(generator, prompt: str, max_length: int):
    # Note: Using raw user input in prompts can pose a prompt injection risk.
    # Consider adding input sanitization or using more structured prompting.
    return generator(prompt, max_length=max_length)

@app.get("/")
async def read_root():
    model_loaded = getattr(app.state, "generator", None) is not None
    return {"status": "healthy", "model_loaded": model_loaded}

@app.post("/ai/chat")
async def chat(req: QueryRequest):
    if not getattr(app.state, "generator", None):
        raise HTTPException(status_code=503, detail="Model not loaded or unavailable.")
    
    prompt = f"Answer this question about Devaans: {req.query}"
    
    try:
        response = await asyncio.to_thread(generate_text, app.state.generator, prompt, 50)
        return {"response": response[0]['generated_text']}
    except Exception as e:
        logger.error(f"Inference error during chat: {e}")
        raise HTTPException(status_code=500, detail="An error occurred during text generation.")

@app.post("/ai/summary")
async def summarize(req: ProjectSummaryRequest):
    if not getattr(app.state, "generator", None):
        raise HTTPException(status_code=503, detail="Model not loaded or unavailable.")
    
    prompt = f"Write a one sentence summary of a project named {req.title} built with {req.stack}."
    
    try:
        response = await asyncio.to_thread(generate_text, app.state.generator, prompt, 40)
        return {"summary": response[0]['generated_text']}
    except Exception as e:
        logger.error(f"Inference error during summarization: {e}")
        raise HTTPException(status_code=500, detail="An error occurred during text generation.")
