const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const audioDir = path.join(__dirname, "../public/audio");

async function generateAudio(text, filename) {
  const ELEVENLABS_API_KEY =
    process.env.ELEVENLABS_API_KEY ||
    "sk_5bbcefb6cc7d5de05687f11dd353e5da5701673f40b5b2a4";
  const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "Xb7hH8MSUJpSbSDYk0k2";
  const MODEL_ID = "eleven_multilingual_v2";
  const OUTPUT_FORMAT = "mp3_44100_128"; 

  try {
    const audioPath = path.join(audioDir, filename);

    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
      console.log("✅ Audio directory created");
    }

    const response = await fetch(
      `https://api.us.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream?output_format=${OUTPUT_FORMAT}`,
      {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: MODEL_ID,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`ElevenLabs API error: ${errorDetails.detail.message}`);
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
