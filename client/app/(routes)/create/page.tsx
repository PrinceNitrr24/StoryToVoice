"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Loader, Image, FileText } from "lucide-react";
import { storyAPI } from "@/utils/api";


const CreateStoryPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnail_url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const story = await storyAPI.createStory({
        title: formData.title.trim(),
        content: formData.content.trim(),
        thumbnail_url: formData.thumbnail_url.trim() || undefined,
      });

      router.push(`/story/${story.id}`);
    } catch (err) {
      setError("Failed to create story. Please try again.");
      console.error("Error creating story:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordCount = formData.content
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-accent mb-4 animate-slide-up">
          Create Your Story
        </h1>
        <p
          className="text-gray-300 text-lg animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          Write your story and we'll convert it to beautiful audio automatically
        </p>
      </div>

      <div
        className="bg-gray-900 rounded-lg p-8 shadow-lg animate-slide-up border border-gray-800"
        style={{ animationDelay: "0.2s" }}
      >
        {error && (
          <div className="bg-red-900 bg-opacity-50 text-red-200 p-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="flex items-center gap-2 text-accent font-medium mb-2"
            >
              <FileText className="w-5 h-5" />
              Story Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a captivating title for your story..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-accent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200"
              disabled={isSubmitting}
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label
              htmlFor="thumbnail_url"
              className="flex items-center gap-2 text-accent font-medium mb-2"
            >
              <Image className="w-5 h-5" />
              Thumbnail Image URL (Optional)
            </label>
            <input
              type="url"
              id="thumbnail_url"
              name="thumbnail_url"
              value={formData.thumbnail_url}
              onChange={handleInputChange}
              placeholder="https://example.com/your-image.jpg"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-accent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200"
              disabled={isSubmitting}
            />
            <p className="text-sm text-gray-400 mt-1">
              Add an image URL to make your story more visually appealing
            </p>
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="flex items-center gap-2 text-accent font-medium mb-2"
            >
              <BookOpen className="w-5 h-5" />
              Your Story *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Once upon a time..."
              rows={12}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-accent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 resize-vertical"
              disabled={isSubmitting}
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>{wordCount} words</span>
              <span>~{estimatedReadTime} min read</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.title.trim() ||
                !formData.content.trim()
              }
              className="flex-1 bg-secondary text-primary px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Creating Story & Generating Audio...
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5" />
                  Create Story
                </>
              )}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg border-l-4 border-secondary">
          <h3 className="font-semibold text-accent mb-2">What happens next?</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Your story will be saved and assigned a unique ID</li>
            <li>• We'll automatically generate high-quality audio narration</li>
            <li>
              • You'll be redirected to your story page with a shareable link
            </li>
            <li>• Others can read and listen to your story instantly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryPage;
