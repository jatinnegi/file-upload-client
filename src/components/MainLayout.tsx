"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FileWithPath } from "react-dropzone";

import { useRouter } from "next/navigation";

// Components
import AppBar from "@/components/AppBar/AppBar";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header/Header";
import Container from "@/components/Container";
import Actions from "@/components/Actions/Actions";
import UploaderPopup from "@/components/Popup/Uploader";
import RenamePopup from "@/components/Popup/Rename";
import CreateFolderPopup from "@/components/Popup/CreateFolder";
import Notification from "@/components/Notification";
import Properties from "@/components/Properties";
import Loading from "@/components/Loading";

export interface PreviewStructureProps {
  [key: string]: {
    fileType: string;
    fileName: string;
    fileSize: number;
    totalItems: number;
  };
}

interface Props {
  isLoading?: boolean;
  parentFiles?: FileWithPath[];
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ isLoading, parentFiles, children }) => {
  const router = useRouter();
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [displayUploader, setDisplayUploader] = useState<boolean>(false);
  const [uniqueKeys, setUniqueKeys] = useState<Set<string>>(new Set<string>());
  const [totalItems, setTotalItems] = useState<number>(0);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [previewStructure, setPreviewStructure] =
    useState<PreviewStructureProps>({});
  const [totalSize, setTotalSize] = useState<number>(0);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length > 0) setDisplayUploader(true);
      let preview: PreviewStructureProps = {};

      const updatedUniqueKeys = new Set<string>(uniqueKeys);
      const updatedFiles: FileWithPath[] = files;
      let updatedTotalItems = totalItems;

      acceptedFiles.forEach((file: FileWithPath) => {
        if (!file.path) return;

        const key = file.path.includes("/")
          ? file.path.split("/")[1]
          : file.path;

        if (uniqueKeys.has(key)) return;

        updatedUniqueKeys.add(key);
        updatedTotalItems++;
        updatedFiles.push(file);

        if (file.path.includes("/")) {
          if (key in preview) {
            preview = {
              ...preview,
              [key]: {
                fileName: key,
                fileType: "folder",
                fileSize: preview[key].fileSize + file.size,
                totalItems: preview[key].totalItems + 1,
              },
            };
          } else
            preview[key] = {
              fileName: key,
              fileType: "folder",
              fileSize: file.size,
              totalItems: 1,
            };
        } else {
          let fileType = file.name.split(".").pop();
          if (!fileType) fileType = "file";

          preview[file.path] = {
            fileName: file.name,
            fileType: fileType.toLowerCase(),
            fileSize: file.size,
            totalItems: 1,
          };
        }
      });

      setTotalItems(updatedTotalItems);
      setUniqueKeys(updatedUniqueKeys);
      setFiles(updatedFiles);
      setPreviewStructure({ ...previewStructure, ...preview });
    },
    [totalItems]
  );

  const removeFile = (key: string) => {
    let find: string;

    if (previewStructure[key].totalItems === 1) find = key;
    else find = `/${key}`;

    const updatedTotalItems = totalItems - previewStructure[key].totalItems;

    const updatedPreviewStructure = previewStructure;
    delete updatedPreviewStructure[key];
    setPreviewStructure(updatedPreviewStructure);

    const updatedFiles: FileWithPath[] = files.filter(
      (file: FileWithPath) => !file.path?.startsWith(find)
    );

    setFiles(updatedFiles);

    setTotalItems(updatedTotalItems);
    const updatedUniqueKeys: Set<string> = uniqueKeys;
    updatedUniqueKeys.delete(key);
    setUniqueKeys(updatedUniqueKeys);
  };

  const resetUploader = (updatedDisplay = false) => {
    setTotalItems(0);
    setUniqueKeys(new Set<string>());
    setPreviewStructure({});
    setFiles([]);
    setDisplayUploader(updatedDisplay);
    setTotalSize(0);
  };

  const updateUploader = (filesFail: string[], pathsFail: string[]) => {
    let updatedTotalItems = totalItems;
    let updatedTotalSize = totalSize;
    const updatedFiles: FileWithPath[] = [];
    const updatedPreviewStructure: PreviewStructureProps = previewStructure;
    const updatedUniqueKeys: Set<string> = uniqueKeys;

    const pathsFailSet = new Set<string>(pathsFail);
    const filesFailSet = new Set<string>(filesFail);

    files.forEach((file: FileWithPath) => {
      if (file.path && pathsFailSet.has(file.path)) {
        updatedFiles.push(file);
      }
    });

    Object.keys(previewStructure).forEach((key: string) => {
      if (!filesFailSet.has(key)) {
        if (updatedUniqueKeys.has(key)) updatedUniqueKeys.delete(key);
        updatedTotalItems -= updatedPreviewStructure[key].totalItems;
        updatedTotalSize -= updatedPreviewStructure[key].fileSize;
        delete updatedPreviewStructure[key];
      }
    });

    setTotalItems(updatedTotalItems);
    setTotalSize(updatedTotalSize);
    setPreviewStructure(updatedPreviewStructure);
    setFiles(updatedFiles);
    setUniqueKeys(uniqueKeys);
  };

  useEffect(() => {
    if (parentFiles) onDrop(parentFiles);
  }, [parentFiles]);

  useEffect(() => {
    let updatedTotalSize = 0;

    Object.keys(previewStructure).forEach((key: string) => {
      updatedTotalSize += previewStructure[key].fileSize;
    });

    setTotalSize(updatedTotalSize);
  }, [totalItems]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) setUserLoading(true);
    else router.push("/");
  }, []);

  if (!userLoading) return <div className="h-full w-full bg-[#1D1D21]" />;

  return (
    <>
      <AppBar />
      <Sidebar />
      <Notification />
      <Properties />
      <div className="ml-0 md:ml-[288px] flex flex-1 flex-col">
        <Header />
        <Actions setDisplayUploader={setDisplayUploader} />
        {isLoading ? (
          <div
            className="relative w-full h-[100vh] max-h-[750px]
            pt-28 md:pt-36 pb-4 flex items-center justify-center"
          >
            <Loading />
          </div>
        ) : (
          <Container>{children}</Container>
        )}
      </div>
      <RenamePopup />
      <CreateFolderPopup />
      <UploaderPopup
        display={displayUploader}
        totalItems={totalItems}
        totalSize={totalSize}
        previewStructure={previewStructure}
        files={files}
        onDrop={onDrop}
        updateUploader={updateUploader}
        removeFile={removeFile}
        resetUploader={resetUploader}
      />
    </>
  );
};

export default MainLayout;
