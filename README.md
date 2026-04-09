# Rescume — AI-Powered Resume Tailoring

> **Rescume** is an AI-powered web application that lets you instantly rewrite, tailor, and preview your resume for any job description — all in one place.

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

## Editor Layout

```
┌──────────────────────────────┬──────────────────────────┐
│          LEFT PANEL          │       RIGHT PANEL         │
│  ┌─────────────────────────┐ │  ┌─────────────────────┐ │
│  │   LaTeX Code Editor     │ │  │   Live PDF Preview  │ │
│  │      (~80% height)      │ │  │                     │ │
│  └─────────────────────────┘ │  └─────────────────────┘ │
│  ┌─────────────────────────┐ │                           │
│  │  💬 AI Input Box        │ │  [ Save Resume ]          │
│  │  "Paste job desc here…" │ │                           │
│  └─────────────────────────┘ │                           │
└──────────────────────────────┴──────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Authentication** | Clerk |
| **Frontend** | Next.js (App Router) + Tailwind CSS + shadcn/ui |
| **Code Editor** | Monaco Editor |`
| **AI Model** | OpenAI GPT-4o / Gemini |
| **LaTeX Rendering** | LaTeX.js / PDF compile endpoint |
| **API Layer** | tRPC + OpenAPI |
| **Database** | Prisma + PostgreSQL |
| **Cache / Queue** | Redis |
| **Storage** | Firebase Storage |
| **Analytics** | PostHog |
| **Error Monitoring** | Sentry |
| **Github CI/CD** | Github Actions |

---

## Routes

```
/                → Landing page
/sign-in         → Clerk login
/sign-up         → Clerk registration
/dashboard       → Resume history dashboard
/resume/new      → New resume editor session
/resume/[id]     → Resume editor (LaTeX + AI + Preview)
```

---

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Design Principles

- **Speed first** — Streaming AI responses update the LaTeX editor in real time
- **Non-destructive** — Every save creates a new version; no work is ever lost
- **LaTeX as source of truth** — Full control and portability
- **ATS-friendly** — Templates optimized to pass Applicant Tracking Systems
