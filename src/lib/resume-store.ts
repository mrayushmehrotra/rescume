export type ResumeRecord = {
  id: string;
  title: string;
  content: string;
  jobDescription: string;
  coverLetter: string;
  createdAt: string;
  updatedAt: string;
};

type ResumeSeed = Omit<ResumeRecord, "id" | "createdAt" | "updatedAt">;

const DEFAULT_TEMPLATE = String.raw`\documentclass[11pt]{article}
\usepackage[margin=0.7in]{geometry}
\usepackage{enumitem}
\usepackage[T1]{fontenc}
\usepackage{hyperref}
\pagenumbering{gobble}

\begin{document}
\begin{center}
  {\LARGE Your Name}\\
  \vspace{0.2cm}
  \href{mailto:you@email.com}{you@email.com} \;|\; (555) 555-5555 \;|\; linkedin.com/in/yourhandle
\end{center}

\section*{Experience}
\begin{itemize}[leftmargin=*]
  \item Impact-first bullet that starts with an action verb and ends with a measurable result.
  \item Tailor this section to mirror the job description keywords without losing factual accuracy.
\end{itemize}

\section*{Education}
\textbf{B.S. in Computer Science} --- University Name

\section*{Skills}
TypeScript, React, Next.js, Node.js, PostgreSQL, MongoDB
\end{document}`;

const DEFAULT_COVER_LETTER = `Dear Hiring Manager,

I am excited to apply for this role because it aligns with my background in full-stack product engineering and my focus on shipping measurable outcomes. I have worked across frontend, backend, and AI-assisted workflows, and I would bring that same practical mindset to your team.

My recent work emphasizes clean systems, thoughtful user experience, and fast iteration. I am especially interested in roles where I can translate ambiguous requirements into reliable product improvements.

Sincerely,
Your Name`;

const DEFAULT_JOB_DESCRIPTION =
  "Build and ship polished product experiences with strong system design, reliable APIs, and clear communication across the stack.";

const SEED_RESUMES: ResumeSeed[] = [
  {
    title: "Product Engineer Resume",
    content: DEFAULT_TEMPLATE,
    jobDescription: DEFAULT_JOB_DESCRIPTION,
    coverLetter: DEFAULT_COVER_LETTER,
  },
  {
    title: "AI Resume for Backend Roles",
    content: DEFAULT_TEMPLATE.replace(
      "TypeScript, React, Next.js, Node.js, PostgreSQL, MongoDB",
      "Node.js, TypeScript, MongoDB, tRPC, Prisma, Docker",
    ),
    jobDescription:
      "Scale backend services, design clean APIs, and support product teams with dependable infrastructure.",
    coverLetter: DEFAULT_COVER_LETTER.replace(
      "full-stack product engineering",
      "backend systems and API design",
    ),
  },
];

type ResumeStore = {
  resumes: ResumeRecord[];
};

declare global {
  // eslint-disable-next-line no-var
  var __rescumeStore: ResumeStore | undefined;
}

function createResumeRecord(seed: ResumeSeed): ResumeRecord {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    ...seed,
  };
}

function getStore(): ResumeStore {
  if (!globalThis.__rescumeStore) {
    globalThis.__rescumeStore = {
      resumes: SEED_RESUMES.map(createResumeRecord),
    };
  }

  return globalThis.__rescumeStore;
}

export function listResumes() {
  return [...getStore().resumes].sort(
    (left, right) =>
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
  );
}

export function getResume(id: string) {
  return getStore().resumes.find((resume) => resume.id === id) ?? null;
}

export function createResume(input: Partial<ResumeSeed> & { title: string }) {
  const now = new Date().toISOString();
  const resume: ResumeRecord = {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    title: input.title.trim() || "Untitled Resume",
    content: input.content ?? DEFAULT_TEMPLATE,
    jobDescription: input.jobDescription ?? "",
    coverLetter: input.coverLetter ?? DEFAULT_COVER_LETTER,
  };

  getStore().resumes.unshift(resume);
  return resume;
}

export function updateResume(
  id: string,
  updates: Partial<
    Pick<ResumeSeed, "title" | "content" | "jobDescription" | "coverLetter">
  >,
) {
  const resume = getResume(id);
  if (!resume) return null;

  if (typeof updates.title === "string") {
    resume.title = updates.title.trim() || resume.title;
  }
  if (typeof updates.content === "string") {
    resume.content = updates.content;
  }
  if (typeof updates.jobDescription === "string") {
    resume.jobDescription = updates.jobDescription;
  }
  if (typeof updates.coverLetter === "string") {
    resume.coverLetter = updates.coverLetter;
  }

  resume.updatedAt = new Date().toISOString();
  return resume;
}

export function deleteResume(id: string) {
  const store = getStore();
  const index = store.resumes.findIndex((resume) => resume.id === id);
  if (index === -1) return false;

  store.resumes.splice(index, 1);
  return true;
}

export function generateTailoredContent(
  resume: ResumeRecord,
  jobDescription: string,
) {
  const keywords = jobDescription
    .split(/[\n,.;]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 5);

  const focusLine =
    keywords.length > 0
      ? `Targeted keywords: ${keywords.join(", ")}`
      : "Targeted keywords: product engineering, API design, and measurable impact";

  const tailoredContent = `${resume.content}\n\n% Tailored for this role\n${focusLine}\n\\section*{Selected Impact}\n\\begin{itemize}[leftmargin=*]\n  \\item Reframed resume bullets to emphasize outcomes, ownership, and collaboration.\n  \\item Aligned core experience with the language used in the job description.\n\\end{itemize}`;

  const tailoredCoverLetter = `Dear Hiring Manager,

I am applying for this role because it matches my experience with ${keywords[0] ?? "product engineering"} and building dependable tools that help teams move faster. The scope of the work is close to the kind of product-focused, hands-on engineering I enjoy most.

In my recent work, I have focused on transforming technical complexity into usable software, improving systems without losing sight of the end user, and communicating clearly with stakeholders. I would bring that same approach here.

Sincerely,
${resume.title.replace("Resume", "").trim() || "Your Name"}`;

  return {
    content: tailoredContent,
    coverLetter: tailoredCoverLetter,
  };
}
