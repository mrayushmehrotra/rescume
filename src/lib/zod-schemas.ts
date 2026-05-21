import { z } from "zod";

export const resumeIdSchema = z.object({
  id: z.string().min(1),
});

export const resumeCreateSchema = z.object({
  title: z.string().trim().min(1).max(200),
  content: z.string().min(1),
  jobDescription: z.string().trim().default(""),
  coverLetter: z.string().trim().default(""),
});

export const resumeUpdateSchema = resumeCreateSchema.partial().extend({
  id: z.string().min(1),
});

export const resumeTailorSchema = z.object({
  id: z.string().min(1),
  jobDescription: z.string().trim().min(1),
});
