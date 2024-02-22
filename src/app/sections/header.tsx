import { memo } from "react";
import FileUploader from "../components/fileUploader";

function Header() {
  return (
    <section id="header">
      <div className="ml-auto mr-auto flex flex-col items-center justify-center md:flex-row py-10 md:py-10">
        <div className="w-full">
          <div className="gap-2 mx-auto text-center gap-y-4 text-base md:text-xl md:line-h rounded-3xl flex flex-col p-6 md:px-20 px-2 w-full">
            <h1 className="mt-4 text-2xl font-bold md:text-4xl text-center text-header">
              PDF <span className="text-primary">Uploader & Downloader</span>
            </h1>
            <p className="text-lg text-center text-font">
              The usecase of this app is to allow users to upload pdf files and
              also allow them to download files.
            </p>
            <div className="flex self-center w-full md:w-[30rem]">
              <FileUploader />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Header);
