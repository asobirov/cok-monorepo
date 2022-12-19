import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { client } from '../client';
import crypto from 'crypto'
import { env } from '@cok/env';

type GenerateUploadUrlParams = {
    isPublic: boolean;
    mimeType: string;
    fileName?: string;
}

export const generatePresignedUploadUrl = async ({
    isPublic,
    mimeType,
    fileName
}: GenerateUploadUrlParams) => {

    const folder = isPublic ? 'public' : 'private';
    const extension = fileName?.split('.').pop() || mimeType.split('/').pop();
    const key = `${folder}/${crypto.randomUUID()}${extension ? '.' + extension : ''}`

    return await getSignedUrl(client, new PutObjectCommand({
        Bucket: env.DO_SPACES_BUCKET_NAME,
        Key: key,
        ContentType: mimeType,
        ACL: isPublic ? 'public-read' : 'private',
    }), {
        expiresIn: 60 * 60 * 1 // 1 hour,
    })
}