import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  className, 
  message = "Something went wrong", 
  onRetry,
  showRetry = true 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="card-elevated max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Oops! Something went wrong</h3>
            <p className="text-gray-600">{message}</p>
          </div>
          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="btn-primary flex items-center space-x-2"
            >
              <ApperIcon name="RefreshCw" className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Error;