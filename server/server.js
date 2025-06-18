const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const storyRoutes = require("./routes/storyRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const { cleanupOldAudioFiles } = require("./utils/cleanup");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`CORS blocked request from origin: ${origin}`);
        callback(new Error(`CORS policy: Origin ${origin} not allowed`));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} from ${
      req.get("origin") || "no-origin"
    }`
  );
  next();
});

// Middleware
app.use(express.json());
app.use("/audio", express.static(path.join(__dirname, "public/audio")));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/stories", storyRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Periodic cleanup of old audio files (every 24 hours)
setInterval(cleanupOldAudioFiles, 24 * 60 * 60 * 1000);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`✅ CORS allowed origins: ${allowedOrigins.join(", ")}`);
});
