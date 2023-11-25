import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WorkspaceProps } from "@/redux/slices/workspace";
import {
  add as addNotification,
  updateUtilities,
  initWorkspace,
} from "@/redux/actions";
import { RootState } from "@/redux/reducers";

import PopupLayout from "./Layout";
import axios from "axios";

const Rename: React.FC = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState<boolean>(false);
  const {
    workspaceReducer: {
      path: workspacePath,
      files: workspaceFiles,
      folders: workspaceFolders,
    },
    utilitiesReducer: { path, rename, isFolder },
  } = useSelector((state: RootState) => state);
  const [error, setError] = useState<string>("");

  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (path.trim() !== "" && rename && inputRef.current) {
      setInputValue(path);
      setDisplay(true);
    } else setDisplay(false);
  }, [path, rename]);

  const close = (e: React.MouseEvent<HTMLDivElement> | null) => {
    if (e) e.preventDefault();
    setError("");
    setDisplay(false);
    dispatch(
      updateUtilities({
        path: "",
        isFolder: false,
        create: false,
        rename: false,
        delete: false,
      })
    );
  };

  const renameTarget = async (_: React.MouseEvent<HTMLButtonElement>) => {
    if (
      inputValue.includes("/") ||
      inputValue.includes("\\") ||
      inputValue.includes("%") ||
      inputValue.includes("#")
    ) {
      setError('Cannot contain "/", "\\", "#" or "%"');
      return;
    }
    setError("");
    const body = {
      path: workspacePath,
      oldName: path,
      newName: inputValue,
    };
    const workspacePathArr = workspacePath.split("/");
    const target =
      path === "" ? "your workspace" : `/${workspacePathArr.join("/")}`;

    try {
      const accessToken = localStorage.getItem("accessToken");

      const { data } = await axios.post(
        "https://stackdrive-server.onrender.com/files/rename",
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        addNotification({
          message: `${isFolder ? "Folder" : "File"} renamed successfully`,
        })
      );

      const updatedWorkspace: WorkspaceProps[] = [];

      if (isFolder)
        workspaceFolders.forEach((folder: WorkspaceProps) => {
          if (folder.name === path)
            updatedWorkspace.push({
              ...folder,
              name: inputValue,
              type: "folder",
              modifiedAt: new Date().toString(),
            });
          else updatedWorkspace.push(folder);
        });
      else
        workspaceFiles.forEach((file: WorkspaceProps) => {
          if (file.name === path)
            updatedWorkspace.push({
              ...file,
              name: inputValue,
              type: inputValue.split(".").pop() || "",
            });
          else updatedWorkspace.push(file);
        });

      dispatch(
        initWorkspace({
          path: workspacePath,
          files: isFolder ? workspaceFiles : updatedWorkspace,
          folders: isFolder ? updatedWorkspace : workspaceFolders,
        })
      );

      close(null);
    } catch (error: any) {
      const status = error.response?.status;

      if (typeof status === "undefined") console.log(error);
      else if (status === 409)
        setError(`${inputValue} already exists in ${target}`);
    }
  };

  return (
    <PopupLayout
      display={display}
      heading="Rename"
      onClick={close}
      cta={
        <button
          type="button"
          className="mr-2 outline-none flex items-center text-white py-2 px-3
            rounded-sm"
          onClick={renameTarget}
          disabled={inputValue === path || inputValue.trim() === ""}
          style={{
            background:
              inputValue === path || inputValue.trim() === ""
                ? "#383838"
                : "#F97316",
          }}
        >
          <p className="text-xs font-medium">Rename</p>
        </button>
      }
    >
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.currentTarget.value);
        }}
        onClick={(_: React.MouseEvent<HTMLInputElement>) => {
          if (inputRef.current) inputRef.current.select();
        }}
        className={`outline-none bg-[#2C2C2C] p-2 rounded-sm
        text-sm font-normal w-full text-white ${
          error.trim() === "" ? "border-none" : "border-2 border-red-500"
        }`}
      />
      {error.trim() !== "" && (
        <p className="mt-2 text-red-500 text-xs font-semibold">{error}</p>
      )}
    </PopupLayout>
  );
};

export default Rename;
