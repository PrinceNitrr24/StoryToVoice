"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    console.log("AudioPlayer audioUrl:", audioUrl);
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    const handleError = async (e: Event) => {
      const audio = e.target as HTMLAudioElement;
      let errorMessage = "Unknown error";
      if (audio.error) {
        const { code, message } = audio.error;
        errorMessage = `Code ${code}: ${message}`;
        // Attempt to fetch the audio URL to check network issues
        try {
          const response = await fetch(audioUrl, { method: "HEAD" });
          errorMessage += ` (HTTP ${response.status}: ${response.statusText})`;
        } catch (fetchError: unknown) {
          if (fetchError instanceof Error) {
            errorMessage += ` (Fetch error: ${fetchError.message})`;
          } else {
            errorMessage += ` (Fetch error: Unknown)`;
          }
        }
      }
      setError(`Failed to load audio: ${errorMessage}`);
      setIsPlaying(false);
      console.error(
        "Audio error:",
        audio.error,
        "URL:",
        audioUrl,
        "Message:",
        errorMessage
      );
    };

    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
      setIsPlaying(!isPlaying);
      setError(null);
    } catch (err: unknown) {
      let errorMessage = "Unknown playback error";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(`Playback failed: ${errorMessage}`);
      console.error("Playback error:", err, "URL:", audioUrl);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!audioUrl) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
        <p className="text-red-500">No audio file available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
      <audio ref={audioRef} src={audioUrl} preload="metadata">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-accent truncate mr-4">
          🎵 {title}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-secondary"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="bg-secondary text-primary p-3 rounded-full hover:bg-opacity-90 transition-all duration-200 hover:scale-105 shadow-md"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        <div className="flex-1">
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer slider"
            />
            <div
              className="absolute top-0 left-0 h-2 bg-secondary rounded-lg pointer-events-none transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
