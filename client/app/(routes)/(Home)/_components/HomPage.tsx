"use client";

import React from "react";
import Link from "next/link";
import { Plus, BookOpen, Music } from "lucide-react";
import { useStories } from "@/hooks/useStories";
import StoryCard from "@/components/StoryCard";
import LoadingSpinner from "@/components/LoadingSpinner";

const HomePage: React.FC = () => {
  const { stories, loading, error } = useStories();

  if (loading) {
    return <LoadingSpinner text="Loading stories..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-900 bg-opacity-50 text-red-200 p-4 rounded-lg inline-block">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-16 mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-accent mb-6 animate-slide-up">
          Share Your Stories
        </h1>
        <p
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          Write captivating stories and let our AI convert them to beautiful
          audio experiences. Share with the world and listen to amazing tales
          from other creators.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Link
            href="/create"
            className="inline-flex items-center gap-3 bg-secondary text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Plus className="w-6 h-6" />
            Create Your First Story
          </Link>
          <a
            href="#stories"
            className="inline-flex items-center gap-3 border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-bold text-lg hover:bg-secondary hover:text-primary transition-all duration-200 hover:scale-105"
          >
            <BookOpen className="w-6 h-6" />
            Explore Stories
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div
          className="bg-gray-900 p-6 rounded-lg text-center animate-slide-up border border-gray-800"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="bg-secondary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-accent mb-2">Write Stories</h3>
          <p className="text-gray-300">
            Create engaging short stories with our intuitive writing interface
          </p>
        </div>

        <div
          className="bg-gray-900 p-6 rounded-lg text-center animate-slide-up border border-gray-800"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="bg-secondary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Music className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-accent mb-2">AI Audio</h3>
          <p className="text-gray-300">
            Automatically convert your stories to high-quality audio narration
          </p>
        </div>

        <div
          className="bg-gray-900 p-6 rounded-lg text-center animate-slide-up border border-gray-800"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="bg-secondary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 flex items-center justify-center">🔗</div>
          </div>
          <h3 className="text-xl font-bold text-accent mb-2">Easy Sharing</h3>
          <p className="text-gray-300">
            Share your stories with unique links and engage with the community
          </p>
        </div>
      </div>

      {/* Stories Section */}
      <section id="stories">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-accent">Latest Stories</h2>
          {stories.length > 0 && (
            <Link
              href="/create"
              className="text-secondary hover:text-accent transition-colors font-medium"
            >
              Add yours →
            </Link>
          )}
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-16 bg-gray-900 rounded-lg border border-gray-800">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-4">
              No stories yet
            </h3>
            <p className="text-gray-500 mb-6">
              Be the first to share your story with the world!
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-secondary text-primary px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Create First Story
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div
                key={story.id}
                className="animate-slide-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
