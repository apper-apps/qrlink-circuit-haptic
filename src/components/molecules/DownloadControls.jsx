import React from "react";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const DownloadControls = ({ 
  onDownload, 
  onCopyToClipboard,
  format = "png",
  onFormatChange,
  size = 512,
  onSizeChange,
  className,
  disabled = false
}) => {
  const formats = [
    { value: "png", label: "PNG" },
    { value: "svg", label: "SVG" }
  ];

  const sizes = [
    { value: 256, label: "256x256" },
    { value: 512, label: "512x512" },
    { value: 1024, label: "1024x1024" },
    { value: 2048, label: "2048x2048" }
  ];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
          <Select value={format} onChange={(e) => onFormatChange?.(e.target.value)}>
            {formats.map(fmt => (
              <option key={fmt.value} value={fmt.value}>{fmt.label}</option>
            ))}
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
          <Select value={size} onChange={(e) => onSizeChange?.(Number(e.target.value))}>
            {sizes.map(sz => (
              <option key={sz.value} value={sz.value}>{sz.label}</option>
            ))}
          </Select>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <Button
          variant="accent"
          className="flex-1"
          onClick={onDownload}
          disabled={disabled}
        >
          <ApperIcon name="Download" className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button
          variant="secondary"
          onClick={onCopyToClipboard}
          disabled={disabled}
        >
          <ApperIcon name="Copy" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default DownloadControls;