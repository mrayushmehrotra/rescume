# Google Stitch Prompt — Rescume Frontend

> Copy and paste the prompt below directly into Google Stitch.

---

## Prompt

Build a modern, dark-themed AI-powered resume tailoring web app called **Rescume**. Use a dark background (`#0A0A0F`) with purple/violet accent colors (`#7C3AED`, `#A78BFA`). Use the Inter font throughout. The app has 3 main screens:

---

### Screen 1 — Login Page

A centered, minimal authentication screen:
- Dark background with a subtle radial gradient glow in purple behind the card
- A glass-morphism card in the center (blurred background, semi-transparent borders)
- App logo: the text **"Rescume"** in bold with a small sparkle/magic wand icon in purple
- Tagline below: *"Tailor your resume for every job, in seconds."*
- A **"Continue with Google"** button (white with Google icon) and a **"Continue with GitHub"** button (dark gray with GitHub icon)
- A thin divider with "or" and email/password fields below
- A **"Sign In"** CTA button in solid purple
- Small footer link: *"Don't have an account? Sign up"*

---

### Screen 2 — Dashboard Page

A full-width dashboard with a top navbar and a card grid:

**Navbar:**
- Left: **Rescume** logo with sparkle icon
- Right: User avatar + dropdown, and a purple **"+ New Resume"** button

**Main Content:**
- Page title: *"My Resumes"*
- A search bar to filter resumes
- A masonry/grid of **Resume Cards** (3 columns), each card showing:
  - Resume title (e.g., *"Senior Backend Engineer — Stripe"*)
  - Last edited date
  - A small colored tag for status: *Tailored*, *Draft*, *Cover Letter*
  - Three-dot menu (rename, delete, duplicate)
  - Hover state: card glows with a soft purple border
- Empty state illustration if no resumes exist: centered icon + *"No resumes yet. Create your first one."* + CTA button

---

### Screen 3 — Resume Editor Page

A full-height, two-panel editor layout with a top navbar.

**Navbar:**
- Left: Back arrow + resume title (editable inline)
- Right: **"Save"** button (solid purple), **"Export PDF"** button (outlined), and user avatar

**Left Panel (50% width) — split vertically:**

Top section (~80% of panel height):
- A **code editor** UI (dark background, monospace font, line numbers on the left, syntax highlighting in purple/cyan tones) showing LaTeX source code of the resume
- Tabs at the top: `LaTeX Source` | `CV Mode` | `Cover Letter`
- Small toolbar: copy, undo/redo, format buttons

Bottom section (~20% of panel height):
- An **AI chat input box** with a glowing purple border
- Placeholder text: *"Paste the job description here and ask AI to tailor your resume…"*
- A send button (arrow icon) in purple on the right
- Above the input, a small chip row showing quick actions: `✨ Tailor to JD`, `📄 Generate CV`, `💌 Write Cover Letter`
- When AI is processing: a pulsing gradient animation on the input border

**Right Panel (50% width):**
- A **live resume preview** rendered as a clean white A4 document card with subtle drop shadow
- The document shows a realistic resume layout (name header, sections like Experience, Education, Skills)
- A thin scrollbar on the right if the document is long
- At the bottom: page indicator (*Page 1 of 1*) and zoom controls

**Overall vibe:**
- Dark glassmorphism UI
- Smooth purple gradient accents
- Subtle animations on hover and focus states
- Feels like a premium developer tool (similar to VS Code + Linear)
