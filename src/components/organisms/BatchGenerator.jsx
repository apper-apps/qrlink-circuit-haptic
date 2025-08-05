import React, { useState } from "react";
import { cn } from "@/utils/cn";
import BatchInput from "@/components/molecules/BatchInput";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";
import QRCode from "qrcode";
import JSZip from "jszip";

const BatchGenerator = ({ className }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleBatchGenerate = async (urls) => {
    setIsGenerating(true);
    
    try {
      const zip = new JSZip();
      const qrFolder = zip.folder("qr-codes");
      
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const canvas = document.createElement("canvas");
        
        await QRCode.toCanvas(canvas, url, {
          width: 512,
          margin: 4,
          errorCorrectionLevel: "M",
color: {
            dark: "#003791", // PlayStation Blue
            light: "#000000"  // Black background
          }
        });
        const dataURL = canvas.toDataURL("image/png");
        const base64Data = dataURL.replace(/^data:image\/png;base64,/, "");
        
        const filename = `qr-${i + 1}-${Date.now()}.png`;
        qrFolder.file(filename, base64Data, { base64: true });
      }
      
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-codes-batch-${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success(`${urls.length} QR codes generated and downloaded!`);
    } catch (error) {
      console.error("Batch generation error:", error);
      toast.error("Failed to generate batch QR codes");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="card-elevated">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Layers" className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900">Batch Generator</h2>
          </div>
          
          <p className="text-gray-600">
            Generate multiple QR codes at once and download them as a ZIP file. 
            Perfect for bulk operations and batch processing.
          </p>
          
          <BatchInput
            onBatchGenerate={handleBatchGenerate}
            maxItems={5}
          />
          
          {isGenerating && (
            <div className="flex items-center justify-center p-8">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="text-gray-600">Generating QR codes...</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="card bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Info" className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Batch Generation Tips</h3>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>• You can generate up to 5 QR codes at once</li>
              <li>• All codes will be saved as high-quality PNG files</li>
              <li>• Files are automatically named and organized in a ZIP archive</li>
              <li>• Perfect for events, marketing campaigns, or bulk URL sharing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchGenerator;