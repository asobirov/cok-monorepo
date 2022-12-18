import { client } from "./client"

type SendParams = Parameters<Awaited<typeof client.send>>;
type SendCommandParams = {
    command: SendParams[0];
    options?: SendParams[1];
}

export const sendCommand = async (opts: SendCommandParams) => {
    try {
        const { command, options } = opts;
        return await client.send(command, options);
    } catch (error) {
        console.log("Spaces error:", error);
        throw error;
    }
}