# Devaans Patwari — Portfolio

Interactive portfolio website featuring 3D graphics, GSAP card animations, and a contact form backed by a Node.js API.

## Tech Stack

### Frontend (`/frontend`)
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (neon/dark theme)
- **3D Graphics**: Three.js via React Three Fiber + Drei
- **Animations**: Framer Motion, GSAP (card swap)
- **Deployment**: Vercel

### Node.js Backend (`/backend-node`)
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Security**: Helmet, CORS, rate limiting
- **Purpose**: Contact form storage, health check API

### Python Backend (`/backend-python`)
- **Framework**: FastAPI
- **AI Models**: HuggingFace Transformers (`google/flan-t5-small`)
- **Purpose**: AI-powered chat responses and project summaries

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Python 3.10+ (for the AI backend)

### Frontend
```bash
cd frontend
cp .env.example .env    # configure VITE_API_URL
npm install
npm run dev
```
Open `http://localhost:5173`

### Node.js Backend
```bash
cd backend-node
cp .env.example .env    # set MONGO_URI
npm install
npm run dev
```
Runs at `http://localhost:5000`

### Python Backend
```bash
cd backend-python
python -m venv venv && source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```
Runs at `http://127.0.0.1:8000`

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ui/           # Reusable UI primitives (CopyButton)
│   │   │   ├── Navbar.jsx    # Responsive nav with mobile menu
│   │   │   ├── Hero.jsx      # 3D hero with particle background
│   │   │   ├── About.jsx     # Bio & skills
│   │   │   ├── Projects.jsx  # Project section wrapper
│   │   │   ├── CardSwapProjects.jsx  # Animated card stack
│   │   │   ├── Certifications.jsx    # Cert grid with copy-to-clipboard
│   │   │   ├── Contact.jsx   # Contact form (wired to backend)
│   │   │   ├── Footer.jsx    # Footer with social links
│   │   │   └── ThreeCanvas.jsx       # R3F 3D background
│   │   ├── data/             # Static data (projects, certs, personal info)
│   │   └── utils/            # Utility functions (clipboard)
│   └── index.html
├── backend-node/
│   ├── src/
│   │   ├── config.js         # Environment configuration
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # Express route handlers
│   │   └── middleware/       # Error handling
│   └── index.js              # Server entry point
└── backend-python/
    └── main.py               # FastAPI AI endpoints
```

## Achievements
- **Google Cloud Skill Badge**: Engineer AI Agents with Agent Development Kit (ADK)
- **Top 3 at Regalia 2026**: National Level Hackathon (Project ANONYMI)
- **Top 15 at MEGA HACKATHON 2026**: (Project UnitySOS)

---
*Built by [Devaans Patwari](https://github.com/Devaans-10)*
