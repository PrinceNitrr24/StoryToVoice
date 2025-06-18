import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  text = "Loading...",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`animate-spin rounded-full border-2 border-gray-600 border-t-secondary ${sizeClasses[size]}`}
      ></div>
      {text && <p className="mt-4 text-gray-400 animate-pulse">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
