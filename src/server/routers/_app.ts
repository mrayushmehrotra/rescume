import { z } from "zod";
import {
  createResume,
  deleteResume,
  generateTailoredContent,
  getResume,
  listResumes,
  updateResume,
} from "@/lib/resume-store";
import {
  resumeCreateSchema,
  resumeIdSchema,
  resumeTailorSchema,
  resumeUpdateSchema,
} from "@/lib/zod-schemas";
import { publicProcedure, router } from "../trpc";

const resumeRouter = router({
  list: publicProcedure.query(() => listResumes()),
  get: publicProcedure
    .input(resumeIdSchema)
    .query(({ input }) => getResume(input.id)),
  create: publicProcedure
    .input(
      resumeCreateSchema.partial().extend({
        title: z.string().trim().min(1).max(200).default("Untitled Resume"),
      }),
    )
    .mutation(({ input }) =>
      createResume({
        title: input.title,
        content: input.content,
        jobDescription: input.jobDescription,
        coverLetter: input.coverLetter,
      }),
    ),
  update: publicProcedure.input(resumeUpdateSchema).mutation(({ input }) =>
    updateResume(input.id, {
      title: input.title,
      content: input.content,
      jobDescription: input.jobDescription,
      coverLetter: input.coverLetter,
    }),
  ),
  remove: publicProcedure
    .input(resumeIdSchema)
    .mutation(({ input }) => deleteResume(input.id)),
  tailor: publicProcedure.input(resumeTailorSchema).mutation(({ input }) => {
    const resume = getResume(input.id);
    if (!resume) return null;

    const tailored = generateTailoredContent(resume, input.jobDescription);
    return updateResume(input.id, {
      jobDescription: input.jobDescription,
      content: tailored.content,
      coverLetter: tailored.coverLetter,
    });
  }),
});

export const appRouter = router({
  resume: resumeRouter,
});

export type AppRouter = typeof appRouter;
