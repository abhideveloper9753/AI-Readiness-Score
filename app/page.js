"use client";

import { useState } from "react";
import UrlForm from "../components/UrlForm";
import ScoreCard from "../components/ScoreCard";
import IssuesList from "../components/IssuesList";
import { runAudit } from "../utils/audit";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analyzedUrl, setAnalyzedUrl] = useState(null);

  const handleAudit = async (url) => {
    setLoading(true);
    setError(null);
    setAnalyzedUrl(url);

    try {
      const data = await runAudit(url);
      setResult(data);
    } catch (err) {
      setError("Failed to analyze URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* HEADER */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
          width: "100%",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>📊</div>

        <h1 style={{ fontSize: "40px", color: "#1a202c", marginBottom: "12px" }}>
          AI Readiness Audit
        </h1>

        <p style={{ fontSize: "17px", color: "#718096", margin: 0 }}>
          Analyze how well a website is structured for AI systems and search engines
        </p>
      </div>

      {/* FORM */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <UrlForm onSubmit={handleAudit} loading={loading} />
      </div>

      {/* LOADING */}
      {loading && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <div style={{ fontSize: "40px", marginBottom: "10px" }}>🔍</div>
          <p style={{ color: "#667eea", fontWeight: "600" }}>
            Analyzing website...
          </p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#fee2e2",
            border: "1px solid #fca5a5",
            borderRadius: "8px",
            color: "#dc2626",
            maxWidth: "600px",
            margin: "30px auto",
          }}
        >
          ❌ {error}
        </div>
      )}

      {/* RESULT */}
      {result && !loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* URL Display */}
          {analyzedUrl && (
            <div
              style={{
                marginTop: "30px",
                padding: "12px",
                background: "#f0f9ff",
                border: "1px solid #bae6fd",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#0369a1",
                maxWidth: "600px",
                width: "100%",
                textAlign: "center",
              }}
            >
              <strong>Analyzed:</strong>{" "}
              {new URL(analyzedUrl).hostname}
            </div>
          )}

          {/* CENTERED RESULT BOX */}
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              marginTop: "20px",
            }}
          >
            <ScoreCard score={result.score} />
            <IssuesList issues={result.issues} />
          </div>
        </div>
      )}

      {/* DEFAULT MESSAGE */}
      {!loading && !result && !error && (
        <div
          style={{
            marginTop: "60px",
            padding: "40px",
            background: "#edf2f7",
            borderRadius: "12px",
            textAlign: "center",
            color: "#4a5568",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div style={{ fontSize: "36px", marginBottom: "16px" }}>🚀</div>
          <h3>Ready to get started?</h3>
          <p>Enter a website URL above to analyze its AI readiness</p>
        </div>
      )}
    </div>
  );
}