"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { initWorkspace, setWorkspacePath } from "@/redux/actions";
import { FileWithPath } from "react-dropzone";
import Uploader from "@/components/Uploader";
import MainLayout from "@/components/MainLayout";

import StorageDetail from "@/components/Overview/StorageDetail";
import axios from "axios";
import { RootState } from "@/redux/reducers";

const Workspace: NextPage = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const dispatch = useDispatch();
  const { files: workspaceFiles, folders: workspaceFolders } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const getWorkspace = async (workspacePath: string) => {
    try {
      const body = { path: workspacePath };
      const accessToken = localStorage.getItem("accessToken");

      const {
        data: { files, folders },
      } = await axios.post("https://api.chat-1337.com/files", body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!files && !folders) return;

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
    let { slug } = params;
    if (typeof slug !== "string") return;
    slug = slug.replace(/%40/g, "@");
    slug = slug.replace(/%20/g, " ");
    getWorkspace(`/${slug}`);
    dispatch(setWorkspacePath({ path: slug }));
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
