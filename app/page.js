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

  const handleAudit = async (url) => {
    setLoading(true);
    setError(null);
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
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", color: "#333", marginBottom: "8px" }}>AI Readiness Audit</h1>
        <p style={{ fontSize: "16px", color: "#666", margin: 0 }}>
          Analyze how well a website is structured for AI and search engines
        </p>
      </div>

      <UrlForm onSubmit={handleAudit} loading={loading} />

      {loading && (
        <div style={{
          textAlign: "center",
          marginTop: "30px",
          padding: "20px",
          color: "#667eea",
          fontWeight: "600"
        }}>
          🔍 Analyzing website...
        </div>
      )}

      {error && (
        <div style={{
          marginTop: "20px",
          padding: "15px",
          background: "#fee",
          border: "1px solid #f99",
          borderRadius: "8px",
          color: "#c33",
          fontSize: "14px"
        }}>
          {error}
        </div>
      )}

      {result && !loading && (
        <>
          <ScoreCard score={result.score} />
          <IssuesList issues={result.issues} />
        </>
      )}
    </div>
  )
};