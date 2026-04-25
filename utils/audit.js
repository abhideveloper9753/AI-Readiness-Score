export async function runAudit(url) {
  let score = 100;
  const issues = [];
  let analyzed = false;

  // Normalize URL
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
  
  // HTTPS check
  if (!normalizedUrl.startsWith("https")) {
    score -= 10;
    issues.push("❌ Website is not using HTTPS - security risk");
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(normalizedUrl, { 
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AIReadinessAudit/1.0)'
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const html = await res.text();
    clearTimeout(timeout);
    analyzed = true;

    // Check for H1 tags
    if (!html.includes("<h1") && !html.toUpperCase().includes("<H1")) {
      score -= 15;
      issues.push("Missing <h1> heading - important for SEO and accessibility");
    }

    // Check for meta description
    if (!html.includes('name="description"') && !html.includes("name='description'")) {
      score -= 10;
      issues.push("Missing meta description - reduces search engine visibility");
    }

    // Check for structured data (JSON-LD)
    if (!html.includes("application/ld+json")) {
      score -= 15;
      issues.push("No structured data (JSON-LD) found - AI systems can't parse content");
    }

    // Check for FAQ schema
    if (!html.toLowerCase().includes("faq") && !html.toLowerCase().includes("question")) {
      score -= 10;
      issues.push("No FAQ section detected - missed opportunity for AI training");
    }

    // Check for mobile meta viewport
    if (!html.includes('name="viewport"') && !html.includes("viewport")) {
      score -= 10;
      issues.push("Missing viewport meta tag - poor mobile experience");
    }

  } catch (error) {
    // When CORS or fetch fails
    analyzed = false;
    issues.push("⚠️ Full audit blocked by browser restrictions (CORS)");
    issues.push("Could not verify heading structure");
    issues.push("Could not check meta descriptions");
    issues.push("Could not detect structured data");
    issues.push("Could not analyze page content");
    
    score = 35; // Low score when we can't analyze
  }

  // Ensure we have exactly 4-5 issues
  const finalIssues = issues.slice(0, 5);

  return {
    score: Math.max(score, 0),
    issues: finalIssues,
  };
}