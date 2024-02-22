import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { UserFileModel } from "../common/models";

import FileListContext from "../utils/context";
import Loader from "./loader";

// Component to upload pdf files
export default function FileUploader() {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const { updateFileList } = useContext(FileListContext);

  async function uploadPDF(file: File) {
    // Show Loader
    setIsUploading(true);

    // Prepare FormData
    const formData = new FormData();

    // Append the audio blob to the FormData object. You might want to give it a filename.
    formData.append("pdf", file);

    // Setup the fetch request options
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    // Send the request to your API endpoint
    try {
      const response = await fetch("/api/upload", requestOptions);
      if (!response.ok) throw new Error("Failed to upload");
      const result = await response.json();

      const { data }: { data: UserFileModel } = result;

      enqueueSnackbar("File has been successfully uploaded", {
        variant: "success",
        autoHideDuration: 3000,
      });

      // Update File list on client side ( BE already updated )
      updateFileList?.(data);
    } catch (error) {
      enqueueSnackbar("File Upload Failed", {
        variant: "error",
        autoHideDuration: 3000,
      });
      // eslint-disable-next-line no-console
      console.error("Error uploading file:", error);
    }
    setIsUploading(false);
  }

  return (
    <div className="flex flex-col gap-4 w-full h-20">
      <div className="form-control w-full">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-gray"
          >
            {isUploading ? (
              <Loader />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-font"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-font">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-font">Only PDF&apos;s are allowed</p>
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="application/pdf"
              disabled={isUploading}
              onChange={async (e) => {
                const { files } = e.target;
                if (!files || !files[0]) {
                  return;
                }

                const file = files[0];

                await uploadPDF(file);
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
