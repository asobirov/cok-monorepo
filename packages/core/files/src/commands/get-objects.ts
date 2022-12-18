import { ListObjectsCommand } from "@aws-sdk/client-s3"
import { client } from "../client"
import { env } from "@cok/env"

export const getObjects = async () => {
    try {
        const data = await client.send(new ListObjectsCommand({
            Bucket: env.DO_SPACES_BUCKET_NAME
        }));

        return data;
    } catch (error) {
        console.log("Spaces error:", error);
        throw error;
    }
}