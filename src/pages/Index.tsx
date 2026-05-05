import { lazy, Suspense } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";

/**
 * Above-the-fold components load eagerly (Hero, Navbar).
 * All other sections are code-split and lazy-loaded — they are
 * non-critical for LCP and can be deferred without any UX impact.
 *
 * The Suspense fallback is null because sections reveal via IntersectionObserver
 * anyway, so a flash of empty space is acceptable and invisible.
 */
const About       = lazy(() => import("@/components/landing/About").then(m => ({ default: m.About })));
const Courses     = lazy(() => import("@/components/landing/Courses").then(m => ({ default: m.Courses })));
const WhyUs       = lazy(() => import("@/components/landing/WhyUs").then(m => ({ default: m.WhyUs })));
const Placement   = lazy(() => import("@/components/landing/Placement").then(m => ({ default: m.Placement })));
const Testimonials = lazy(() => import("@/components/landing/Testimonials").then(m => ({ default: m.Testimonials })));
const Contact     = lazy(() => import("@/components/landing/Contact").then(m => ({ default: m.Contact })));
const Footer      = lazy(() => import("@/components/landing/Footer").then(m => ({ default: m.Footer })));

const Index = () => (
  <div className="relative min-h-screen overflow-x-hidden bg-background font-sans">
    <Navbar />
    <main id="main">
      {/* Hero renders synchronously — it IS the LCP element */}
      <Hero />
      {/* All below-fold sections are lazily loaded and painted */}
      <Suspense fallback={null}>
        <About />
        <Courses />
        <WhyUs />
        <Placement />
        <Testimonials />
        <Contact />
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  </div>
);

export default Index;
