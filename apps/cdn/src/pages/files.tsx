import { NextPage } from "next";
import { FileUpload } from "../components/file-upload/FileUpload";
import { trpc } from "../utils/trpc";

const FilesPage: NextPage = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="bg-blackAlpha-500 p-6 mt-10 rounded-2xl">
                <FileUpload />
            </div>
        </div>
    );
}

export default FilesPage;