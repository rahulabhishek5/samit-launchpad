import { useMemo, useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
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

/** SamIT Technology — balanced catalog (3–4 courses per category) */
const CATALOG: Record<string, Course[]> = {
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
      id: "soc-analyst-prep",
      name: "SOC Analyst Preparation",
      blurb: "Alerts, triage patterns, and analyst tooling overview.",
      duration: "10 weeks",
      level: "Intermediate",
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
    courseId: "full-stack-java",
    valueStatement: "Full-stack Java skills employers screen for—backend depth plus React delivery.",
    tag: "Popular",
  },
  {
    courseId: "mern-stack",
    valueStatement: "One JavaScript stack from database to UI—built as a cohesive product.",
    tag: "Trending",
  },
  {
    courseId: "analytics-excel-pbi",
    valueStatement: "Turn messy exports into decisions leaders actually trust.",
    tag: "Popular",
  },
  {
    courseId: "aws-cloud",
    valueStatement: "Hands-on AWS mapped to roles and certification momentum.",
    tag: "Job-Oriented",
  },
  {
    courseId: "selenium-auto",
    valueStatement: "Automation that reads like real QA job postings—not toy scripts.",
    tag: "Job-Oriented",
  },
  {
    courseId: "uiux-figma",
    valueStatement: "Portfolio-ready UX using the tool teams already standardize on.",
  },
  {
    courseId: "data-science-py",
    valueStatement: "The Python analytics workflow from tables to models.",
    tag: "Trending",
  },
  {
    courseId: "digital-marketing",
    valueStatement: "Channel strategy with measurement—prove impact, not guesses.",
    tag: "Popular",
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
  Beginner: "bg-primary-soft text-primary",
  Intermediate: "bg-secondary text-secondary-foreground",
  Advanced: "bg-foreground/90 text-background",
};

const marketTagTone: Record<MarketTag, string> = {
  Popular: "border-primary/30 bg-primary/12 text-primary",
  Trending: "border-accent/35 bg-accent/12 text-accent",
  "Job-Oriented": "border-[hsl(40_45%_58%/.35)] bg-[hsl(40_45%_58%/.12)] text-[hsl(40_45%_72%)]",
};

const linkFocusClass =
  "rounded-2xl outline-offset-2 transition-[transform,box-shadow] duration-300 ease-out focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring";

function FeaturedPrimaryCard({ item }: { item: FeaturedHighlight }) {
  const course = courseById.get(item.courseId);
  if (!course) return null;
  return (
    <a
      href={getCourseUrl(course.id)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(linkFocusClass, "group block no-underline")}
      aria-label={`${course.name} — open featured course`}
    >
      <Card className="h-full border-border/70 bg-gradient-to-br from-card to-primary-soft/25 shadow-card transition-transform duration-300 group-hover:-translate-y-1">
        <CardHeader className="space-y-3 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            {item.tag && (
              <Badge variant="outline" className={cn("rounded-md border text-[11px] font-semibold", marketTagTone[item.tag])}>
                {item.tag}
              </Badge>
            )}
            <Badge variant="secondary" className={cn("ml-auto rounded-md text-[11px] font-semibold", levelTone[course.level])}>
              {course.level}
            </Badge>
          </div>
          <CardTitle className="text-xl leading-tight">{course.name}</CardTitle>
          <p className="text-sm text-primary">{item.valueStatement}</p>
          <CardDescription className="line-clamp-2 text-sm">{course.blurb}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between pt-0">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            Explore
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </CardContent>
      </Card>
    </a>
  );
}

function FeaturedCompactCard({ item }: { item: FeaturedHighlight }) {
  const course = courseById.get(item.courseId);
  if (!course) return null;
  return (
    <a
      href={getCourseUrl(course.id)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(linkFocusClass, "group block no-underline")}
      aria-label={`${course.name} — open featured course`}
    >
      <Card className="border-border/70 bg-card/90 transition-transform duration-300 group-hover:-translate-y-0.5">
        <CardContent className="flex items-start justify-between gap-3 p-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {item.tag && (
                <Badge variant="outline" className={cn("rounded-md border text-[10px] font-semibold", marketTagTone[item.tag])}>
                  {item.tag}
                </Badge>
              )}
              <span className="text-[11px] text-muted-foreground">{course.duration}</span>
            </div>
            <h4 className="mt-2 line-clamp-1 text-sm font-semibold text-foreground">{course.name}</h4>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.valueStatement}</p>
          </div>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
      <Card className="flex h-full flex-col border-border/70 bg-card/95 transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-primary/20">
        <CardHeader className="space-y-2 pb-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <CardTitle className="line-clamp-1 text-base font-semibold leading-snug text-foreground">{course.name}</CardTitle>
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
              {course.tag && (
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-md text-[10px] font-semibold uppercase tracking-wide",
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
        <CardContent className="mt-auto flex items-center justify-between gap-3 pt-1 text-sm">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {course.duration}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary">
            Learn more
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </CardContent>
      </Card>
    </a>
  );
}

export const Courses = () => {
  const categories = CATEGORY_ORDER.filter((c) => CATALOG[c]?.length);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const featuredPrimary = FEATURED[0];
  const featuredSecondary = FEATURED.slice(1, 5);
  const activeCourses = useMemo(() => CATALOG[activeCategory] ?? [], [activeCategory]);

  return (
    <section id="courses" aria-labelledby="courses-heading" className="section-surface section-y">
      <div className="container-tight">
        <Reveal>
          <SectionHeading
            eyebrow="Courses"
            title="Training programs built for real careers"
            description="Explore featured tracks first, then open a category—every card links to full details on SamIT Technology."
          />
          <h2 id="courses-heading" className="sr-only">
            Courses
          </h2>
        </Reveal>

        <Reveal className="mt-10">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Featured programs</h3>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                High-demand tracks with the strongest placement momentum.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.25fr_.75fr]">
            <div className="min-h-[230px]">
              <FeaturedPrimaryCard item={featuredPrimary} />
            </div>
            <div className="grid gap-3">
              {featuredSecondary.map((item) => (
                <FeaturedCompactCard key={item.courseId} item={item} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="mb-5">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Browse by category</h3>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Use filters to quickly scan compact course cards.
            </p>
          </div>

          <div className="w-full">
            <div className="-mx-1 overflow-x-auto pb-2 md:mx-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="inline-flex w-max items-center gap-2 rounded-2xl border border-border/55 bg-muted/35 p-1.5">
                {categories.map((cat) => {
                  const active = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-medium transition-all sm:text-sm",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        active
                          ? "bg-card text-foreground shadow-soft"
                          : "text-muted-foreground hover:bg-card/70 hover:text-foreground",
                      )}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {activeCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
