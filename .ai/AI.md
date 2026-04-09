# Rescume — AI-Powered Resume Tailoring

> **Rescume** is an AI-powered web application that lets you instantly rewrite, tailor, and preview your resume for any job description — all in one place.

---

## What is Rescume?

Landing a job today means customizing your resume for every application. Rescume eliminates that friction. Paste a job description, let the AI reshape your resume in seconds, and export a polished, ATS-ready document — without ever touching a word processor.

---

## Core Features

| Feature | Description |
|---|---|
| 🔐 **Clerk Authentication** | Secure sign-in / sign-up via Clerk (OAuth, email/password) |
| 📂 **Resume Dashboard** | History of all saved resumes, browsable and manageable |
| ✏️ **AI Resume Editor** | Paste a job description → AI rewrites your resume instantly |
| 📄 **LaTeX Source Editor** | Full access to the underlying LaTeX code for fine-grained control |
| 👁️ **Live Preview** | Real-time rendered PDF preview of the resume alongside the editor |
| 💾 **One-Click Save** | Save any version of your resume directly to your history |
| 📝 **CV Generator** | Auto-generate a full academic/professional CV from your profile |
| 💌 **Cover Letter Generator** | AI-crafted cover letter tailored to the job description |

---

## User Journey

### 1. Login Screen
Users land on a clean Clerk-powered authentication page. Supports social logins and email/password. After signing in, they are redirected to their personal dashboard.

### 2. Dashboard
The dashboard displays all previously saved resumes as cards, showing the job title, company, and last-edited date. Clicking any card opens the full resume editor for that entry. A **"New Resume"** button starts a fresh editing session.

### 3. Resume Editor Page

This is the heart of Rescume. The layout is split into two main panels:

```
┌──────────────────────────────┬──────────────────────────┐
│          LEFT PANEL          │       RIGHT PANEL         │
│                              │                           │
│  ┌─────────────────────────┐ │  ┌─────────────────────┐ │
│  │                         │ │  │                     │ │
│  │   LaTeX Code Editor     │ │  │   Live PDF Preview  │ │
│  │      (~80% height)      │ │  │                     │ │
│  │                         │ │  │                     │ │
│  └─────────────────────────┘ │  │                     │ │
│                              │  └─────────────────────┘ │
│  ┌─────────────────────────┐ │                           │
│  │  💬 AI Input Box        │ │  [ Save Resume ]          │
│  │  "Paste job desc here…" │ │                           │
│  └─────────────────────────┘ │                           │
└──────────────────────────────┴──────────────────────────┘
```

#### Left Panel — Editor
- **Top (~80%):** A Monaco / CodeMirror-style editor showing the raw **LaTeX source** of the resume. The user can edit it manually or let the AI do it.
- **Bottom (~20%):** An **AI chat input box** where the user pastes the target job description and sends natural-language instructions (e.g., *"Tailor this resume for a Senior Backend Engineer role at Stripe"*). The AI responds by directly modifying the LaTeX in the editor above.

#### Right Panel — Preview & Save
- A **real-time rendered preview** of the compiled resume (PDF or HTML rendering of the LaTeX).
- A prominent **Save** button to commit the current version to the dashboard history.

---

## AI Capabilities

The AI engine powering Rescume can:

- **Tailor a resume** to a specific job description (keywords, skills, tone)
- **Reorder and rewrite** bullet points to match required qualifications
- **Generate a full CV** from the user's base profile
- **Write a cover letter** customized for the target company and role
- Accept free-form instructions (*"Make it more concise"*, *"Add my internship at Google"*)

---

## Tech Stack (Planned)

| Layer | Technology |
|---|---|
| **Authentication** | [Clerk](https://clerk.dev) |
| **Frontend** | Next.js (App Router) |
| **Styling** | Tailwind CSS |
| **Code Editor** | Monaco Editor |
| **AI Model** | OpenAI GPT-4o / Gemini |
| **LaTeX Rendering** | LaTeX.js / MathJax / PDF compile endpoint |
| **API Layer** | tRPC + OpenAPI (type-safe endpoints with REST compatibility) |
| **Database** | Prisma + PostgreSQL (resume history) |
| **Cache / Queue** | Redis (session caching, AI job queuing) |
| **Storage** | [Firebase Storage](https://firebase.google.com/docs/storage) (PDF exports) |
| **Analytics** | PostHog (product analytics, feature flags, session replay) |
| **Error Monitoring** | Sentry (error tracking, performance tracing) |

---

## Pages & Routes

```
/                → Marketing / landing page
/sign-in         → Clerk login
/sign-up         → Clerk registration
/dashboard       → Resume history dashboard
/resume/new      → New resume editor session
/resume/[id]     → Existing resume editor (LaTeX + AI + Preview)
```

---

## Key Design Principles

- **Speed first** — The AI edit loop should feel instant. Streaming responses update the LaTeX editor in real time.
- **Non-destructive** — Every save creates a new version; no work is ever lost.
- **LaTeX as the source of truth** — Giving users raw LaTeX access ensures full control and portability.
- **ATS-friendly output** — Templates are selected and optimized to pass Applicant Tracking Systems.
