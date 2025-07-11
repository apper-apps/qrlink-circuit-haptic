import QRCode from "qrcode";

export const qrService = {
  async generateQR(content, options = {}) {
    const defaultOptions = {
      width: 256,
      margin: 4,
      errorCorrectionLevel: "M",
      color: {
        dark: "#000000",
        light: "#FFFFFF"
      },
      ...options
    };

    try {
      // Add small delay for realistic loading
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const canvas = document.createElement("canvas");
      await QRCode.toCanvas(canvas, content, defaultOptions);
      
      return {
        canvas,
        dataURL: canvas.toDataURL("image/png"),
        content,
        options: defaultOptions,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error.message}`);
    }
  },

  async generateSVG(content, options = {}) {
    const defaultOptions = {
      width: 256,
      margin: 4,
      errorCorrectionLevel: "M",
      color: {
        dark: "#000000",
        light: "#FFFFFF"
      },
      ...options
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const svgString = await QRCode.toString(content, {
        type: "svg",
        ...defaultOptions
      });
      
      return {
        svg: svgString,
        content,
        options: defaultOptions,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Failed to generate SVG QR code: ${error.message}`);
    }
  },

  async generateBatch(urls, options = {}) {
    const defaultOptions = {
      width: 512,
      margin: 4,
      errorCorrectionLevel: "M",
      color: {
        dark: "#000000",
        light: "#FFFFFF"
      },
      ...options
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const results = [];
      
      for (const url of urls) {
        const canvas = document.createElement("canvas");
        await QRCode.toCanvas(canvas, url, defaultOptions);
        
        results.push({
          canvas,
          dataURL: canvas.toDataURL("image/png"),
          content: url,
          options: defaultOptions,
          timestamp: new Date().toISOString()
        });
      }
      
      return results;
    } catch (error) {
      throw new Error(`Failed to generate batch QR codes: ${error.message}`);
    }
  },

  validateURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  validateContent(content) {
    return content && content.trim().length > 0;
  }
};