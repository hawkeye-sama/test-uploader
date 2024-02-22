import { memo, useContext } from "react";
import FileCard from "../components/fileCard";
import Loader from "../components/loader";
import FileListContext from "../utils/context";

function FileList() {
  // Get list of files from context
  const { fileList, isLoading } = useContext(FileListContext);
  return (
    <section id="fileList">
      <div className="ml-auto mr-auto flex flex-col items-center justify-center md:flex-row pb-10">
        <div className="w-full">
          <div className="mx-auto gap-y-2 text-center text-base md:text-xl md:line-h flex flex-col md:px-20 px-2 w-full">
            <h1 className="text-2xl mb-4 font-bold md:text-4xl text-start text-header">
              All Files
            </h1>
            {isLoading ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : (
              <>
                {fileList.length === 0 ? (
                  <p className="text-font">No Files have been uploaded</p>
                ) : (
                  <div />
                )}
                <div className="grid w-full grid-cols-3 justify-center gap-5">
                  {fileList?.map((file) => (
                    <FileCard
                      key={file._id}
                      filename={file.filename}
                      filePath={file.filePath}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(FileList);
