const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const audioDir = path.join(__dirname, "../public/audio");

async function generateAudio(text, filename) {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  console.log("ELEVENLABS_API_KEY", ELEVENLABS_API_KEY);

  try {
    const audioPath = path.join(audioDir, filename);

    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
      console.log("✅ Audio directory created");
    }

    // ElevenLabs API call
    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/Xb7hH8MSUJpSbSDYk0k2",
      {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    fs.writeFileSync(audioPath, Buffer.from(audioBuffer));
    console.log(`✅ Audio generated: ${filename}`);
    return audioPath;
  } catch (error) {
    console.error("Error generating audio:", error);
    throw new Error("Failed to generate audio");
  }
}

module.exports = { generateAudio };
