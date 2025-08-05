import React, { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import QRPreview from "@/components/molecules/QRPreview";
import DownloadControls from "@/components/molecules/DownloadControls";
import CustomizationPanel from "@/components/molecules/CustomizationPanel";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";
import QRCode from "qrcode";

const QRDisplay = ({ 
  content, 
  type = "url",
  className 
}) => {
const [qrSettings, setQrSettings] = useState({
    size: 256,
    margin: 4,
    errorCorrection: "M",
    colorTheme: "playstation",
    backgroundColor: "#000000",
    foregroundColor: "#003791"
  });
  const [downloadSettings, setDownloadSettings] = useState({
    format: "png",
    size: 512
  });
  const [showCustomization, setShowCustomization] = useState(false);
  const canvasRef = useRef(null);

  const handleDownload = async () => {
    try {
      if (downloadSettings.format === "svg") {
const svgString = await QRCode.toString(content, {
          type: "svg",
          width: downloadSettings.size,
          margin: qrSettings.margin,
          errorCorrectionLevel: qrSettings.errorCorrection,
color: {
            dark: qrSettings.foregroundColor,
            light: qrSettings.backgroundColor
          }
        });
        
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `qr-code-${Date.now()}.svg`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        const canvas = document.createElement("canvas");
        await QRCode.toCanvas(canvas, content, {
          width: downloadSettings.size,
margin: qrSettings.margin,
          errorCorrectionLevel: qrSettings.errorCorrection,
color: {
            dark: qrSettings.foregroundColor,
            light: qrSettings.backgroundColor
          }
        });
        
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `qr-code-${Date.now()}.png`;
        a.click();
      }
      
      toast.success("QR code downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download QR code");
    }
  };

const handleCopyToClipboard = async () => {
    try {
      // Check if clipboard API is available
      if (!navigator.clipboard || !window.ClipboardItem) {
        toast.error("Clipboard functionality not supported in this browser");
        return;
      }

      const canvas = document.createElement("canvas");
      await QRCode.toCanvas(canvas, content, {
        width: 512,
        margin: qrSettings.margin,
        errorCorrectionLevel: qrSettings.errorCorrection,
color: {
          dark: qrSettings.foregroundColor,
          light: qrSettings.backgroundColor
        }
      });
      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast.error("Failed to generate QR code image");
          return;
        }
        
        const item = new window.ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([item]);
        toast.success("QR code copied to clipboard!");
      });
    } catch (error) {
      console.error("Copy error:", error);
      toast.error("Failed to copy QR code");
    }
  };

  const handleQRGenerated = (canvas) => {
    canvasRef.current = canvas;
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="card-elevated">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Your QR Code</h2>
            <div className="flex items-center space-x-2">
              <div className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                type === "url" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
              )}>
                {type === "url" ? "URL" : "Text"}
              </div>
              <ApperIcon 
                name={type === "url" ? "Link" : "Type"} 
                className="w-4 h-4 text-gray-500" 
              />
            </div>
          </div>
          
<QRPreview
            content={content}
            size={qrSettings.size}
            margin={qrSettings.margin}
            errorCorrectionLevel={qrSettings.errorCorrection}
            colorTheme={qrSettings.colorTheme}
            backgroundColor={qrSettings.backgroundColor}
            foregroundColor={qrSettings.foregroundColor}
            onGenerated={handleQRGenerated}
            className="playstation-qr"
          />
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 break-all bg-gray-50 p-3 rounded-lg">
              {content}
            </p>
          </div>
          
          <DownloadControls
            onDownload={handleDownload}
            onCopyToClipboard={handleCopyToClipboard}
            format={downloadSettings.format}
            onFormatChange={(format) => setDownloadSettings(prev => ({ ...prev, format }))}
            size={downloadSettings.size}
            onSizeChange={(size) => setDownloadSettings(prev => ({ ...prev, size }))}
            disabled={!content}
          />
        </div>
      </div>
      
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Customization</h3>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowCustomization(!showCustomization)}
          >
            <ApperIcon 
              name={showCustomization ? "ChevronUp" : "ChevronDown"} 
              className="w-4 h-4 mr-2" 
            />
            {showCustomization ? "Hide" : "Show"}
          </Button>
        </div>
        
        {showCustomization && (
<CustomizationPanel
            size={qrSettings.size}
            onSizeChange={(size) => setQrSettings(prev => ({ ...prev, size }))}
            margin={qrSettings.margin}
            onMarginChange={(margin) => setQrSettings(prev => ({ ...prev, margin }))}
            errorCorrection={qrSettings.errorCorrection}
            onErrorCorrectionChange={(errorCorrection) => setQrSettings(prev => ({ ...prev, errorCorrection }))}
            colorTheme={qrSettings.colorTheme}
            onColorThemeChange={(colorTheme) => setQrSettings(prev => ({ ...prev, colorTheme }))}
            backgroundColor={qrSettings.backgroundColor}
            onBackgroundColorChange={(backgroundColor) => setQrSettings(prev => ({ ...prev, backgroundColor }))}
            foregroundColor={qrSettings.foregroundColor}
            onForegroundColorChange={(foregroundColor) => setQrSettings(prev => ({ ...prev, foregroundColor }))}
          />
        )}
      </div>
    </div>
  );
};

export default QRDisplay;