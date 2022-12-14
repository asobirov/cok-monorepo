import { z } from 'zod';

import { protectedProcedure, publicProcedure, router } from "../trpc";

import { getObjects, generatePresignedUploadUrl } from '@cok/files-core';
import { Roles } from '@cok/db';

export const filesRouter = router({
    getFiles: protectedProcedure()
        .query(() => {
            return getObjects();
        }),
    getPresignedUrl: protectedProcedure()
        .input(
            z.object({
                mimeType: z.string(),
                isPublic: z.boolean().default(true),
                fileName: z.string().optional(),
            })
        )
        .mutation(async ({
            input: {
                mimeType,
                isPublic,
                fileName
            }
        }) => {
            const url = await generatePresignedUploadUrl({
                isPublic,
                mimeType,
                fileName
            },)

            return {
                presignedUrl: url
            }
        }),
});
