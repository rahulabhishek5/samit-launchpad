import { useMemo, useState } from "react";
import { ArrowUpRight, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourseUrl } from "@/config/samitCourseUrls";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Level = "Beginner" | "Intermediate" | "Advanced";

type MarketTag = "Popular" | "Trending" | "Job-Oriented";

type Course = {
  id: string;
  name: string;
  blurb: string;
  duration: string;
  level: Level;
  tag?: MarketTag;
};

type FeaturedHighlight = {
  courseId: string;
  valueStatement: string;
  tag?: MarketTag;
};

/** SamIT Technology — balanced catalog */
const CATALOG: Record<string, Course[]> = {
  "Supply Chain / Planning": [
    {
      id: "palantir-foundry",
      name: "Palantir Foundry",
      blurb: "Master data integration and ontology building for enterprise operations.",
      duration: "10 weeks",
      level: "Intermediate",
      tag: "Trending",
    },
    {
      id: "kinaxis-rapidresponse",
      name: "Kinaxis RapidResponse",
      blurb: "Concurrent planning, scenario modeling, and supply chain agility.",
      duration: "8 weeks",
      level: "Intermediate",
    },
  ],

  "Salesforce / Commerce / Revenue": [
    {
      id: "sf-commerce-cloud",
      name: "Salesforce Commerce Cloud",
      blurb: "B2B and B2C commerce implementation, unified customer experiences.",
      duration: "12 weeks",
      level: "Advanced",
      tag: "Popular",
    },
    {
      id: "sf-revenue-cloud-rca",
      name: "Salesforce Revenue Cloud (RCA)",
      blurb: "Advanced CPQ, billing, and revenue lifecycle management.",
      duration: "10 weeks",
      level: "Advanced",
    },
  ],

  "Oracle Cloud": [
    {
      id: "oracle-oic",
      name: "Oracle Integration Cloud (OIC)",
      blurb: "Connect applications, automate processes, and build visual apps.",
      duration: "10 weeks",
      level: "Intermediate",
      tag: "Job-Oriented",
    },
    {
      id: "oracle-oac",
      name: "Oracle Analytics Cloud (OAC)",
      blurb: "AI-powered data prep, visualization, and enterprise reporting.",
      duration: "8 weeks",
      level: "Beginner",
    },
  ],

  "Microsoft Dynamics / CRM / AI": [
    {
      id: "ms-dynamics-ce-ai",
      name: "MS Dynamics D365 CE-CRM",
      blurb: "Customer Engagement with Azure, Copilot, and Agentic AI workflows.",
      duration: "12 weeks",
      level: "Intermediate",
      tag: "Trending",
    },
  ],

  "Guidewire": [
    {
      id: "guidewire-dev",
      name: "Guidewire Development",
      blurb: "Core platform development: PolicyCenter, ClaimCenter, and BillingCenter.",
      duration: "14 weeks",
      level: "Advanced",
      tag: "Job-Oriented",
    },
    {
      id: "guidewire-testing",
      name: "Guidewire Testing",
      blurb: "Specialized QA for Guidewire insurance suite and integrations.",
      duration: "8 weeks",
      level: "Intermediate",
    },
    {
      id: "guidewire-ba",
      name: "Guidewire Business Analyst",
      blurb: "Requirements, user stories, and insurance workflows for Guidewire.",
      duration: "8 weeks",
      level: "Beginner",
    },
  ],

  "AI / Data Engineering": [
    {
      id: "gen-ai-agentic",
      name: "Generative AI & Agentic AI",
      blurb: "Build autonomous AI agents, advanced LLM workflows, and enterprise AI solutions.",
      duration: "10 weeks",
      level: "Advanced",
      tag: "Trending",
    },
    {
      id: "azure-data-engineer-ai",
      name: "Azure Data Engineer with AI",
      blurb: "Databricks, Data Factory, Azure Cloud, and AI integration.",
      duration: "14 weeks",
      level: "Intermediate",
      tag: "Popular",
    },
    {
      id: "snowflake-dbt",
      name: "Snowflake with dbt",
      blurb: "Cloud data warehousing, transformation pipelines, and modern data stack.",
      duration: "10 weeks",
      level: "Intermediate",
    },
  ],

  Programming: [
    {
      id: "java-oops",
      name: "Core Java Programming",
      blurb: "OOP, collections, and interview-style problem practice.",
      duration: "12 weeks",
      level: "Beginner",
      tag: "Popular",
    },
    {
      id: "python-dev",
      name: "Python Programming",
      blurb: "Readable syntax, scripting, modules, and small real apps.",
      duration: "10 weeks",
      level: "Beginner",
    },
    {
      id: "dsa-interview",
      name: "Data Structures & Algorithms",
      blurb: "Patterns, complexity, and coding rounds hiring teams use.",
      duration: "14 weeks",
      level: "Intermediate",
      tag: "Job-Oriented",
    },
    {
      id: "dotnet-core",
      name: ".NET Development",
      blurb: "C#, ASP.NET Core APIs, and maintainable service design.",
      duration: "14 weeks",
      level: "Intermediate",
    },
  ],

  "Web Development": [
    {
      id: "full-stack-java",
      name: "Full Stack Java",
      blurb: "Spring Boot services plus React patterns for end-to-end delivery.",
      duration: "16 weeks",
      level: "Intermediate",
      tag: "Popular",
    },
    {
      id: "mern-stack",
      name: "MERN Stack Development",
      blurb: "MongoDB, Express, React, and Node in one project arc.",
      duration: "16 weeks",
      level: "Intermediate",
      tag: "Trending",
    },
    {
      id: "react-frontend",
      name: "Frontend with React",
      blurb: "Components, routing, state, and polished UI handoff.",
      duration: "10 weeks",
      level: "Intermediate",
    },
    {
      id: "nodejs-backend",
      name: "Backend with Node.js",
      blurb: "REST APIs, auth basics, and deployable services.",
      duration: "10 weeks",
      level: "Intermediate",
    },
  ],

  "Data Analytics": [
    {
      id: "analytics-excel-pbi",
      name: "Data Analytics (Excel & Power BI)",
      blurb: "Dashboards, KPIs, and narratives stakeholders act on.",
      duration: "10 weeks",
      level: "Beginner",
      tag: "Popular",
    },
    {
      id: "sql-analytics",
      name: "SQL for Analytics",
      blurb: "Joins, reporting logic, and interview-ready querying.",
      duration: "8 weeks",
      level: "Beginner",
      tag: "Job-Oriented",
    },
    {
      id: "business-analytics",
      name: "Business Analytics & KPIs",
      blurb: "Frame questions, define metrics, and communicate insights.",
      duration: "8 weeks",
      level: "Beginner",
    },
    {
      id: "tableau-analyst",
      name: "Tableau for Analysts",
      blurb: "Visual analysis, calculations, and shareable dashboards.",
      duration: "8 weeks",
      level: "Beginner",
    },
  ],

  "Cloud & DevOps": [
    {
      id: "aws-cloud",
      name: "AWS Cloud Engineering",
      blurb: "Core services, hands-on labs, and certification-aligned prep.",
      duration: "12 weeks",
      level: "Intermediate",
      tag: "Popular",
    },
    {
      id: "azure-cloud",
      name: "Microsoft Azure Essentials",
      blurb: "Service map, deployments, and cloud fundamentals.",
      duration: "8 weeks",
      level: "Beginner",
    },
    {
      id: "devops-pipeline",
      name: "DevOps Engineering",
      blurb: "Git, Docker, Kubernetes, and CI/CD you can demo.",
      duration: "16 weeks",
      level: "Advanced",
      tag: "Job-Oriented",
    },
    {
      id: "linux-shell",
      name: "Linux & Shell for Ops",
      blurb: "Commands, scripting, permissions, and everyday troubleshooting.",
      duration: "6 weeks",
      level: "Beginner",
    },
  ],

  Testing: [
    {
      id: "manual-qa",
      name: "Software Testing & QA",
      blurb: "Planning, execution, defects, and quality fundamentals.",
      duration: "8 weeks",
      level: "Beginner",
    },
    {
      id: "selenium-auto",
      name: "Selenium Test Automation",
      blurb: "Stable UI automation with practical frameworks.",
      duration: "12 weeks",
      level: "Intermediate",
      tag: "Job-Oriented",
    },
    {
      id: "api-testing",
      name: "API Testing & Automation",
      blurb: "REST basics, Postman, and checks that fit CI pipelines.",
      duration: "8 weeks",
      level: "Intermediate",
    },
    {
      id: "mobile-testing",
      name: "Mobile App Testing",
      blurb: "Device coverage, mobile flows, and practical test design.",
      duration: "8 weeks",
      level: "Intermediate",
    },
  ],

  "UI/UX and Design": [
    {
      id: "uiux-figma",
      name: "UI/UX Design with Figma",
      blurb: "Flows, prototypes, and portfolio-ready UX craft.",
      duration: "12 weeks",
      level: "Beginner",
      tag: "Popular",
    },
    {
      id: "visual-design",
      name: "Visual & Web Design",
      blurb: "Layout, typography, and responsive composition basics.",
      duration: "8 weeks",
      level: "Beginner",
    },
    {
      id: "ux-research",
      name: "UX Research Essentials",
      blurb: "Interviews, usability tests, and insight synthesis.",
      duration: "8 weeks",
      level: "Beginner",
    },
    {
      id: "design-systems",
      name: "Design Systems & Components",
      blurb: "Tokens, patterns, and scalable UI consistency.",
      duration: "8 weeks",
      level: "Intermediate",
    },
  ],

  "CRM / Enterprise Tools": [
    {
      id: "salesforce-admin",
      name: "Salesforce CRM Essentials",
      blurb: "Objects, automation, and admin workflows teams rely on.",
      duration: "10 weeks",
      level: "Beginner",
      tag: "Job-Oriented",
    },
    {
      id: "sap-overview",
      name: "SAP ERP Overview",
      blurb: "Process context for enterprise career navigation.",
      duration: "8 weeks",
      level: "Beginner",
    },
    {
      id: "dynamics-365",
      name: "Microsoft Dynamics 365",
      blurb: "CRM concepts and practical navigation for business apps.",
      duration: "10 weeks",
      level: "Beginner",
    },
    {
      id: "servicenow-fundamentals",
      name: "ServiceNow Fundamentals",
      blurb: "ITSM basics and platform literacy for enterprise roles.",
      duration: "8 weeks",
      level: "Beginner",
    },
  ],

  "Cyber Security": [
    {
      id: "cyber-fundamentals",
      name: "Cybersecurity Fundamentals",
      blurb: "Threat landscape, hygiene, and security-aware habits.",
      duration: "8 weeks",
      level: "Beginner",
    },
    {
      id: "ethical-hacking-intro",
      name: "Ethical Hacking Basics",
      blurb: "Recon, scanning, and lab-safe offensive fundamentals.",
      duration: "10 weeks",
      level: "Intermediate",
      tag: "Trending",
    },
    {
      id: "network-security",
      name: "Network Security",
      blurb: "Segments, controls, and monitoring essentials.",
      duration: "10 weeks",
      level: "Intermediate",
    },
    {
      id: "cyber-soc-vapt",
      name: "Cyber Security - SOC & VAPT",
      blurb: "Vulnerability Assessment, Penetration Testing, and Security Operations.",
      duration: "12 weeks",
      level: "Advanced",
      tag: "Job-Oriented",
    },
  ],

  "Digital Marketing": [
    {
      id: "digital-marketing",
      name: "Digital Marketing Mastery",
      blurb: "Channels, funnels, and measurement that tie to outcomes.",
      duration: "10 weeks",
      level: "Beginner",
      tag: "Popular",
    },
    {
      id: "seo-content",
      name: "SEO & Content Strategy",
      blurb: "Search intent, structure, and sustainable organic growth.",
      duration: "8 weeks",
      level: "Beginner",
    },
    {
      id: "performance-ads",
      name: "Performance Marketing",
      blurb: "Paid search, social ads, and accountable ROI.",
      duration: "8 weeks",
      level: "Intermediate",
    },
    {
      id: "social-media-marketing",
      name: "Social Media Marketing",
      blurb: "Creative cadence, community, and campaign basics.",
      duration: "8 weeks",
      level: "Beginner",
    },
  ],

  "Data Engineering / Big Data": [
    {
      id: "bigdata-hadoop",
      name: "Big Data & Hadoop Essentials",
      blurb: "Distributed storage concepts and ecosystem orientation.",
      duration: "10 weeks",
      level: "Intermediate",
    },
    {
      id: "spark-engineering",
      name: "Apache Spark for Engineers",
      blurb: "Distributed processing patterns for large datasets.",
      duration: "10 weeks",
      level: "Intermediate",
      tag: "Job-Oriented",
    },
    {
      id: "etl-pipelines",
      name: "ETL & Data Pipelines",
      blurb: "Ingest, transform, and reliable pipeline design.",
      duration: "10 weeks",
      level: "Intermediate",
    },
    {
      id: "data-warehousing",
      name: "Data Warehousing & Modeling",
      blurb: "Schemas, facts, dims, and analytics-ready structures.",
      duration: "10 weeks",
      level: "Intermediate",
    },
  ],

  "AI / Machine Learning": [
    {
      id: "ai-ml-foundations",
      name: "AI & Machine Learning Foundations",
      blurb: "Supervised learning, evaluation, and responsible basics.",
      duration: "12 weeks",
      level: "Intermediate",
      tag: "Trending",
    },
    {
      id: "data-science-py",
      name: "Data Science with Python",
      blurb: "Pandas, visualization, and modeling workflows employers expect.",
      duration: "16 weeks",
      level: "Intermediate",
      tag: "Popular",
    },
    {
      id: "deep-learning",
      name: "Deep Learning Essentials",
      blurb: "Neural nets, training intuition, and practical notebooks.",
      duration: "12 weeks",
      level: "Advanced",
    },
    {
      id: "gen-ai-llm",
      name: "Generative AI & LLM Applications",
      blurb: "Prompting patterns, apps, and grounded use cases.",
      duration: "8 weeks",
      level: "Intermediate",
      tag: "Trending",
    },
  ],
};

const CATEGORY_ORDER = [
  "Supply Chain / Planning",
  "Salesforce / Commerce / Revenue",
  "Oracle Cloud",
  "Microsoft Dynamics / CRM / AI",
  "Guidewire",
  "AI / Data Engineering",
  "Programming",
  "Web Development",
  "Data Analytics",
  "Cloud & DevOps",
  "Testing",
  "UI/UX and Design",
  "CRM / Enterprise Tools",
  "Cyber Security",
  "Digital Marketing",
  "Data Engineering / Big Data",
  "AI / Machine Learning",
] as const;

const FEATURED: FeaturedHighlight[] = [
  {
    courseId: "gen-ai-agentic",
    valueStatement: "Build autonomous AI agents and enterprise generative AI solutions.",
    tag: "Trending",
  },
  {
    courseId: "sf-commerce-cloud",
    valueStatement: "Master B2B/B2C commerce implementation and unified customer experiences.",
    tag: "Popular",
  },
  {
    courseId: "full-stack-java",
    valueStatement: "Full-stack Java skills employers screen for—backend depth plus React delivery.",
    tag: "Job-Oriented",
  },
  {
    courseId: "azure-data-engineer-ai",
    valueStatement: "Databricks, Data Factory, Azure Cloud, and AI integration mapped to real roles.",
    tag: "Trending",
  },
];

function buildCourseMap(): Map<string, Course> {
  const map = new Map<string, Course>();
  for (const courses of Object.values(CATALOG)) {
    for (const c of courses) {
      map.set(c.id, c);
    }
  }
  return map;
}

const courseById = buildCourseMap();

const levelTone: Record<Level, string> = {
  Beginner: "bg-primary-soft text-primary border border-primary/20",
  Intermediate: "bg-secondary text-secondary-foreground border border-secondary-foreground/10",
  Advanced: "bg-foreground/90 text-background border border-foreground/20",
};

const marketTagTone: Record<MarketTag, string> = {
  Popular: "bg-primary/10 text-primary",
  Trending: "bg-accent/10 text-accent",
  "Job-Oriented": "bg-[hsl(40_45%_58%/.15)] text-[hsl(40_45%_72%)]",
};

const linkFocusClass =
  "rounded-2xl outline-offset-2 transition-[transform,box-shadow,opacity] duration-300 ease-out focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring";

function FeaturedCard({ item }: { item: FeaturedHighlight }) {
  const course = courseById.get(item.courseId);
  if (!course) return null;
  return (
    <a
      href={getCourseUrl(course.id)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(linkFocusClass, "group block h-full no-underline")}
      aria-label={`${course.name} — open featured course`}
    >
      <Card className="flex h-full flex-col overflow-hidden border-border/40 bg-card/40 shadow-sm backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:bg-card/80 hover:shadow-md">
        <CardContent className="flex h-full flex-col p-5 sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <Badge
              variant="secondary"
              className={cn(
                "rounded-md border-none text-[10px] font-bold uppercase tracking-wider",
                item.tag ? marketTagTone[item.tag] : "bg-primary/10 text-primary"
              )}
            >
              {item.tag || "Featured"}
            </Badge>
            <Clock className="h-4 w-4 shrink-0 text-muted-foreground/60" aria-hidden />
          </div>
          <h4 className="line-clamp-2 text-base font-semibold leading-snug text-foreground">{course.name}</h4>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{item.valueStatement}</p>
          
          <div className="mt-auto pt-6 flex items-center text-sm font-semibold text-primary">
            Explore Program
            <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

function CourseCard({ course }: { course: Course }) {
  const href = getCourseUrl(course.id);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${course.name} — open course details on SamIT Technology`}
      className={cn(linkFocusClass, "group block h-full no-underline")}
    >
      <Card className="flex h-full flex-col overflow-hidden border-border/50 bg-card/60 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/20 hover:bg-card/90">
        <CardHeader className="space-y-3 pb-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <CardTitle className="line-clamp-1 text-base font-semibold leading-snug text-foreground">{course.name}</CardTitle>
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
              {course.tag && (
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-md border-none text-[10px] font-semibold uppercase tracking-wide",
                    marketTagTone[course.tag],
                  )}
                >
                  {course.tag}
                </Badge>
              )}
              <Badge variant="secondary" className={cn("rounded-md text-[10px] font-semibold", levelTone[course.level])}>
                {course.level}
              </Badge>
            </div>
          </div>
          <CardDescription className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{course.blurb}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto flex items-center justify-between gap-3 pt-2 text-sm">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {course.duration}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary opacity-90 transition-opacity group-hover:opacity-100">
            Learn more
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </CardContent>
      </Card>
    </a>
  );
}

export const Courses = () => {
  const filteredCategories = CATEGORY_ORDER.filter((c) => CATALOG[c]?.length);
  const categories = ["All", ...filteredCategories];
  
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const activeCourses = useMemo(() => {
    if (activeCategory === "All") {
      return Object.values(CATALOG).flat();
    }
    return CATALOG[activeCategory] ?? [];
  }, [activeCategory]);

  const displayedCourses = activeCourses.slice(0, visibleCount);
  const hasMore = visibleCount < activeCourses.length;

  const handleShowMore = () => {
    if (hasMore) {
      setVisibleCount((prev) => prev + 6);
    } else {
      setVisibleCount(6);
      const el = document.getElementById("browse-courses");
      if (el) {
        const yOffset = -80; // Offset for fixed header
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(6);
  };

  return (
    <section id="courses" aria-labelledby="courses-heading" className="section-surface section-y content-lazy relative overflow-hidden">
      {/* Subtle background glow for premium feel */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="container-tight relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Courses"
            title="Training programs built for real careers"
            description="Explore our most in-demand tracks, or browse our full catalog to find the right path for your next career move."
          />
          <h2 id="courses-heading" className="sr-only">
            Courses
          </h2>
        </Reveal>

        <Reveal className="mt-8 lg:mt-14">
          <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 sm:text-sm">Featured Programs</h3>
              <p className="mt-1 max-w-xl text-xs text-muted-foreground sm:mt-1.5 sm:text-sm">
                High-demand tracks with the strongest placement momentum.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED.slice(0, 4).map((item) => (
              <FeaturedCard key={item.courseId} item={item} />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12 lg:mt-24">
          <div id="browse-courses" className="mb-5 scroll-mt-20 sm:mb-6 sm:scroll-mt-24">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 sm:text-sm">Browse Catalog</h3>
          </div>

          <div className="w-full">
            <div className="-mx-1 scroll-touch pb-4 md:mx-0">
              <div className="inline-flex w-max items-center gap-1.5 rounded-full border border-border/40 bg-muted/20 p-1.5 backdrop-blur-sm">
                {categories.map((cat) => {
                  const active = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryChange(cat)}
                      className={cn(
                        "whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all sm:text-sm",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                      )}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {displayedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {activeCourses.length > 6 && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={handleShowMore}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-card/50 px-6 py-2.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm transition-all hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {hasMore ? (
                    <>
                      Show More Courses
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    </>
                  ) : (
                    <>
                      Show Less
                      <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

