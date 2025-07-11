export const downloadUtils = {
downloadCanvas(canvas, filename = "qr-code.png") {
    if (!canvas) {
      throw new Error("Canvas element is required");
    }
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

downloadSVG(svgString, filename = "qr-code.svg") {
    if (!svgString) {
      throw new Error("SVG string is required");
    }
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

async copyCanvasToClipboard(canvas) {
    if (!canvas) {
      throw new Error("Canvas element is required");
    }
    
    if (!navigator.clipboard || !window.ClipboardItem) {
      throw new Error("Clipboard API not supported in this browser");
    }
    
    return new Promise((resolve, reject) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          reject(new Error("Failed to create blob from canvas"));
          return;
        }
        
        try {
          const item = new window.ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  },

  generateFilename(prefix = "qr-code", extension = "png") {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    return `${prefix}-${timestamp}.${extension}`;
  }
};