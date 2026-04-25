"use client";

import { useState } from "react";

export default function UrlForm({ onSubmit, loading }) {
  const [url, setUrl] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

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

  const handleClear = () => {
    setUrl("");
    setValidationError("");
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        marginBottom: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <div style={{
        marginBottom: "16px",
        width: "100%",
        maxWidth: "600px"
      }}>
        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "600",
          color: "#2d3748",
          marginBottom: "8px",
          textAlign: "center"
        }}>
          Website URL <span style={{ color: "#e53e3e" }}>*</span>
        </label>
        
        <div style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%"
        }}>
          <span style={{
            position: "absolute",
            left: "14px",
            fontSize: "18px",
            color: isFocused ? "#667eea" : "#cbd5e0",
            transition: "color 0.3s ease"
          }}>
            🌐
          </span>
          
          <input
            type="text"
            placeholder="example.com or https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setValidationError("");
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={loading}
            style={{
              paddingLeft: "44px",
              paddingRight: url ? "44px" : "16px",
              opacity: loading ? 0.6 : 1,
              transition: "all 0.3s ease",
              borderColor: validationError ? "#fed7d7" : isFocused ? "#667eea" : "#e2e8f0",
              width: "100%"
            }}
          />
          
          {url && !loading && (
            <button
              type="button"
              onClick={handleClear}
              style={{
                position: "absolute",
                right: "12px",
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                padding: "4px 8px",
                color: "#cbd5e0",
                transition: "color 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.color = "#a0aec0"}
              onMouseLeave={(e) => e.target.style.color = "#cbd5e0"}
              title="Clear input"
            >
              ✕
            </button>
          )}
        </div>

        {validationError && (
          <p style={{
            color: "#e53e3e",
            fontSize: "14px",
            margin: "10px 0 0 0",
            fontWeight: 500,
            animation: "slideUp 0.3s ease-out",
            textAlign: "center"
          }}>
            ⚠️ {validationError}
          </p>
        )}

        {url && !validationError && (
          <p style={{
            color: "#48bb78",
            fontSize: "13px",
            margin: "8px 0 0 0",
            fontWeight: 500,
            textAlign: "center"
          }}>
            ✓ URL looks good
          </p>
        )}

        <p style={{
          color: "#a0aec0",
          fontSize: "12px",
          margin: "8px 0 0 0",
          textAlign: "center"
        }}>
          e.g., www.example.com, example.com, or https://example.com
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          opacity: loading ? 0.65 : 1,
          pointerEvents: loading ? "none" : "auto",
          maxWidth: "600px",
          width: "100%"
        }}
      >
        {loading ? "🔍 Analyzing..." : "Start Audit"}
      </button>
    </form>
  );
}