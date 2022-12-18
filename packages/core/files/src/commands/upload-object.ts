import { } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { client } from '../client';
import crypto from 'crypto'
import { env } from '@cok/env';

type GenerateUploadUrlParams = {
    isPublic: boolean;
    mimeType: string;
}

export const generatePresignedUploadUrl = async ({
    isPublic,
    mimeType
}: GenerateUploadUrlParams) => {

    const folder = isPublic ? 'public' : 'private';
    const key = `${folder}/${crypto.randomUUID()}`;

    return await createPresignedPost(client, {
        Bucket: env.DO_SPACES_BUCKET_NAME,
        Key: key,
        Conditions: [
            ["eq", "$Content-Type", mimeType],
        ]
    })
}