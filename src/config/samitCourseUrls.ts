/**
 * SamIT Technology main site — course detail links for the landing page.
 *
 * Update paths here when pages go live on https://samittechnology.com/
 * - Keys must match `course.id` values in `Courses.tsx`.
 * - Values are pathnames (recommended) or full URLs.
 * - Leading slash is optional; paths are joined with SAMIT_WEBSITE_BASE.
 */
export const SAMIT_WEBSITE_BASE = "https://samittechnology.com";

/**
 * Placeholder pattern: `/courses/<slug>` — replace with real routes when available.
 * Full URLs allowed for microsites or PDFs.
 */
export const COURSE_URL_PATHS: Record<string, string> = {
  // Programming
  "java-oops": "/courses/core-java-programming",
  "python-dev": "/courses/python-programming",
  "dsa-interview": "/courses/data-structures-algorithms",
  "dotnet-core": "/courses/dotnet-development",

  // Web Development
  "full-stack-java": "/courses/full-stack-java",
  "mern-stack": "/courses/mern-stack",
  "react-frontend": "/courses/react-frontend",
  "nodejs-backend": "/courses/nodejs-backend",

  // Data Analytics
  "analytics-excel-pbi": "/courses/data-analytics-excel-power-bi",
  "sql-analytics": "/courses/sql-for-analytics",
  "business-analytics": "/courses/business-analytics-kpis",
  "tableau-analyst": "/courses/tableau-data-visualization",

  // Cloud & DevOps
  "aws-cloud": "/courses/aws-cloud-engineering",
  "azure-cloud": "/courses/microsoft-azure-essentials",
  "devops-pipeline": "/courses/devops-engineering",
  "linux-shell": "/courses/linux-shell-for-ops",

  // Testing
  "manual-qa": "/courses/software-testing-qa",
  "selenium-auto": "/courses/selenium-automation",
  "api-testing": "/courses/api-testing-automation",
  "mobile-testing": "/courses/mobile-app-testing",

  // UI/UX and Design
  "uiux-figma": "/courses/uiux-design-figma",
  "visual-design": "/courses/visual-web-design",
  "ux-research": "/courses/ux-research-essentials",
  "design-systems": "/courses/design-systems-components",

  // CRM / Enterprise Tools
  "salesforce-admin": "/courses/salesforce-crm-essentials",
  "sap-overview": "/courses/sap-erp-overview",
  "dynamics-365": "/courses/microsoft-dynamics-365",
  "servicenow-fundamentals": "/courses/servicenow-fundamentals",

  // Cyber Security
  "cyber-fundamentals": "/courses/cybersecurity-fundamentals",
  "ethical-hacking-intro": "/courses/ethical-hacking-basics",
  "network-security": "/courses/network-security",
  "soc-analyst-prep": "/courses/soc-analyst-preparation",

  // Digital Marketing
  "digital-marketing": "/courses/digital-marketing-mastery",
  "seo-content": "/courses/seo-content-strategy",
  "performance-ads": "/courses/performance-marketing",
  "social-media-marketing": "/courses/social-media-marketing",

  // Data Engineering / Big Data
  "bigdata-hadoop": "/courses/big-data-hadoop-essentials",
  "spark-engineering": "/courses/apache-spark-data-engineering",
  "etl-pipelines": "/courses/etl-data-pipelines",
  "data-warehousing": "/courses/data-warehousing-modeling",

  // AI / Machine Learning
  "ai-ml-foundations": "/courses/ai-machine-learning-foundations",
  "data-science-py": "/courses/data-science-python",
  "deep-learning": "/courses/deep-learning-essentials",
  "gen-ai-llm": "/courses/generative-ai-llm-applications",
};

const FALLBACK_LISTING_PATH = "/courses";

export function getCourseUrl(courseId: string): string {
  const raw = COURSE_URL_PATHS[courseId];
  if (!raw) {
    return `${SAMIT_WEBSITE_BASE}${FALLBACK_LISTING_PATH}`;
  }
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return `${SAMIT_WEBSITE_BASE}${path}`;
}
