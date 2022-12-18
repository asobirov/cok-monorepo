import { useRef, useState } from "react";
import { Cancel, CloudUpload } from "iconoir-react"
import { trpc } from "../../utils/trpc";
import axios from "axios";

import { FileIcon } from "./FileIcon";


export const FileUpload: React.FC = () => {
    const [droppedFiles, setDroppedFiles] = useState<File[] | null>(null);
    const getPresignedUrlMuataion = trpc.files.getPresignedUrl.useMutation();

    const handleUploadFiles = async () => {
        if (!droppedFiles) return;


        for (const file of droppedFiles) {
            const { presignedUrl } = await getPresignedUrlMuataion.mutateAsync({
                mimeType: file.type,
                isPublic: true,
            });

            const form = new FormData();

            Object.entries(presignedUrl.fields).forEach(([key, value]) => {
                form.append(key, value);
            });

            form.append("file", file);

            console.log("Sending file", file.name, "to", presignedUrl.url)

            try {
                const response = await axios.post(presignedUrl.url, form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }

        setDroppedFiles(null);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <DropZone droppedFiles={droppedFiles} setDroppedFiles={setDroppedFiles} />
            <FilesList files={droppedFiles ?? []} />
            <div className="flex flex-row w-full space-x-5 text-xs">
                <button
                    className="button w-full px-4 py-2 rounded-lg"
                    onClick={() => setDroppedFiles(null)}
                >
                    Cancel
                </button>
                <button
                    className="button w-full px-4 py-2 rounded-lg"
                    onClick={() => handleUploadFiles()}
                >
                    Upload files
                </button>
            </div>
        </div>
    )
}

type DropZoneProps = {
    droppedFiles: File[] | null;
    setDroppedFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
}

export const DropZone: React.FC<DropZoneProps> = ({
    droppedFiles, setDroppedFiles
}) => {
    const getPresignedUrlMutation = trpc.files.getPresignedUrl.useMutation();
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(true);
    }

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);

        const { files } = e.dataTransfer;

        await handleFilesInput(files);
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(true);
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const { files } = e.target;

        await handleFilesInput(files);
    }

    const handleFilesInput = async (files?: FileList | null) => {
        if (!files || files.length === 0) {
            return;
        }

        setDroppedFiles([...files, ...droppedFiles ?? []]);


        // for (const file of files) {
        //     const { presignedUrl } = await getPresignedUrlMutation.mutateAsync({
        //         mimeType: file.type,
        //         isPublic: true,
        //     })

        //     const { url, fields } = presignedUrl;

        //     const formData = new FormData();

        //     Object.entries(fields).forEach(([k, v]) => {
        //         formData.append(k, v);
        //     });

        //     formData.append("file", file);

        //     await fetch(url, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //         body: formData,
        //     });
        // }
    }

    return (
        <div
            className="flex flex-col items-center justify-center gap-4 w-full px-4 py-6 rounded-xl border border-dashed border-blackAlpha-100 dark:border-whiteAlpha-500 hover:dark:border-whiteAlpha-700"
            onDragEnter={(e) => handleDragEnter(e)}
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            onDrop={(e) => handleDrop(e)}
            onClick={() => inputRef.current?.click()}
        >
            <input
                className="hidden"
                ref={inputRef}
                type="file"
                multiple
                onChange={handleChange}
            />
            <CloudUpload />
            <p className="text-center">{isDragging ? "Drop files here" : "Click or drag and drop files here"}</p>

        </div>
    )
}

const FilesList: React.FC<{
    files: File[]
}> = ({ files }) => {
    return (
        <>
            {
                files.map((file, i) => (
                    <FileItem key={i} file={file} />
                ))
            }
        </>
    )
}

const FileItem: React.FC<{
    file: File;
}> = ({ file }) => {
    const { name, size, type } = file;

    const convertBytesToReadableSize = (bytes: number) => {
        const sizes = [' Bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'];

        for (let i = 1; i < sizes.length; i++) {
            if (bytes < Math.pow(1024, i))
                return (Math.round((bytes / Math.pow(
                    1024, i - 1)) * 100) / 100) + sizes[i - 1];
        }
        return bytes;
    }

    return (
        <div className="flex flex-row items-center justify-between w-full px-2 py-2 rounded-xl border border-whiteAlpha-100 hover:border-whiteAlpha-400">
            <div className="flex flex-row items-center space-x-4 w-full">
                <FileIcon type={type.split("/")[1]} />
                <div className="flex flex-col flex-1">
                    <div className="flex flex-col items-start justify-center gap-1">
                        <p className="text-xs">{name}</p>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                        <p className="text-xs">{convertBytesToReadableSize(size)}</p>
                    </div>
                </div>
                <div className="self-start h-full text-xs ">
                    <Cancel />
                </div>

            </div>
        </div>
    )
}