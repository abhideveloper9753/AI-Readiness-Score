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
  const scorePercentage = score;

  return (
    <div
      style={{
        marginTop: "50px",
        padding: "40px",
        border: `3px solid ${scoreColor}`,
        borderRadius: "16px",
        background: `${scoreColor}12`,
        textAlign: "center",
        animation: "slideUp 0.6s ease-out 0.2s both",
        width: "100%",
        maxWidth: "600px"
      }}
    >
      <div style={{
        fontSize: "56px",
        marginBottom: "16px",
        animation: "pulse 1s ease-in-out infinite"
      }}>
        {getScoreEmoji()}
      </div>
      
      <h2 style={{
        fontSize: "20px",
        color: "#4a5568",
        margin: "0 0 16px 0",
        fontWeight: 500
      }}>
        AI Readiness Score
      </h2>
      
      <div style={{
        fontSize: "64px",
        fontWeight: "800",
        color: scoreColor,
        margin: "16px 0",
        letterSpacing: "-2px"
      }}>
        {score}/100
      </div>

      <p style={{
        fontSize: "18px",
        color: scoreColor,
        fontWeight: "700",
        margin: "16px 0 20px 0"
      }}>
        {getScoreLabel()}
      </p>

      {/* Progress bar */}
      <div style={{
        background: "#e2e8f0",
        height: "8px",
        borderRadius: "4px",
        overflow: "hidden",
        marginTop: "20px"
      }}>
        <div
          style={{
            height: "100%",
            background: scoreColor,
            width: `${scorePercentage}%`,
            transition: "width 1s ease-out",
            borderRadius: "4px"
          }}
        />
      </div>

      {/* Score breakdown info */}
      <div style={{
        marginTop: "24px",
        display: "flex",
        justifyContent: "space-around",
        fontSize: "13px",
        color: "#718096",
        fontWeight: 500
      }}>
        <div>
          <div style={{ fontSize: "18px", color: scoreColor, fontWeight: 700 }}>5</div>
          <div>Checks Run</div>
        </div>
        <div style={{ borderLeft: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "18px", color: scoreColor, fontWeight: 700 }}>{100 - score}</div>
          <div>Points Lost</div>
        </div>
        <div style={{ borderLeft: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "18px", color: scoreColor, fontWeight: 700 }}>{score}</div>
          <div>Points Gained</div>
        </div>
      </div>
    </div>
  );
}