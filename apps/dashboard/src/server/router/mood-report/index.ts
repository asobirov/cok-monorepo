import { z } from 'zod';
import { protectedRouter } from "../context";

export const moodReportRouter = protectedRouter()
    .query("getReports", {
        input: z.object({
            limit: z.number().min(1).max(100).default(20),
            cursor: z.string().nullish(),
        }),
        async resolve({
            ctx: { prisma },
            input: {
                limit,
                cursor
            }
        }) {
            const reports = await prisma.moodReport.findMany({
                take: limit + 1,
                cursor: cursor ? {
                    id: cursor
                } : undefined,
                orderBy: {
                    reportedAt: "desc"
                }
            })

            let nextCursor: typeof cursor | undefined = undefined;
            if (reports.length > limit) {
                const nextItem = reports.pop()
                nextCursor = nextItem?.id;
            }

            return {
                reports,
                nextCursor
            }
        }
    })
    .mutation("createReport", {
        input: z.object({
            energyRating: z.number().min(1).max(10),
            moodRating: z.number().min(1).max(10),
            comment: z.string().optional(),
        }),
        async resolve({
            ctx: { prisma },
            input: {
                energyRating,
                moodRating,
                comment
            }
        }) {
            const report = await prisma.moodReport.create({
                data: {
                    energyRating,
                    moodRating,
                    comment,
                }
            })

            return {
                report
            }
        }
    })