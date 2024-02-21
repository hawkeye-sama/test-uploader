import { memo } from "react";

interface FileCardProps {
  filename: string;
  filePath: string;
}

function FileCard({ filename, filePath }: FileCardProps) {
  // Show only fewer letters
  const split = filename.split(".");
  const name = split[0];
  const extension = split[1];

  return (
    <div className="bg-white px-4 py-2 h-20 flex rounded-xl border border-border">
      <p className="self-center text-start text-font w-full">
        {name.length > 18 ? `${name.substring(0, 18)}.${extension}` : filename}
      </p>
      <div className="flex justify-end self-center">
        <a
          href={filePath}
          target="_blank"
          rel="noopener noreferrer"
          download
          aria-label="download"
          type="button"
          className="bg-primary hover:shadow-lg active:shadow-sm active:scale-95 group rounded-full w-12 h-12 flex items-center justify-center transition-all ease-in-out duration-300 hover:scale-110 hover:border-primary hover:bg-white border"
        >
          <svg
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
              className="group-hover:stroke-primary stroke-white transition-all ease-in-out duration-300"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487"
              className="group-hover:stroke-primary stroke-white transition-all ease-in-out duration-300"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default memo(FileCard);
