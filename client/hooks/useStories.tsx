import { useState, useEffect } from "react";
import { Story } from "../types";
import { storyAPI } from "@/utils/api";

export const useStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const data = await storyAPI.getStories();
      setStories(data);
      setError(null);
    } catch (err) {
      setError("Failed to load stories");
      console.error("Error fetching stories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return {
    stories,
    loading,
    error,
    refreshStories: fetchStories,
  };
};

export const useStory = (id: string) => {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const data = await storyAPI.getStory(id);
        setStory(data);
        setError(null);
      } catch (err) {
        setError("Story not found");
        console.error("Error fetching story:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStory();
    }
  }, [id]);

  return { story, loading, error };
};
