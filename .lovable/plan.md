## SamIT Technology — Minimalist Landing Page

A single-page portfolio-style site for an IT training & placement institute. Clean, light theme, Inter typography, #1978E5 accent, 8px radius, generous whitespace, subtle scroll reveals and hover effects.

### Page Structure (single scrolling page)

1. **Sticky Top Nav**
  - Brand "SamIT Technology" on the left, anchor links (About, Courses, Why Us, Placements, Testimonials, Contact) on the right, "Enroll Now" primary button.
  - Collapses to a hamburger sheet on mobile.
2. **Hero**
  - Large heading + tagline ("IT Training & Placement, built for real jobs").
  - Two CTAs: "Explore Courses" (primary, scrolls to Courses) and "Contact Us" (outline, scrolls to Contact).
  - Soft gradient/blurred accent shapes in the background, no heavy imagery.
3. **About**
  - Short mission paragraph + 3 small stat tiles (Students Trained, Courses Offered, Placement Partners).
4. **Courses**
  - Grouped into categories (e.g., Programming, Data & Analytics, Cloud & DevOps, Testing, Design). Tabs to switch categories, grid of course cards inside each tab.
  - A "Featured Courses" carousel above the tabs using shadcn carousel, show only 3-6 featured courses in the carousel to keep it clean. 
  - Each card: course name, short blurb, duration, level badge, "Learn more" link.
  - &nbsp;
5. **Why Choose Us**
  - 6-item icon grid: Industry-Aligned Curriculum, Hands-on Projects, Expert Mentors, Small Batches, Placement Support, Flexible Timing.
6. **Placement Support**
  - Two-column section: left copy explaining career assistance; right vertical step list (Resume Building → Mock Interviews → Aptitude Prep → Interview Drives → Offer).
7. **Testimonials**
  - Minimalist shadcn carousel with student quote, name, course, and placement company.
8. **Contact**
  - Card layout (no form): Address, Phone, Email, WhatsApp direct click-to-chat link, Hours. Each in its own card with an icon. "Get Directions" link opens Google Maps in new tab.
9. **Footer**
  - Brand line, quick links, social icons, copyright.

### Design System

- Light theme only. Background `#FFFFFF`, surface `#F8FAFC`, text near-black.
- Primary `#1978E5` mapped to `--primary` in `index.css` (HSL). Used for CTAs, links, focus rings, accents.
- Inter via Google Fonts in `index.html`; set as default sans in `tailwind.config.ts`.
- Border radius `0.5rem` (8px) — already matches `--radius`.
- Spacing: sections use `py-20 md:py-28`, container max-width ~1200px.
- Subtle elevation: `shadow-sm` on cards, `hover:shadow-md` transition.

### Interactions & Animation

- Scroll reveal via a small `useInView` hook + Tailwind opacity/translate transitions (no heavy animation lib).
- Hover: cards lift slightly, buttons get subtle bg shift, links underline on hover.
- Smooth anchor scrolling via `scroll-behavior: smooth`.
- `No parallax, no bouncing effects, and no heavy autoplay animations.`

### Performance & Accessibility

- Lazy load any imagery (`loading="lazy"`), use `<picture>`/SVG where possible.
- Skeleton placeholders only where content could be slow (testimonials section initial paint).
- Semantic landmarks: `header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`.
- Keyboard-friendly: visible focus rings using primary color, skip-to-content link.
- Fully responsive: mobile-first, breakpoints at `sm/md/lg`.

### Technical Notes

- Update `src/index.css` design tokens: set `--primary` to HSL of `#1978E5` (~`212 78% 50%`), tune secondary/muted for the light minimal palette.
- Add Inter `<link>` tags to `index.html` and extend `fontFamily.sans` in `tailwind.config.ts`.
- Replace `src/pages/Index.tsx` placeholder with the composed sections.
- New components under `src/components/landing/`: `Navbar`, `Hero`, `About`, `Courses`, `WhyUs`, `Placement`, `Testimonials`, `Contact`, `Footer`, plus `SectionHeading` and `Reveal` helpers.
- Reuse shadcn `button`, `card`, `tabs`, `carousel`, `badge`, `sheet`, `separator`.
- Content is hard-coded for now (placeholder copy that reads naturally for an IT institute); easy to edit later.
- `Use a mobile-first stacking order so the Placement and Contact sections remain easy to scan on small screens.`

### Out of Scope

- No auth, backend, forms, CMS, or analytics.
- No dark mode toggle (light theme only as specified).