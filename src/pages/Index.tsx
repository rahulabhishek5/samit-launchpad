import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Courses } from "@/components/landing/Courses";
import { WhyUs } from "@/components/landing/WhyUs";
import { Placement } from "@/components/landing/Placement";
import { Testimonials } from "@/components/landing/Testimonials";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

const Index = () => (
  <div className="relative min-h-screen overflow-x-hidden bg-background font-sans">
    <div
      className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,hsl(var(--primary-soft)/0.85),transparent_55%)]"
      aria-hidden
    />
    <Navbar />
    <main id="main">
      <Hero />
      <About />
      <Courses />
      <WhyUs />
      <Placement />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Index;
