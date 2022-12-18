import { S3Client } from "@aws-sdk/client-s3";
import { env } from '@cok/env';

export const client = new S3Client({
    forcePathStyle: false,
    endpoint: env.DO_SPACES_ENDPOINT_URL,
    region: 'fra1',
    credentials: {
        accessKeyId: env.DO_SPACES_ACCESS_KEY_ID,
        secretAccessKey: env.DO_SPACES_SECRET_ACCESS_KEY,
    }
});