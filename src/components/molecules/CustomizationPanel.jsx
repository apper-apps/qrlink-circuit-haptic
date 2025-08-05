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
  colorTheme = "playstation",
  onColorThemeChange,
  backgroundColor = "#000000",
  onBackgroundColorChange,
  foregroundColor = "#003791",
  onForegroundColorChange,
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
      <h3 className="text-lg font-semibold text-gray-900">PlayStation QR Customization</h3>
<div className="space-y-6">
        {/* PlayStation Theme Section */}
        <div className="p-4 bg-gradient-to-r from-playstation-black to-playstation-darkgray rounded-lg border border-playstation-blue">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-playstation-blue rounded-full"></div>
              <Label className="text-white font-medium">PlayStation Theme</Label>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onColorThemeChange?.("playstation");
                  onBackgroundColorChange?.("#000000");
                  onForegroundColorChange?.("#003791");
                }}
                className={`p-3 rounded-lg border-2 transition-all ${
                  colorTheme === "playstation" 
                    ? "border-playstation-blue bg-playstation-blue/20" 
                    : "border-gray-600 hover:border-playstation-lightblue"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-playstation-blue rounded"></div>
                  <span className="text-white text-sm">Classic</span>
                </div>
              </button>
              
              <button
                onClick={() => {
                  onColorThemeChange?.("playstation-light");
                  onBackgroundColorChange?.("#1a1a1a");
                  onForegroundColorChange?.("#0070D1");
                }}
                className={`p-3 rounded-lg border-2 transition-all ${
                  colorTheme === "playstation-light" 
                    ? "border-playstation-lightblue bg-playstation-lightblue/20" 
                    : "border-gray-600 hover:border-playstation-lightblue"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-playstation-lightblue rounded"></div>
                  <span className="text-white text-sm">Light</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Size Control */}
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
        
        {/* Margin Control */}
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
        
        {/* Error Correction */}
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

        {/* Advanced Color Controls */}
        <div className="space-y-3">
          <Label>Custom Colors</Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm text-gray-600">Background</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => onBackgroundColorChange?.(e.target.value)}
                  className="w-8 h-8 rounded border"
                />
                <span className="text-sm font-mono">{backgroundColor}</span>
              </div>
            </div>
            <div>
              <Label className="text-sm text-gray-600">QR Code</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={foregroundColor}
                  onChange={(e) => onForegroundColorChange?.(e.target.value)}
                  className="w-8 h-8 rounded border"
                />
                <span className="text-sm font-mono">{foregroundColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;