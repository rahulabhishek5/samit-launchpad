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
  <div className="min-h-screen bg-background font-sans">
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
