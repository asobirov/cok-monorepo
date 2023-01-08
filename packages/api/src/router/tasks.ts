import { z } from 'zod';

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const tasksRouter = router({
    getTasks: protectedProcedure()
        .input(z.object({
            limit: z.number().min(1).max(100).default(20),
            cursor: z.string().nullish(),
        }))
        .query(async ({
            ctx: { prisma },
            input: {
                limit,
                cursor
            }
        }) => {
            const tasks = await prisma.task.findMany({
                take: limit + 1,
                cursor: cursor ? {
                    id: cursor
                } : undefined,
                orderBy: {
                    createdAt: "desc"
                }
            })

            let nextCursor: typeof cursor | undefined = undefined;
            if (tasks.length > limit) {
                const nextItem = tasks.pop()
                nextCursor = nextItem?.id ?? null;
            }

            return {
                tasks,
                nextCursor
            }
        }),
    createTask: protectedProcedure()
        .input(z.object({
            title: z.string().min(1).max(100),
            description: z.string().min(1).max(512).nullish().default(null),
            due: z.date().optional(),
        }))
        .mutation(async ({
            ctx: { prisma },
            input: {
                title,
                description,
                due
            }
        }) => {
            const task = await prisma.task.create({
                data: {
                    title,
                    description: description,
                    due
                }
            });
            return {
                task
            }
        })
});
