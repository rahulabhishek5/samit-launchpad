import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Course = {
  name: string;
  blurb: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
};

const catalog: Record<string, Course[]> = {
  Programming: [
    { name: "Full Stack Java", blurb: "Java, Spring Boot, REST APIs and React UI fundamentals.", duration: "4 months", level: "Intermediate" },
    { name: "Python Development", blurb: "Core Python, Django, and database integration projects.", duration: "3 months", level: "Beginner" },
    { name: "MERN Stack", blurb: "MongoDB, Express, React, and Node.js end-to-end builds.", duration: "4 months", level: "Intermediate" },
  ],
  "Data & Analytics": [
    { name: "Data Analytics", blurb: "Excel, SQL, Power BI and storytelling with data.", duration: "3 months", level: "Beginner" },
    { name: "Data Science", blurb: "Python, statistics, ML models and real datasets.", duration: "5 months", level: "Advanced" },
    { name: "SQL Mastery", blurb: "Joins, window functions, and performance tuning.", duration: "6 weeks", level: "Beginner" },
  ],
  "Cloud & DevOps": [
    { name: "AWS Cloud", blurb: "Core AWS services with hands-on architecture labs.", duration: "3 months", level: "Intermediate" },
    { name: "DevOps Engineering", blurb: "Linux, Git, Docker, Kubernetes, CI/CD pipelines.", duration: "4 months", level: "Advanced" },
    { name: "Azure Fundamentals", blurb: "Microsoft Azure services and certification prep.", duration: "8 weeks", level: "Beginner" },
  ],
  Testing: [
    { name: "Manual Testing", blurb: "SDLC, STLC, test cases, defect lifecycle and tools.", duration: "6 weeks", level: "Beginner" },
    { name: "Selenium Automation", blurb: "Java + Selenium, TestNG, frameworks and CI runs.", duration: "3 months", level: "Intermediate" },
    { name: "API Testing", blurb: "Postman, REST Assured, and contract testing basics.", duration: "6 weeks", level: "Intermediate" },
  ],
  Design: [
    { name: "UI/UX Design", blurb: "Research, wireframes, Figma, and design systems.", duration: "3 months", level: "Beginner" },
    { name: "Web Design", blurb: "HTML, CSS, responsive layouts and modern design.", duration: "8 weeks", level: "Beginner" },
  ],
};

const featured: Course[] = [
  catalog.Programming[0],
  catalog["Data & Analytics"][1],
  catalog["Cloud & DevOps"][1],
  catalog.Testing[1],
  catalog.Design[0],
];

const levelTone: Record<Course["level"], string> = {
  Beginner: "bg-primary-soft text-primary",
  Intermediate: "bg-secondary text-secondary-foreground",
  Advanced: "bg-foreground/90 text-background",
};

const CourseCard = ({ course }: { course: Course }) => (
  <Card className="group h-full border-border transition-all hover:-translate-y-0.5 hover:shadow-elevated">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-3">
        <CardTitle className="text-lg">{course.name}</CardTitle>
        <Badge variant="secondary" className={levelTone[course.level]}>
          {course.level}
        </Badge>
      </div>
      <CardDescription className="leading-relaxed">{course.blurb}</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-between text-sm">
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        <Clock className="h-4 w-4" />
        {course.duration}
      </span>
      <a
        href="#contact"
        className="inline-flex items-center gap-1 text-primary transition-colors hover:underline"
      >
        Learn more
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </CardContent>
  </Card>
);

export const Courses = () => {
  const categories = Object.keys(catalog);
  return (
    <section id="courses" aria-labelledby="courses-heading" className="bg-surface py-20 md:py-28">
      <div className="container-tight">
        <Reveal>
          <SectionHeading
            eyebrow="Courses"
            title="Programs designed for the jobs you want"
            description="Browse our most popular tracks or jump into a category to see all available programs."
          />
          <h2 id="courses-heading" className="sr-only">Courses</h2>
        </Reveal>

        <Reveal className="mt-12">
          <div className="mb-4 flex items-end justify-between">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Featured Courses
            </h3>
          </div>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {featured.map((c) => (
                <CarouselItem key={c.name} className="md:basis-1/2 lg:basis-1/3">
                  <CourseCard course={c} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-4 flex items-center justify-end gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </Reveal>

        <Reveal className="mt-16">
          <Tabs defaultValue={categories[0]} className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="inline-flex w-auto">
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="text-sm">
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {categories.map((cat) => (
              <TabsContent key={cat} value={cat} className="mt-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {catalog[cat].map((c) => (
                    <CourseCard key={c.name} course={c} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
};
