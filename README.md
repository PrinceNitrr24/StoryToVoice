# 📖 StoryTeller App

StoryTeller is a web application for creating, viewing, and listening to stories with AI-generated audio narrations. The frontend, built with Next.js 14 app router, offers a user-friendly interface for browsing stories and playing audio. The backend, powered by Express.js, MongoDB, and ElevenLabs Text-to-Speech (TTS), handles story storage and audio generation.

---

## ✨ Features

- **Story Creation:** Submit a title, content, and optional thumbnail to create a story with an audio narration.
- **Story Viewing:** Read stories, view thumbnails, and play narrations via an audio player.
- **Sharing:** Share story links using the Web Share API or copy to clipboard.
- **Responsive UI:** Built with Tailwind CSS for a modern, mobile-friendly experience.

---

## 🛠 Tech Stack

| Frontend                           | Backend                      | AI & Other Tools          |
|----------------------------------|------------------------------|--------------------------|
| Next.js 14 (App Router)           | Express.js                   | ElevenLabs TTS API       |
| React + TypeScript                | MongoDB (Mongoose)           | ChatGPT, Grok, ClaudeAI  |
| Tailwind CSS                     | Node.js                      |                          |
| Lucide React Icons               | Axios, CORS, Node-Fetch, UUID|                          |

---

## 📁 Project Structure

storyteller/
├── my-story-app/ # Frontend (Next.js)
│ ├── src/
│ │ ├── app/
│ │ │ ├── story/[id]/ # Story page (page.tsx)
│ │ │ ├── create/ # Story creation page
│ │ │ ├── globals.css # Tailwind styles
│ │ ├── components/
│ │ │ ├── AudioPlayer.tsx # Audio player component
│ │ │ ├── LoadingSpinner.tsx
│ │ ├── hooks/
│ │ │ ├── useStories.ts # Fetch stories via API
│ │ ├── types/
│ │ │ ├── index.ts # TypeScript interfaces
│ │ ├── utils/
│ │ │ ├── api.ts # API client & helpers
│ ├── package.json
│ ├── tailwind.config.js
├── server/ # Backend (Express)
│ ├── public/audio/ # Stored audio files (.mp3)
│ ├── controllers/
│ │ ├── storyController.js # Story CRUD logic
│ ├── models/
│ │ ├── Story.js # Mongoose schema
│ ├── services/
│ │ ├── ttsService.js # ElevenLabs TTS integration
│ ├── app.js # Express server entry point
│ ├── .env # Environment variables
│ ├── package.json

---

## ⚙️ Prerequisites

- **Node.js:** v18 or higher
- **MongoDB:** Local instance (`mongodb://localhost:27017`) or MongoDB Atlas (production)
- **ElevenLabs API Key:** Obtain from [ElevenLabs](https://elevenlabs.io/)
- **Git:** For cloning the repository

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/PrinceNitrr24/StoryToVoice.git
cd StoryToVoice
2. Configure Backend
cd server
npm install
Create a .env file in the server/ directory with the following:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/storyteller
ELEVENLABS_API_KEY=your-elevenlabs-api-key
3. Configure Frontend
4. Run the Application
Run backend:
cd server
npm install
npm run dev
Run frontend:
cd client
npm install
npm run dev
🤖 AI Tools Used
ChatGPT,Grok,ClaudeAI: 
📄 License
MIT License ©Prince Kumar
