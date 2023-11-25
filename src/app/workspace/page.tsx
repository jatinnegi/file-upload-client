"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initWorkspace, setWorkspacePath } from "@/redux/actions";
import { FileWithPath } from "react-dropzone";
import Uploader from "@/components/Uploader";
import MainLayout from "@/components/MainLayout";

import StorageDetail from "@/components/Overview/StorageDetail";
import axios from "axios";
import { RootState } from "@/redux/reducers";

const Workspace: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const dispatch = useDispatch();
  const { files: workspaceFiles, folders: workspaceFolders } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const getWorkspace = async () => {
    try {
      const body = { path: "" };
      const accessToken = localStorage.getItem("accessToken");

      const {
        data: { files, folders },
      } = await axios.post(
        "https://stackdrive-server.onrender.com/files",
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!files && !folders) {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        return;
      }

      dispatch(initWorkspace({ files, folders }));

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getWorkspace();
    dispatch(setWorkspacePath({ path: "" }));
  }, []);

  return (
    <MainLayout isLoading={isLoading} parentFiles={files}>
      {workspaceFiles.length === 0 && workspaceFolders.length === 0 && (
        <Uploader setFiles={setFiles} />
      )}
      <StorageDetail />
    </MainLayout>
  );
};

export default Workspace;
