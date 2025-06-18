"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Plus } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-primary text-accent">
      {/* Header */}
      <header className="bg-primary border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 text-2xl font-bold text-accent hover:text-secondary transition-colors"
            >
              <BookOpen className="w-8 h-8" />
              Story Audio
            </Link>

            <div className="flex items-center gap-6">
              <Link
                href="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive("/")
                    ? "bg-secondary text-primary font-medium"
                    : "text-accent hover:text-secondary hover:bg-gray-900"
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>

              <Link
                href="/create"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive("/create")
                    ? "bg-secondary text-primary font-medium"
                    : "text-accent hover:text-secondary hover:bg-gray-900"
                }`}
              >
                <Plus className="w-4 h-4" />
                Create Story
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Story Audio App. Create, Share, Listen.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
