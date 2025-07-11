import { useState } from "react";
import { qrService } from "@/services/api/qrService";

export const useQRGenerator = () => {
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQR = async (content, options = {}) => {
    if (!qrService.validateContent(content)) {
      setError("Please enter valid content");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await qrService.generateQR(content, options);
      setQrData(result);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateSVG = async (content, options = {}) => {
    if (!qrService.validateContent(content)) {
      setError("Please enter valid content");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await qrService.generateSVG(content, options);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateBatch = async (urls, options = {}) => {
    const validUrls = urls.filter(url => qrService.validateContent(url));
    
    if (validUrls.length === 0) {
      setError("Please enter at least one valid URL");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await qrService.generateBatch(validUrls, options);
      return results;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const reset = () => {
    setQrData(null);
    setError(null);
    setLoading(false);
  };

  return {
    qrData,
    loading,
    error,
    generateQR,
    generateSVG,
    generateBatch,
    clearError,
    reset
  };
};