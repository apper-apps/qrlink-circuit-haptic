import React from "react";
import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import Slider from "@/components/atoms/Slider";
import Select from "@/components/atoms/Select";

const CustomizationPanel = ({
  size = 256,
  onSizeChange,
  margin = 4,
  onMarginChange,
  errorCorrection = "M",
  onErrorCorrectionChange,
  className
}) => {
  const errorLevels = [
    { value: "L", label: "Low (~7%)" },
    { value: "M", label: "Medium (~15%)" },
    { value: "Q", label: "Quartile (~25%)" },
    { value: "H", label: "High (~30%)" }
  ];

  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-lg font-semibold text-gray-900">Customization</h3>
      
      <div className="space-y-4">
        <div>
          <Label>QR Code Size: {size}px</Label>
          <Slider
            min={128}
            max={512}
            step={16}
            value={size}
            onChange={onSizeChange}
          />
        </div>
        
        <div>
          <Label>Margin: {margin}</Label>
          <Slider
            min={0}
            max={8}
            step={1}
            value={margin}
            onChange={onMarginChange}
          />
        </div>
        
        <div>
          <Label>Error Correction</Label>
          <Select 
            value={errorCorrection} 
            onChange={(e) => onErrorCorrectionChange?.(e.target.value)}
          >
            {errorLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;