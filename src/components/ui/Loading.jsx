import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, type = "qr" }) => {
  if (type === "qr") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="card-elevated w-full max-w-md">
          <div className="space-y-4">
            <div className="w-64 h-64 bg-gray-200 rounded-lg shimmer mx-auto"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded shimmer"></div>
              <div className="h-4 bg-gray-200 rounded shimmer w-3/4"></div>
            </div>
            <div className="flex space-x-2">
              <div className="h-10 bg-gray-200 rounded shimmer flex-1"></div>
              <div className="h-10 bg-gray-200 rounded shimmer flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
        <div className="w-6 h-6 bg-secondary rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-6 h-6 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  );
};

export default Loading;