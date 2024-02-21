"use client";

import { SnackbarProvider } from "notistack";
import FileList from "./sections/fileList";
import Header from "./sections/header";
import FileListProvider from "./utils/provider";

export default function Home() {
  /**
   * File List shows the list of files uploaded
   * Header contains the file uploader
   */
  return (
    <SnackbarProvider>
      <FileListProvider>
        <Header />
        <FileList />
      </FileListProvider>
    </SnackbarProvider>
  );
}
