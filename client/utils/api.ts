import axios from "axios";
import { Story, CreateStoryRequest } from "../types";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const storyAPI = {
  getStories: async (): Promise<Story[]> => {
    const response = await api.get("/stories");
    return response.data;
  },

  getStory: async (id: string): Promise<Story> => {
    const response = await api.get(`/stories/${id}`);
    return response.data;
  },

  createStory: async (story: CreateStoryRequest): Promise<Story> => {
    const response = await api.post("/stories", story);
    return response.data;
  },
};

export const getAudioUrl = (audioFile: string | undefined): string => {
  if (!audioFile) {
    console.warn("No audio file provided to getAudioUrl");
    return "";
  }
  // Remove any leading /audio/ or ensure it's just the filename
  const fileName = audioFile.replace(/^\/audio\//, "").replace(/^audio\//, "");
  const url = `${API_BASE_URL.replace("/api", "")}/audio/${fileName}`;
  console.log("Generated audio URL:", url);
  return url;
};

export default api;
