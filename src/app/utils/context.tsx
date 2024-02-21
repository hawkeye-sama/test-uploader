import { createContext } from "react";
import { UserFileModel } from "../common/models";

interface FileListContextProps {
  fileList: UserFileModel[];
  updateFileList?: (newFile: UserFileModel) => void;
  isLoading: boolean;
}

const context = createContext<FileListContextProps>({
  fileList: [],
  updateFileList: undefined,
  isLoading: false,
});

export default context;
