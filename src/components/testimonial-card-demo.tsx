import { ClientsSection, type Stat, type Testimonial } from "@/components/ui/testimonial-card";

const statsData: Stat[] = [
  { value: "2,000+", label: "Students Trained" },
  { value: "95%", label: "Placement Support" },
  { value: "4.8", label: "Average Rating" },
];

const testimonialsData: Testimonial[] = [
  {
    name: "Priya Sharma",
    title: "Full Stack Java Learner",
    quote:
      "The mentors simplified every difficult concept, and mock interviews helped me clear my final round with confidence.",
    avatarSrc:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=60",
    rating: 5.0,
  },
  {
    name: "Arjun Verma",
    title: "Data Science Graduate",
    quote:
      "Hands-on projects gave me real confidence in interviews. I could explain practical work instead of theory only.",
    avatarSrc:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=900&auto=format&fit=crop&q=60",
    rating: 4.7,
  },
  {
    name: "Sneha R",
    title: "Selenium Automation Trainee",
    quote:
      "The placement team kept guiding me through every step until I received my offer. That support was exceptional.",
    avatarSrc:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&auto=format&fit=crop&q=60",
    rating: 4.9,
  },
];

export default function ClientsSectionDemo() {
  return (
    <ClientsSection
      tagLabel="Student Testimonials"
      title="Students Love Learning Here"
      description="Trusted by thousands of learners with practical training and career-focused mentorship."
      stats={statsData}
      testimonials={testimonialsData}
      primaryActionLabel="Contact Now"
      secondaryActionLabel="Explore Courses"
    />
  );
}
