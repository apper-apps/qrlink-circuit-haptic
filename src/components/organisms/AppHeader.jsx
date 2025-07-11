import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const AppHeader = ({ className }) => {
  return (
    <header className={cn("bg-white border-b border-gray-200", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="QrCode" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">QRLink Pro</h1>
              <p className="text-sm text-gray-500">Instant QR Code Generator</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <ApperIcon name="Zap" className="w-4 h-4 text-primary" />
              <span>Unlimited scans</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <ApperIcon name="Shield" className="w-4 h-4 text-success" />
              <span>Permanent codes</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;