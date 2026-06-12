# Devaans Patwari - AI-Powered Portfolio 🚀

Welcome to the source code for my interactive, AI-driven portfolio! This web application serves as both a showcase of my skills and a playground for experimental technologies, blending immersive 3D graphics with intelligent AI features.

## 🌟 Key Features

- **Immersive 3D Hero Section**: A dynamic welcome screen featuring `@react-three/fiber` particle effects.
- **Gamified Resume**: Interactive drag-and-drop resume interface powered by `dnd-kit`.
- **Skills Radar**: Real-time visualization of my technical stack using Chart.js.
- **Live AI Chatbot & Binary Encoder**: An interactive contact terminal connected to a Python backend.
- **Secret ML Lab (Easter Egg)**: Hidden experimental UI accessible via keyboard shortcuts or voice commands.
- **Voice Navigation**: Built-in Web Speech API allowing hands-free navigation.
- **Real-Time Sticky Notes**: Collaborative space for visitors to leave live notes.

## 🛠 Tech Stack

This project is structured as a monorepo containing three distinct services:

### 1. Frontend (`/frontend`)
- **Framework**: React.js + Vite
- **Styling**: Tailwind CSS v4 (Neon/Dark Theme)
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: Framer Motion
- **Deployment**: Vercel

### 2. Python Backend (`/backend-python`)
- **Framework**: FastAPI
- **AI Models**: HuggingFace Transformers (`google/flan-t5-small`)
- **Purpose**: Powers the AI Chatbot responses and dynamic project summaries.

### 3. Node.js Backend (`/backend-node`)
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Purpose**: Handles contact form storage, sticky note syncing, and API proxying.

## 🚀 Getting Started

To run this project locally on your machine:

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173`

### Node.js Backend
```bash
cd backend-node
npm install
node index.js
```
*Requires a MongoDB instance running locally or via a `.env` URI.*

### Python Backend
```bash
cd backend-python
pip install fastapi uvicorn pydantic transformers torch
uvicorn main:app --reload
```
Runs the AI endpoints at `http://127.0.0.1:8000`.

## 🏆 Featured Achievements
- **Google Cloud Skill Badge**: Engineer AI Agents with Agent Development Kit (ADK)
- **Top 3 at Regalia 2026**: National Level Hackathon (Project ANONYMI)
- **Top 15 at MEGA HACKATHON 2026**: (Project UnitySOS)

---
*Built with ❤️ by [Devaans Patwari](https://github.com/Devaans-10)*
