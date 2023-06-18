"use client";
import React, { useCallback } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import WorkspaceImage from "@/components/Images/Workspace";

interface Props {
  setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
}

const Uploader: React.FC<Props> = ({ setFiles }) => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        {...getRootProps()}
        className={`relative overflow-hidden cursor-pointer flex flex-col sm:flex-row w-full
      ${
        isDragActive ? "bg-[#313133]" : "bg-[#252527]"
      } rounded-md border-[1px] border-dashed border-[#383838]
     p-10 items-center justify-start hover:bg-[#313133] transition-all ease-linear`}
      >
        <div className="w-full sm:w-2/5">
          <WorkspaceImage />
        </div>
        <div className="mt-6 sm:mt-0 sm:ml-4 lg:ml-8 flex-1 flex flex-col items-center sm:items-start">
          <p className="text-xs xs:text-sm lg:text-2xl font-medium lg:w-80 sm:text-left">
            Drop or Select File/Folders
          </p>
          <p className="text-[10px] xs:text-xs lg:text-sm text-gray-400 mt-2 lg:w-80 text-center sm:text-left">
            Drop files/folder here or click to browse through your machine
          </p>
        </div>
        <input
          {...getInputProps()}
          className="bg-blue-500 absolute top-0 left-0 h-full w-full"
        />
      </div>
    </>
  );
};

export default Uploader;
