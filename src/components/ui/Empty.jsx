import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  className, 
  title = "No data yet", 
  message = "Get started by creating your first item",
  action,
  actionLabel = "Get Started",
  icon = "Package"
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="card max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
            <ApperIcon name={icon} className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600">{message}</p>
          </div>
          {action && (
            <button
              onClick={action}
              className="btn-primary flex items-center space-x-2"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span>{actionLabel}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Empty;