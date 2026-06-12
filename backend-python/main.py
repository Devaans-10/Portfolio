from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize a lightweight model for text generation
generator = pipeline('text2text-generation', model='google/flan-t5-small')

class QueryRequest(BaseModel):
    query: str

class ProjectSummaryRequest(BaseModel):
    title: str
    stack: str

@app.get("/")
def read_root():
    return {"message": "AI Backend Running"}

@app.post("/ai/chat")
def chat(req: QueryRequest):
    prompt = f"Answer this question about Devaans: {req.query}"
    response = generator(prompt, max_length=50)
    return {"response": response[0]['generated_text']}

@app.post("/ai/summary")
def summarize(req: ProjectSummaryRequest):
    prompt = f"Write a one sentence summary of a project named {req.title} built with {req.stack}."
    response = generator(prompt, max_length=40)
    return {"summary": response[0]['generated_text']}
