import Fuse from "fuse.js";
import { memo, useCallback, useContext, useState } from "react";
import { UserFileModel } from "../common/models";
import FileCard from "../components/fileCard";
import Input from "../components/input";
import Loader from "../components/loader";
import FileListContext from "../utils/context";

function FileList() {
  // Get list of files from context
  const { fileList, isLoading } = useContext(FileListContext);
  const [searchInput, setSearchInput] = useState<string>("");
  const [errorText, setErrorText] = useState<string | undefined>();

  const [searchResults, setSearchResults] = useState<UserFileModel[]>([]);

  // This does a fuzzy search based on string input by user
  const searchFile = (value: string) => {
    if (value.length === 0) {
      setSearchResults([]);
      setSearchInput("");
      return;
    }

    setSearchInput(value);

    const fuseFiles = new Fuse(fileList, {
      keys: ["filename"], // Specify the properties to search on
      threshold: 0.4, // Adjust the threshold for fuzzy matching
    });

    // return only top 3 results
    const fileResults: UserFileModel[] = fuseFiles
      .search(value)
      .slice(0, 3)
      .map((result) => ({
        ...result.item,
      }));

    setSearchResults(fileResults);
  };

  const getFileCardComponent = useCallback(() => {
    if (searchResults.length > 0) {
      return searchResults.map((file) => (
        <FileCard
          key={file._id}
          filename={file.filename}
          filePath={file.filePath}
        />
      ));
    }

    return fileList.map((file) => (
      <FileCard
        key={file._id}
        filename={file.filename}
        filePath={file.filePath}
      />
    ));
  }, [fileList, searchResults]);

  return (
    <section id="fileList">
      <div className="ml-auto mr-auto flex flex-col items-center justify-center md:flex-row pt-4 pb-10">
        <div className="w-full">
          <div className="mx-auto gap-y-2 text-center text-base md:text-xl md:line-h flex flex-col md:px-20 px-4 w-full">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <h1 className="flex md:self-center self-start text-2xl font-bold md:text-4xl text-start text-header">
                All Files
              </h1>
              <div className="w-full md:w-[21.2rem] mb-4 mt-2 md:mt-0">
                <Input
                  htmlFor="search"
                  placeholder="Search for file"
                  type="text"
                  errorText={errorText}
                  onChange={(e) => {
                    e.preventDefault();
                    setErrorText(undefined);
                    searchFile(e.target.value);
                  }}
                />
              </div>
            </div>
            {isLoading ? (
              <div className="flex w-full justify-center">
                <div className="w-14 h-14">
                  <Loader />
                </div>
              </div>
            ) : (
              <>
                {fileList.length === 0 ? (
                  <p className="text-font">No Files have been uploaded</p>
                ) : (
                  <div />
                )}
                {searchInput?.length > 0 && searchResults.length === 0 ? (
                  <p className="text-font w-full text-center">
                    No Files found with{" "}
                    <span className="text-primary-red">{searchInput}</span> name
                  </p>
                ) : (
                  <div className="md:grid w-full md:grid-cols-3 flex flex-col justify-center gap-5">
                    {getFileCardComponent()}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(FileList);
