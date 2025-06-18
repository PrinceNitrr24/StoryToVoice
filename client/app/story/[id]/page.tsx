"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  Share2,
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { useStory } from "@/hooks/useStories";
import AudioPlayer from "@/components/AudioPlayer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getAudioUrl } from "@/utils/api";

const StoryPage: React.FC = () => {
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";
  const { story, loading, error } = useStory(id);
  const [copySuccess, setCopySuccess] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  useEffect(() => {
    if (story) {
      console.log("Story data:", story);
      console.log("Audio file:", story.audio_file);
      console.log(
        "Audio URL:",
        story.audio_file ? getAudioUrl(story.audio_file) : "No audio file"
      );
    }
  }, [story]);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: story?.title,
          text: `Check out this story: ${story?.title}`,
          url,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <LoadingSpinner text="Loading story..." />;
  }

  if (error || !story) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-900 bg-opacity-50 text-red-200 p-6 rounded-lg inline-block mb-6">
          <h2 className="text-2xl font-bold mb-2">Story Not Found</h2>
          <p>{error || "The story you're looking for doesn't exist."}</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-secondary text-primary px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Back Button */}
      <div className="mb-6 animate-slide-up">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Stories
        </Link>
      </div>

      {/* Story Header */}
      <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4 leading-tight">
          {story.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formatDate(story.created_at)}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-1 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors border border-gray-800"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-3 py-1 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors border border-gray-800"
            >
              {copySuccess ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copySuccess ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      {story.thumbnail_url && (
        <div
          className="mb-8 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <img
              src={story.thumbnail_url}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Audio Player */}
      <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        {story.audio_file ? (
          <>
            <AudioPlayer
              audioUrl={getAudioUrl(story.audio_file)}
              title={story.title}
            />
            {audioError && <p className="text-red-500 mt-2">{audioError}</p>}
          </>
        ) : (
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
            <p className="text-red-500">Audio not available for this story</p>
          </div>
        )}
      </div>

      {/* Story Content */}
      <div
        className="bg-gray-900 rounded-lg p-8 shadow-lg animate-slide-up border border-gray-800"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="prose prose-lg prose-invert max-w-none">
          {story.content?.split("\n").map(
            (paragraph, index) =>
              paragraph.trim() && (
                <p
                  key={index}
                  className="text-gray-200 leading-relaxed mb-4 last:mb-0"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {paragraph}
                </p>
              )
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
        style={{ animationDelay: "0.5s" }}
      >
        <Link
          href="/create"
          className="inline-flex items-center gap-2 bg-secondary text-primary px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 hover:scale-105 text-center"
        >
          Create Your Own Story
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border-2 border-secondary text-secondary px-6 py-3 rounded-lg font-medium hover:bg-secondary hover:text-primary transition-all duration-200 hover:scale-105 text-center"
        >
          <ExternalLink className="w-4 h-4" />
          Explore More Stories
        </Link>
      </div>
    </div>
  );
};

export default StoryPage;
