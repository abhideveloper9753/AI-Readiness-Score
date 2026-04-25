"use client";

import { useState } from "react";

export default function UrlForm({ onSubmit, loading }) {
  const [url, setUrl] = useState("");
  const [validationError, setValidationError] = useState("");

  const validateUrl = (urlString) => {
    try {
      const urlObj = new URL(urlString.startsWith('http') ? urlString : `https://${urlString}`);
      return urlObj.href;
    } catch {
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");
    
    if (!url.trim()) {
      setValidationError("Please enter a URL");
      return;
    }

    const validUrl = validateUrl(url);
    if (!validUrl) {
      setValidationError("Invalid URL. Example: example.com or https://example.com");
      return;
    }

    onSubmit(validUrl);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Enter website URL (e.g., example.com)"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setValidationError("");
          }}
          disabled={loading}
          style={{
            opacity: loading ? 0.6 : 1
          }}
        />
        {validationError && (
          <p style={{ color: "#c33", fontSize: "14px", margin: "8px 0 0 0" }}>
            {validationError}
          </p>
        )}
      </div>
      <button type="submit" disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
        {loading ? "Analyzing..." : "Start Audit"}
      </button>
    </form>
  );
}