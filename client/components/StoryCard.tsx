"use client";

import React from "react";
import Link from "next/link";
import { Clock, Play } from "lucide-react";
import { Story } from "@/types";

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateContent = (
    content: string | undefined,
    maxLength: number = 150
  ) => {
    if (!content) return "No content available...";
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-gray-800">
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-800 relative overflow-hidden">
        {story.thumbnail_url ? (
          <img
            src={story.thumbnail_url}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <Play className="w-12 h-12 text-secondary opacity-70" />
          </div>
        )}
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-secondary text-primary rounded-full p-3">
            <Play className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-accent mb-2 line-clamp-2 hover:text-secondary transition-colors">
          {story.title}
        </h3>

        <p className="text-gray-300 mb-4 line-clamp-3">
          {truncateContent(story.content)}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formatDate(story.created_at)}
          </div>
        </div>

        <Link
          href={`/story/${story.id}`}
          className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 hover:scale-105"
        >
          <Play className="w-4 h-4" />
          Listen & Read
        </Link>
      </div>
    </div>
  );
};

export default StoryCard;
