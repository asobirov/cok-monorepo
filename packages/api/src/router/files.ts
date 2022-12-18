import { z } from 'zod';

import { protectedProcedure, publicProcedure, router } from "../trpc";

import { getObjects, generatePresignedUploadUrl } from '@cok/files-core';

export const filesRouter = router({
    getFiles: protectedProcedure.query(() => {
        return getObjects();
    }),
    getPresignedUrl: protectedProcedure
        .input(
            z.object({
                mimeType: z.string(),
                isPublic: z.boolean().default(true),
            })
        )
        .mutation(async ({
            input: {
                mimeType,
                isPublic
            }
        }) => {
            const url = await generatePresignedUploadUrl({
                isPublic,
                mimeType
            })

            return {
                presignedUrl: url
            }
        }),
});
