StoryTeller App
StoryTeller is a web application for creating, viewing, and listening to stories with AI-generated audio narrations. The frontend, built with Next.js 14 app router, offers a user-friendly interface for browsing stories and playing audio. The backend, powered by Express.js, MongoDB, and ElevenLabs Text-to-Speech (TTS), handles story storage and audio generation.

Features
Story Creation: Submit a title, content, and optional thumbnail to create a story with an audio narration.
Story Viewing: Read stories, view thumbnails, and play narrations via an audio player.
Sharing: Share story links using the Web Share API or copy to clipboard.
Responsive UI: Built with Tailwind CSS for a modern, mobile-friendly experience.
Tech Stack
Frontend: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Lucide React Icons
Backend: Express.js, MongoDB (Mongoose), ElevenLabs TTS API, Node.js
Dependencies: Axios, CORS, Node-Fetch, Mongoose, UUID
Prerequisites
Node.js: v18 or higher
MongoDB: Local instance ( mongodb://localhost:27017) and MongoDB Atlas(for production)
ElevenLabs API Key: Obtain from ElevenLabs
Git: For cloning the repository

Project Structure
storyteller/
├── my-story-app/               # Frontend (Next.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── story/[id]/     # Story page (page.tsx)
│   │   │   ├── create/         # Story creation page
│   │   │   ├── globals.css     # Tailwind styles
│   │   ├── components/
│   │   │   ├── AudioPlayer.tsx # Audio player for narrations
│   │   │   ├── LoadingSpinner.tsx
│   │   ├── hooks/
│   │   │   ├── useStories.ts   # Fetch stories via API
│   │   ├── types/
│   │   │   ├── index.ts        # TypeScript interfaces (Story, CreateStoryRequest)
│   │   ├── utils/
│   │   │   ├── api.ts          # API client and getAudioUrl
│   ├── package.json
│   ├── tailwind.config.js
├── server/                     # Backend (Express)
│   ├── public/audio/           # Stores .mp3 files (e.g., <uuid>.mp3)
│   ├── controllers/
│   │   ├── storyController.js  # Story CRUD logic
│   ├── models/
│   │   ├── Story.js           # Mongoose schema
│   ├── services/
│   │   ├── ttsService.js       # ElevenLabs TTS integration
│   ├── app.js                  # Express server
│   ├── .env                    # Environment variables
│   ├── package.json
Setup Instructions
1. Clone the Repository
bash
Copy
git clone [https://github.com/your-username/storyteller.git](https://github.com/PrinceNitrr24/StoryToVoice)
cd storytToVoice
2. Configure the Backend
Navigate to the server:
cd server then npm install

