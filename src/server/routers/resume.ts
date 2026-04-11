import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { TRPCError } from '@trpc/server';

export const resumeRouter = router({
    list: protectedProcedure
        .meta({ openapi: { method: 'GET', path: '/resume/list', tags: ['resume'] } })
        .input(z.void())
        .output(z.array(z.object({
            id: z.string(),
            title: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
        })))
        .query(async ({ ctx }) => {
            const user = await prisma.user.findUnique({
                where: { clerkId: ctx.userId },
                select: { resumes: true }
            });
            return user?.resumes || [];
        }),

    create: protectedProcedure
        .meta({ openapi: { method: 'POST', path: '/resume/create', tags: ['resume'] } })
        .input(z.object({
            title: z.string().min(1),
        }))
        .output(z.object({
            id: z.string(),
            title: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            const { title } = input;
            const { userId } = ctx;

            // Find the user in DB
            const user = await prisma.user.findUnique({
                where: { clerkId: userId }
            });

            if (!user) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'User not found in database. Make sure initial sync is complete.',
                });
            }

            const newResumeId = crypto.randomUUID();

            await prisma.user.update({
                where: { clerkId: userId },
                data: {
                    resumes: {
                        push: {
                            id: newResumeId,
                            title: title,
                            content: JSON.stringify({ sections: [] }), // Initial empty content
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        }
                    }
                }
            });

            return {
                id: newResumeId,
                title: title,
            };
        }),
});
