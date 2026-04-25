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
    <div style={{ marginTop: "40px" }}>
      <h3 style={{ fontSize: "20px", color: "#333", marginBottom: "20px" }}>
        🔍 Issues Found ({issues.length})
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {issues.map((issue, index) => (
          <div
            key={index}
            style={{
              padding: "16px",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px"
            }}
          >
            <span style={{ fontSize: "20px", flexShrink: 0 }}>
              {getIcon(issue)}
            </span>
            <span style={{ color: "#374151", lineHeight: "1.5" }}>
              {issue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}