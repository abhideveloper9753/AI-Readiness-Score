export default function ScoreCard({ score }) {
  const getScoreColor = () => {
    if (score >= 80) return "#10b981"; // green
    if (score >= 60) return "#f59e0b"; // amber
    if (score >= 40) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  const getScoreEmoji = () => {
    if (score >= 80) return "🚀";
    if (score >= 60) return "✅";
    if (score >= 40) return "⚠️";
    return "❌";
  };

  const scoreColor = getScoreColor();

  return (
    <div
      style={{
        marginTop: "40px",
        padding: "30px",
        border: `3px solid ${scoreColor}`,
        borderRadius: "12px",
        background: `${scoreColor}15`,
        textAlign: "center"
      }}
    >
      <div style={{ fontSize: "48px", marginBottom: "12px" }}>
        {getScoreEmoji()}
      </div>
      <h2 style={{ fontSize: "24px", color: "#333", margin: "0 0 8px 0" }}>
        AI Readiness Score
      </h2>
      <div
        style={{
          fontSize: "56px",
          fontWeight: "700",
          color: scoreColor,
          margin: "10px 0"
        }}
      >
        {score}/100
      </div>
      <p style={{ fontSize: "18px", color: scoreColor, fontWeight: "600", margin: "8px 0 0 0" }}>
        {getScoreLabel()}
      </p>
    </div>
  );
}