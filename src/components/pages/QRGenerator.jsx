import React, { useState } from "react";
import { cn } from "@/utils/cn";
import AppHeader from "@/components/organisms/AppHeader";
import QRInputForm from "@/components/organisms/QRInputForm";
import QRDisplay from "@/components/organisms/QRDisplay";
import BatchGenerator from "@/components/organisms/BatchGenerator";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const QRGenerator = () => {
  const [currentQR, setCurrentQR] = useState(null);
  const [activeTab, setActiveTab] = useState("single");

  const handleGenerate = (content, type) => {
    setCurrentQR({ content, type });
  };

  const handleNewQR = () => {
    setCurrentQR(null);
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-playstation-black via-playstation-darkgray to-black">
      <AppHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full">
              <ApperIcon name="Sparkles" className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Free • Unlimited • Permanent</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Generate QR Codes
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Instantly</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create permanent QR codes from any URL or text. No limits, no expiration, 
              unlimited scans forever.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center">
            <div className="card p-2 inline-flex space-x-2">
              <Button
                variant={activeTab === "single" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setActiveTab("single")}
              >
                <ApperIcon name="QrCode" className="w-4 h-4 mr-2" />
                Single QR
              </Button>
              <Button
                variant={activeTab === "batch" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setActiveTab("batch")}
              >
                <ApperIcon name="Layers" className="w-4 h-4 mr-2" />
                Batch Mode
              </Button>
            </div>
          </div>

          {/* Main Content */}
          {activeTab === "single" ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <div className="card-elevated">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Edit3" className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold text-gray-900">Create QR Code</h3>
                    </div>
                    
                    <QRInputForm onGenerate={handleGenerate} />
                    
                    {currentQR && (
                      <div className="border-t pt-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleNewQR}
                          className="w-full"
                        >
                          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                          Create New QR Code
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="card bg-gradient-to-r from-green-50 to-blue-50">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Why choose QRLink Pro?</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="Check" className="w-4 h-4 text-success" />
                        <span className="text-sm text-gray-700">Permanent QR codes that never expire</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="Check" className="w-4 h-4 text-success" />
                        <span className="text-sm text-gray-700">Unlimited scans and usage</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="Check" className="w-4 h-4 text-success" />
                        <span className="text-sm text-gray-700">Multiple download formats (PNG, SVG)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="Check" className="w-4 h-4 text-success" />
                        <span className="text-sm text-gray-700">Batch generation for multiple URLs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div>
                {currentQR ? (
                  <QRDisplay 
                    content={currentQR.content} 
                    type={currentQR.type}
                  />
                ) : (
                  <div className="card-elevated h-full flex items-center justify-center min-h-[500px]">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto">
                        <ApperIcon name="QrCode" className="w-12 h-12 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900">Ready to generate</h3>
                        <p className="text-gray-600">
                          Enter a URL or text to create your QR code
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <BatchGenerator />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QRGenerator;