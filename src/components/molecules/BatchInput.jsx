import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const BatchInput = ({ 
  onBatchGenerate,
  className,
  maxItems = 5
}) => {
  const [urls, setUrls] = useState([""]);
  const [loading, setLoading] = useState(false);

  const addUrl = () => {
    if (urls.length < maxItems) {
      setUrls([...urls, ""]);
    }
  };

  const removeUrl = (index) => {
    if (urls.length > 1) {
      setUrls(urls.filter((_, i) => i !== index));
    }
  };

  const updateUrl = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleGenerate = async () => {
    const validUrls = urls.filter(url => url.trim());
    if (validUrls.length === 0) return;

    setLoading(true);
    try {
      await onBatchGenerate?.(validUrls);
    } finally {
      setLoading(false);
    }
  };

  const validUrls = urls.filter(url => url.trim()).length;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Batch Generation</h3>
        <span className="text-sm text-gray-500">{validUrls}/{maxItems} URLs</span>
      </div>
      
      <div className="space-y-3">
        {urls.map((url, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              placeholder={`URL ${index + 1}`}
              value={url}
              onChange={(e) => updateUrl(index, e.target.value)}
              className="flex-1"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => removeUrl(index)}
              disabled={urls.length === 1}
            >
              <ApperIcon name="X" className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={addUrl}
          disabled={urls.length >= maxItems}
        >
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add URL
        </Button>
        
        <Button
          variant="primary"
          onClick={handleGenerate}
          disabled={validUrls === 0}
          loading={loading}
        >
          <ApperIcon name="Download" className="w-4 h-4 mr-2" />
          Generate All
        </Button>
      </div>
    </div>
  );
};

export default BatchInput;