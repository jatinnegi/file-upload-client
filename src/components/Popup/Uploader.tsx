"use client";
import React, { useEffect, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { add, updateWorkspace } from "@/redux/actions";

import PopupLayout from "@/components/Popup/Layout";
import WorkspaceImage from "@/components/Images/Workspace";
import UploadIcon from "@/components/Icons/Upload";
import CloseIcon from "@/components/Icons/Close";

import getFileIcon from "@/utils/files-helper/getFileIcon";
import convertSize from "@/utils/files-helper/convertSize";
import { PreviewStructureProps } from "@/components/MainLayout";

import axios from "axios";
import { getFiles } from "@/utils/files-helper/getFiles";
import { RootState } from "@/redux/reducers";
import workspace from "@/redux/slices/workspace";

interface Props {
  display: boolean;
  totalItems: number;
  totalSize: number;
  previewStructure: PreviewStructureProps;
  files: FileWithPath[];
  updateUploader: (filesFail: string[], filesSuccess: string[]) => void;
  removeFile: (key: string) => void;
  onDrop: (acceptedFiles: FileWithPath[]) => void;
  resetUploader: (updatedDisplay?: boolean) => void;
}

const Uploader: React.FC<Props> = ({
  display,
  totalItems,
  totalSize,
  previewStructure,
  files,
  updateUploader,
  removeFile,
  resetUploader,
  onDrop,
}) => {
  const dispatch = useDispatch();
  const [uploaded, setUploaded] = useState<boolean>(false);
  const { path: workspacePath } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (uploaded && files.length === 0 && Object.keys(errors).length === 0) {
      resetUploader();
      setUploaded(false);
      if (uploaded) dispatch(add({ message: "Files uploaded successfully" }));
    }
  }, [uploaded, files, errors]);

  const uploadFiles = async (
    overwrite = false,
    uploadFiles = files,
    singleUpload = false
  ) => {
    const formData = new FormData();
    uploadFiles.forEach((file: FileWithPath) => {
      formData.append(file.path || file.name, file);
    });

    try {
      const accessToken = localStorage.getItem("accessToken");
      let path = workspacePath.replace(/\//g, "*");

      const {
        data: { folders, files, filesFail, pathsFail, uploaded },
      } = await axios.post(
        `https://stackdrive-server.onrender.com/files/upload?overwrite=${overwrite}&workspace=${path}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (parseInt(uploaded) > 0) {
        setUploaded(true);
        if (!overwrite) dispatch(updateWorkspace({ files, folders }));
      }

      if (singleUpload) return;

      updateUploader(filesFail, pathsFail);

      const errorBody: Record<string, string> = {};
      filesFail.forEach((key: string) => {
        errorBody[key] =
          workspacePath === ""
            ? `${key} already exists in your workspace`
            : `/${workspacePath}/${key} already exists`;
      });

      setErrors(errorBody);
    } catch (error) {
      console.log(error);
    }
  };

  const removeErrors = (key: string) => {
    const updatedErrors = errors;
    if (!updatedErrors[key]) return;

    delete updatedErrors[key];

    setErrors(updatedErrors);
  };

  const remove = (key: string) => {
    removeErrors(key);
    removeFile(key);
  };

  return (
    <PopupLayout
      heading="Upload Files"
      cta={
        <>
          <button
            type="button"
            className="mr-2 outline-none flex items-center bg-[#383838] text-white py-2 px-3
            rounded-md"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              setErrors({});
              resetUploader(true);
            }}
            style={{
              display: totalItems > 0 ? "block" : "none",
            }}
          >
            <p className="hidden xs:block text-xs font-medium">
              {Object.keys(errors).length > 0 ? "Skip all" : "Remove all"}
            </p>
          </button>
          <button
            type="button"
            className="outline-none flex items-center bg-orange-500 text-white py-2 px-3
            rounded-md"
            disabled={totalItems === 0}
            onClick={() => {
              if (Object.keys(errors).length === 0) uploadFiles();
              else uploadFiles(true);
            }}
          >
            <span className="block h-4 w-4 sm:h-5 sm:w-5">
              <UploadIcon />
            </span>
            <p className="hidden xs:block text-xs font-medium ml-1">
              {Object.keys(errors).length > 0 ? "Overwrite" : "Upload"}
              {totalItems
                ? ` ${totalItems} ${totalItems === 1 ? "item" : "items"}`
                : ""}
              {totalSize > 0 ? ` (${convertSize(totalSize)})` : ""}
            </p>
          </button>
        </>
      }
      display={display}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (uploaded) dispatch(add({ message: "Files uploaded successfully" }));
        setUploaded(false);
        setErrors({});
        resetUploader();
      }}
    >
      <div
        {...getRootProps()}
        className={`mt-4 relative overflow-hidden cursor-pointer flex flex-col w-full
      ${
        isDragActive ? "bg-[#313133]" : "bg-[#252527]"
      } rounded-md border-[1px] border-dashed border-[#383838]
     p-10 items-center justify-start hover:bg-[#313133] transition-all ease-linear`}
      >
        <div className="w-full md:w-3/5">
          <WorkspaceImage />
        </div>
        <div className="mt-6 flex-1 flex flex-col items-center">
          <p className="text-xs sm:text-base font-medium text-center">
            Drop or Select File/Folders
          </p>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-1 text-center">
            Drop files/folder here or click to browse through your machine
          </p>
        </div>
        <input
          {...getInputProps()}
          className="absolute top-0 left-0 h-full w-full"
        />
      </div>
      <div className="w-full mt-4 mb-1">
        {Object.keys(previewStructure).map((key: string) => (
          <div
            key={key}
            className={`flex flex-col p-3 mb-2 rounded-md border-[1px] ${
              errors[key] ? "border-red-500" : "border-[#383838]"
            }`}
          >
            <div className="flex items-center">
              <span className="h-9 w-9 rounded-md">
                {getFileIcon(previewStructure[key].fileType)}
              </span>
              <div className="flex-1 mx-4 flex flex-col items-start">
                <p className="text-sm">{previewStructure[key].fileName}</p>
                <div className="mt-1 flex items-center text-xs text-gray-400">
                  {previewStructure[key].totalItems > 1 && (
                    <p className="mr-2">
                      {previewStructure[key].totalItems} items
                    </p>
                  )}
                  <p>{convertSize(previewStructure[key].fileSize)}</p>
                </div>
              </div>
              <button
                type="button"
                className="outline-none h-6 w-6 hover:bg-[#383838] rounded-md p-1"
                onClick={() => {
                  remove(key);
                }}
              >
                <CloseIcon />
              </button>
            </div>
            {errors[key] && (
              <div className="flex items-center justify-end mt-4">
                <p
                  className="flex-1 mr-4 text-red-500 text-xs font-semibold overflow-x-hidden"
                  style={{}}
                >
                  {errors[key]}
                </p>
                <button
                  type="button"
                  className="bg-[#383838] text-xs py-2 px-3 rounded-md mr-2"
                  onClick={() => {
                    remove(key);
                  }}
                >
                  Skip
                </button>
                <button
                  type="button"
                  className="bg-[#383838] text-xs py-2 px-3 rounded-md"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    const singleFiles = getFiles(files, previewStructure, key);

                    uploadFiles(true, singleFiles, true);
                    remove(key);
                  }}
                >
                  Overwrite
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </PopupLayout>
  );
};

export default Uploader;
