import React, { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import QRCode from "qrcode";

const QRPreview = ({ 
  content, 
  size = 256, 
  margin = 4,
  errorCorrectionLevel = "M",
  className,
  onGenerated
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!content || !canvasRef.current) return;

const generateQR = async () => {
      try {
        await QRCode.toCanvas(canvasRef.current, content, {
          width: size,
          margin: margin,
          errorCorrectionLevel: errorCorrectionLevel,
          color: {
            dark: "#003791", // PlayStation Blue
            light: "#000000"  // Black background
          }
        });
        onGenerated?.(canvasRef.current);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQR();
  }, [content, size, margin, errorCorrectionLevel, onGenerated]);

  return (
    <div className={cn("flex justify-center", className)}>
      <canvas
        ref={canvasRef}
        className="qr-canvas rounded-lg shadow-sm animate-qr-generate"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};

export default QRPreview;