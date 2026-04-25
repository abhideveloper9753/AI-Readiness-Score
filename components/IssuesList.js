export default function IssuesList({ issues }) {
  const issueIcons = {
    "HTTPS": "🔒",
    "H1": "📰",
    "meta": "📝",
    "structured": "📊",
    "FAQ": "❓",
    "CORS": "🚫",
    "heading": "📰",
    "description": "📝",
    "data": "📊",
    "viewport": "📱"
  };

  const getSeverity = (index) => {
    if (index === 0) return "high";
    if (index === 1) return "high";
    if (index === 2) return "medium";
    return "low";
  };

  const getSeverityColor = (severity) => {
    if (severity === "high") return "#ef4444";
    if (severity === "medium") return "#f59e0b";
    return "#f97316";
  };

  const getIcon = (issue) => {
    for (const [key, icon] of Object.entries(issueIcons)) {
      if (issue.toLowerCase().includes(key.toLowerCase())) {
        return icon;
      }
    }
    return "⚠️";
  };

  return (
    <div style={{
      marginTop: "50px",
      animation: "slideUp 0.6s ease-out 0.4s both",
      width: "100%",
      maxWidth: "600px"
    }}>
      <h3 style={{
        fontSize: "20px",
        color: "#2d3748",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
        🔍 Issues Found
        <span style={{
          background: "#edf2f7",
          color: "#4a5568",
          borderRadius: "12px",
          padding: "2px 10px",
          fontSize: "14px",
          fontWeight: 600,
          marginLeft: "auto"
        }}>
          {issues.length}/{5}
        </span>
      </h3>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {issues.map((issue, index) => (
          <div
            key={index}
            style={{
              padding: "16px",
              background: "#f7fafc",
              border: `2px solid ${getSeverityColor(getSeverity(index))}20`,
              borderLeft: `4px solid ${getSeverityColor(getSeverity(index))}`,
              borderRadius: "10px",
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              transition: "all 0.3s ease",
              hover: {
                background: "#edf2f7"
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#edf2f7";
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f7fafc";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <span style={{
              fontSize: "24px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px"
            }}>
              {getIcon(issue)}
            </span>
            
            <div style={{ flex: 1 }}>
              <p style={{
                color: "#2d3748",
                lineHeight: "1.6",
                margin: 0,
                fontSize: "15px",
                fontWeight: 500
              }}>
                {issue}
              </p>
            </div>

            <div style={{
              background: getSeverityColor(getSeverity(index)) + "20",
              color: getSeverityColor(getSeverity(index)),
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "700",
              flexShrink: 0
            }}>
              {getSeverity(index).toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations section */}
      <div style={{
        marginTop: "32px",
        padding: "20px",
        background: "#f0fdf4",
        border: "2px solid #86efac",
        borderRadius: "10px"
      }}>
        <h4 style={{
          color: "#166534",
          fontSize: "14px",
          fontWeight: "700",
          margin: "0 0 8px 0"
        }}>
          💡 Next Steps
        </h4>
        <p style={{
          color: "#166534",
          fontSize: "13px",
          lineHeight: "1.5",
          margin: 0
        }}>
          Review the issues above and prioritize based on severity. Start with high-priority items to improve your AI readiness score.
        </p>
      </div>
    </div>
  );
}