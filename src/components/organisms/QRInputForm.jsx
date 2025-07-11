import React, { useState } from "react";
import { cn } from "@/utils/cn";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const QRInputForm = ({ 
  onGenerate,
  className,
  initialContent = ""
}) => {
  const [content, setContent] = useState(initialContent);
  const [type, setType] = useState("url");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onGenerate?.(content.trim(), type);
    }
  };

  const handleClear = () => {
    setContent("");
  };

  const isUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const autoDetectType = (value) => {
    if (isUrl(value)) {
      setType("url");
    } else {
      setType("text");
    }
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    setContent(value);
    autoDetectType(value);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="space-y-4">
        <FormField
          label="Enter URL or Text"
          value={content}
          onChange={handleContentChange}
          placeholder="https://example.com or any text"
          className="relative"
        />
        
        {content && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                type === "url" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
              )}>
                {type === "url" ? "URL" : "Text"}
              </div>
              <ApperIcon 
                name={type === "url" ? "Link" : "Type"} 
                className="w-4 h-4 text-gray-500" 
              />
            </div>
            
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleClear}
            >
              <ApperIcon name="X" className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!content.trim()}
      >
        <ApperIcon name="QrCode" className="w-5 h-5 mr-2" />
        Generate QR Code
      </Button>
    </form>
  );
};

export default QRInputForm;