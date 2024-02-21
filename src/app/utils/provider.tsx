import { useSnackbar } from "notistack";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { UserFileModel } from "../common/models";
import FileListContext from "./context";

interface FileListProviderProps {
  children: ReactNode;
}

// Provider is used as a temp cache so that when user uploads a file, we can immdiately show it rather refetching from server
function FileListProvider({ children }: FileListProviderProps) {
  const [fileList, setFileList] = useState<UserFileModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  // Gets initial file list from server
  const fetchInitialFileList = useCallback(async () => {
    try {
      const request = await fetch("/api/getFiles", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      const result = await request.json();
      const { data } = result;
      setFileList(data);
    } catch (err) {
      enqueueSnackbar({ message: "Unable to get Files", variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    fetchInitialFileList();
  }, [fetchInitialFileList]);

  // Allows updating of client side file list
  const updateFileList = useCallback((newFile: UserFileModel) => {
    setFileList((prevFileList) => [newFile, ...prevFileList]);
  }, []);

  const fileListValue = useMemo(
    () => ({ fileList, updateFileList, isLoading }),
    [fileList, updateFileList, isLoading],
  );

  return (
    <FileListContext.Provider value={fileListValue}>
      {children}
    </FileListContext.Provider>
  );
}

export default FileListProvider;
