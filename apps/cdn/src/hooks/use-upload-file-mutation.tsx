import { useMutation } from '@tanstack/react-query';
import { trpc } from '@utils/trpc';
import axios from 'axios';

export const useUploadFileMutation = () => {
    const getPresignedUrlMutation = trpc.files.getPresignedUrl.useMutation();

    const mutation = useMutation({
        mutationFn: async ({ file, isPublic }: {
            file: File,
            isPublic: boolean
        }) => {
            const { presignedUrl } = await getPresignedUrlMutation.mutateAsync({
                fileName: file.name,
                mimeType: file.type,
                isPublic: isPublic
            });

            const form = new FormData();
            form.append('file', file);

            return axios.put(presignedUrl, form)
        }
    })

    return mutation;
}