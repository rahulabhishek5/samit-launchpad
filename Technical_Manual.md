# Technical Specification & Maintenance Documentation Manual

> [!NOTE]
> This document serves as the formal technical handoff manual for the SamIT Launchpad platform. It details the system architecture, component integrations, security models, and provides a maintenance runbook for the client's internal engineering department.

---

## 1. Executive Summary & Core Architecture

The application is engineered as a **Static Client-Side Single Page Application (SPA)**. It relies on a decoupled, serverless architecture where the frontend is globally distributed via a CDN (Vercel), and form submissions are handled by a zero-cost serverless proxy.

### Complete Production Tech Stack
- **Framework & Build:** React 18, TypeScript, Vite
- **Hosting & Edge Routing:** Vercel (Static CDN delivery with Edge rewrites for SPA routing)
- **Styling Engine:** Tailwind CSS with class-variance-authority (`cva`) and `tailwind-merge` for deterministic utility resolution
- **Component Library:** Custom integration of Shadcn UI and Radix UI (accessible, headless primitives)
- **Core Animation Engines:** Framer Motion (for physics-based layout transitions) and Lucide React (for scalable vector iconography)
- **Decoupled Backend Engine:** Google Apps Script Web App (Serverless V8 Engine)

---

## 2. File Directory Mapping & Structural Inventory

The repository is modularly structured to separate UI atomic elements from complex layout assemblies.

```text
src/
├── components/
│   ├── landing/    # Core macro-sections of the single-page application (Hero, Contact, Courses)
│   └── ui/         # Reusable, atomic micro-components (Buttons, Inputs, Sticky Cards, Animations)
├── config/         # Centralized application constants and global configuration objects
├── hooks/          # Custom React lifecycle utilities (e.g., use-mobile, use-toast)
├── lib/            # Agnostic utility functions (e.g., utils.ts for Tailwind class merging)
├── pages/          # Top-level route boundaries (Index.tsx, NotFound.tsx)
└── test/           # Vitest configuration and automated testing setup
```

---

## 3. Comprehensive Feature & UX Implementation Log

### Responsive Split Contact Section Layout
The `Contact.tsx` module utilizes a CSS Grid architecture that natively adapts to the viewport viewport. 
- **Mobile (`grid-cols-1`):** The layout stacks vertically, presenting the contact details (maps, phone, email) as interactive cards, followed by the form.
- **Desktop (`lg:grid-cols-2`):** The layout splits asynchronously. The left column iterates over an array of communication anchors, while the right column houses the interactive input boundary, separated by a `lg:gap-20` margin.

### Cross-Component Navigation & Focus Bridge
To strictly decouple the Navigation Bar from the Contact Section, the system relies on a native DOM Event Bus:
1. **Trigger:** Clicking the "Enroll Now" CTA in the Floating Header fires `window.dispatchEvent(new CustomEvent("focus-contact-form"))`.
2. **Listener:** The `Contact` component mounts a listener that captures this event.
3. **Execution:** It triggers an 800ms `setTimeout` to allow the browser's native smooth-scrolling algorithm to complete, then locks focus onto the Name input field via `nameInputRef.current.focus({ preventScroll: true })`.

### Mobile Scroll Stack Animation Loop
The testimonial and placement cards leverage a highly performant, CSS-driven sticky stacking engine enhanced by `framer-motion`:
- Inside `testimonial-card.tsx`, the `StickyTestimonialCard` component wraps elements in a `<motion.div className="sticky">`.
- The position offset is mathematically calculated via component index (`top: ${20 + index * 24}px`).
- As the user scrolls through the bounding container, native browser rendering engines pin the cards sequentially, creating a 3D-layering parallax effect without heavy JavaScript scroll-listener bloat.

---

## 4. Decoupled Backend Proxy Integration

The platform completely bypasses traditional backend frameworks (like Node.js or Python) in favor of a zero-cost, highly scalable **Google Apps Script Web App**.

1. **Client Submission:** The React `fetch` loop stringifies the sanitized form payload and dispatches it.
2. **Endpoint Mapping:** The request routes to the explicit deployment URL injected at build-time via `VITE_FORM_API_URL`.
3. **Script Execution (Dual-Action Logic):**
   - **Database Logging:** The `doPost(e)` function parses the incoming payload and executes `sheet.appendRow()`, cleanly logging the timestamp, name, email, phone, and message into a tabular Google Sheet layout.
   - **Notification Dispatch:** Within milliseconds of the database write, the script invokes `MailApp.sendEmail()`, compiling the payload into a readable format and firing it directly to the designated corporate mailbox.
4. **Resolution:** The script returns an HTTP 200 JSON object, signaling the frontend to wipe the form state and display the success banner.

---

## 5. Production Security Profile & Edge-Case Mitigations

> [!CAUTION]
> The application operates under a strict Zero-Trust client architecture. All user inputs are treated as hostile.

- **Layer 1 (The Honeypot Guard):** A visually hidden field is injected into the DOM. Bots navigating via scraping algorithms will populate this field. The system detects this, silently aborts the network request, and fakes a success response, starving the bot of retry signals.
- **Layer 2 (The Interaction Timing Heuristic):** Instead of calculating time elapsed from component mount, the system anchors a `useRef` timestamp specifically to the user's *first keystroke or focus event*. Submissions firing under 2000ms from this interaction are silently blocked, eliminating false-positives caused by lazy-loading or browser autofill mechanisms.
- **Layer 3 (Data Truncation & Formula Stripping):** At the final serialization boundary, all strings undergo aggressive truncation (e.g., `slice(0, 120)`) and whitespace stripping. This explicitly prevents payload bloat and mitigates spreadsheet formula injection (`=`, `+`, `-`, `@`) edge cases.
- **Layer 4 (The Google CORS Preflight Bypass):** Browsers send an `OPTIONS` preflight request for `application/json` payloads, which Google Apps Script blocks. By explicitly configuring the fetch header to `"Content-Type": "text/plain"`, the system forces a browser-native "Simple Request", bypassing the `OPTIONS` block while still allowing the Apps Script engine to execute `JSON.parse` on the raw text payload.

### Hosting CDN Configuration (`vercel.json`)
The application is fortified at the CDN layer with stringent security headers:
- `Strict-Transport-Security`: Enforces strict HTTPS connections for 2 years (`max-age=63072000`), eligible for HSTS preloading.
- `Content-Security-Policy`: Strictly defines `connect-src` to allow external connections *only* to Google Script domains (`script.google.com`, `script.googleusercontent.com`) and WhatsApp (`wa.me`), terminating unauthorized rogue scripts.
- `X-Frame-Options: DENY`: Prevents the site from being maliciously rendered inside iframes (Clickjacking protection).
- `X-Content-Type-Options: nosniff`: Prevents MIME-type sniffing vulnerabilities.

---

## 6. Environmental Configuration Matrix

The application layout dynamically compiles data from the local `.env` runtime configuration. The `.env.example` file contains the exact blueprint.

| Variable Prefix | Assignment | Role / Purpose |
| :--- | :--- | :--- |
| `VITE_FORM_API_URL` | Google Apps Script URL | The destination endpoint for the Contact form submission. |
| `VITE_CONTACT_*` | Phone, Email, Maps URLs | Dynamically populates the text values and `href` triggers across the Contact layout and Floating Header. |
| `VITE_SOCIAL_*` | LinkedIn, Insta, Facebook | Injects the raw hyperlinking URLs into the Footer icon array. |

> [!IMPORTANT]
> The `VITE_` prefix exposes these variables directly to the browser at compile-time. **Never** place private database connection strings, JWT secrets, or AWS keys in these fields.

---

## 7. Future Maintenance, Scaling, & Update Runbook

### Updating Course Content & UI Dropdowns
To add, edit, or remove courses, a developer does not need to rewrite UI components.
1. Navigate to `src/components/landing/Courses.tsx`.
2. Locate the static dictionary object containing arrays for `Cloud & DevOps`, `AI / Data Engineering`, etc.
3. Modify the JSON structures inside these arrays. The UI will automatically map and render the updated cards.

### Infrastructure Handoff Migration
When migrating to the corporate Google Workspace:
1. **Google Sheet:** Create a new Google Sheet on the corporate account.
2. **Apps Script:** Go to `Extensions > Apps Script`. Paste the custom `doPost` code. Update the `companyEmail` variable within the script.
3. **Deployment:** Click `Deploy > New Deployment`. Set type to `Web App`. Execute as `Me`, Access to `Anyone`.
4. **Environment:** Copy the resulting `/exec` URL and inject it into the Vercel Production Environment Variables panel under the key `VITE_FORM_API_URL`. Trigger a Vercel redeployment.

### Scaling to Full-Stack
If the client requires authenticated student dashboards or secure backend API integrations in the future:
1. **Migrate Framework:** Transition the Vite setup into **Next.js (App Router)** to unlock server-side rendering (SSR) and protected API routes (`/api/...`).
2. **Remove VITE_ Prefixing:** Shift sensitive credentials (like Supabase URLs or Postgres connection strings) behind server-side `.env` variables that lack the `VITE_` (or `NEXT_PUBLIC_`) prefix.
3. **Database Integration:** Implement an ORM (like Prisma or Drizzle) to handle protected relational data logic outside of the browser bundle.
