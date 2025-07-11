import React from "react";
import { cn } from "@/utils/cn";

const Slider = React.forwardRef(({ 
  className, 
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  onChange,
  ...props 
}, ref) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("relative", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #0066FF 0%, #0066FF ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
        }}
        ref={ref}
        {...props}
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0066FF;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0066FF;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
});

Slider.displayName = "Slider";

export default Slider;