const axios = require("axios");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const audioDir = path.join(__dirname, "../public/audio");
const ELEVENLABS_API_URL =
  "https://api.elevenlabs.io/v1/text-to-speech/9BWtsMINqrJLrRacOk9x";

// Validate environment variables
console.log("API Key:", process.env.ELEVENLABS_API_KEY ? "Loaded" : "Missing");
if (!process.env.ELEVENLABS_API_KEY) {
  throw new Error("ELEVENLABS_API_KEY is not defined in environment variables");
}

// Check if the API key looks valid
const apiKey = process.env.ELEVENLABS_API_KEY.trim();
if (apiKey.length < 10) {
  console.warn("⚠️ API key seems too short, please verify it's correct");
}

const generateAudio = async function (text, filename) {
  try {
    // Input validation
    if (!text || typeof text !== "string" || text.trim() === "") {
      throw new Error("Invalid or empty text provided for audio generation");
    }
    if (
      !filename ||
      typeof filename !== "string" ||
      !filename.endsWith(".mp3")
    ) {
      throw new Error("Invalid or missing filename; must end with .mp3");
    }

    // Ensure audio directory exists
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
      console.log("✅ Audio directory created:", audioDir);
    }

    // Log request details for debugging
    console.log(
      "Sending request to ElevenLabs with text:",
      text.slice(0, 50),
      "..."
    );

    // Make API request to ElevenLabs
    let response;
    try {
      response = await axios({
        method: "POST",
        url: ELEVENLABS_API_URL,
        headers: {
          "xi-api-key": apiKey, // Use trimmed API key
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        data: {
          text: text.trim(),
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        },
        responseType: "stream",
        timeout: 30000, // 30 second timeout
      });
    } catch (apiError) {
      console.error("❌ API Error Details:");
      console.error("Status Code:", apiError.response?.status);
      console.error("Status Text:", apiError.response?.statusText);
      console.error("Headers:", apiError.response?.headers);

      // Try to read error response if it's not a stream
      if (
        apiError.response?.data &&
        typeof apiError.response.data !== "object"
      ) {
        console.error("Response Data:", apiError.response.data);
      }

      // Provide specific error messages based on status code
      if (apiError.response?.status === 401) {
        throw new Error(
          "Authentication failed. Please check your ElevenLabs API key. Make sure it's valid and has the correct permissions."
        );
      } else if (apiError.response?.status === 403) {
        throw new Error(
          "Access forbidden. Your API key may not have permission to use this voice or you may have exceeded your quota."
        );
      } else if (apiError.response?.status === 422) {
        throw new Error(
          "Invalid request data. Check if the voice ID is correct and the text is valid."
        );
      } else {
        throw new Error(
          `API request failed with status ${apiError.response?.status}: ${
            apiError.response?.statusText || apiError.message
          }`
        );
      }
    }

    const filePath = path.join(audioDir, filename);
    const writeStream = fs.createWriteStream(filePath);

    // Pipe the response stream to the file
    await new Promise((resolve, reject) => {
      response.data.pipe(writeStream);

      writeStream.on("finish", () => {
        console.log("✅ Audio generated:", filename);
        resolve();
      });

      writeStream.on("error", (error) => {
        console.error("❌ Write stream error:", error.message);
        // Clean up partial file
        fs.unlink(filePath, () => {});
        reject(new Error(`Failed to write audio file: ${error.message}`));
      });

      response.data.on("error", (error) => {
        console.error("❌ Response stream error:", error.message);
        // Clean up partial file
        fs.unlink(filePath, () => {});
        reject(new Error(`Audio stream failed: ${error.message}`));
      });
    });

    return filePath;
  } catch (error) {
    console.error("❌ Error generating audio:", error.message);
    throw error; // Re-throw the original error instead of wrapping it
  }
};

// Test function to verify API key and voice ID
const testConnection = async function () {
  try {
    const response = await axios({
      method: "GET",
      url: "https://api.elevenlabs.io/v1/voices",
      headers: {
        "xi-api-key": apiKey,
      },
    });

    console.log("✅ API connection successful!");
    console.log("Available voices:", response.data.voices.length);

    // Check if the voice ID exists
    const voiceExists = response.data.voices.some(
      (voice) => voice.voice_id === "9BWtsMINqrJLrRacOk9x"
    );

    if (!voiceExists) {
      console.warn(
        "⚠️ Warning: Voice ID '9BWtsMINqrJLrRacOk9x' not found in your available voices"
      );
      console.log("Available voice IDs:");
      response.data.voices.forEach((voice) => {
        console.log(`- ${voice.name}: ${voice.voice_id}`);
      });
    } else {
      console.log("✅ Voice ID is valid!");
    }

    return true;
  } catch (error) {
    console.error(
      "❌ API connection test failed:",
      error.response?.status,
      error.message
    );
    return false;
  }
};

module.exports = {
  generateAudio,
  testConnection,
};
