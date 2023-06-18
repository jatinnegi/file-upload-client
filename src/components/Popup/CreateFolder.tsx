import React, { useEffect, useState } from "react";
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

const CreateFolder: React.FC = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState<boolean>(false);
  const {
    workspaceReducer: {
      path: workspacePath,
      files: workspaceFiles,
      folders: workspaceFolders,
    },
    utilitiesReducer: { path, create, isFolder },
  } = useSelector((state: RootState) => state);
  const [error, setError] = useState<string>("");

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (create) {
      setDisplay(true);
    } else setDisplay(false);
  }, [path, create]);

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

  const createTarget = async (_: React.MouseEvent<HTMLButtonElement>) => {
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
    const path = `/${workspacePath}/${inputValue}`;

    const body = {
      path: `/${workspacePath}/${inputValue}`,
    };

    try {
      const accessToken = localStorage.getItem("accessToken");

      const { data } = await axios.post(
        "https://api.chat-1337.com/files/create",
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
          message: "Folder added successfully",
        })
      );

      const updatedWorkspace: WorkspaceProps[] = [
        ...workspaceFolders,
        {
          name: inputValue,
          items: 0,
          size: 0,
          type: "folder",
          createdAt: new Date().toString(),
          modifiedAt: new Date().toString(),
        },
      ];

      const sortedWorkspace = updatedWorkspace.sort(
        (a: WorkspaceProps, b: WorkspaceProps) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }
      );

      dispatch(
        initWorkspace({
          path: workspacePath,
          files: workspaceFiles,
          folders: sortedWorkspace,
        })
      );

      close(null);
    } catch (error: any) {
      const status = error.response?.status;

      if (typeof status === "undefined") console.log(error);
      else if (status === 409)
        setError(
          `${inputValue} already exists in ${
            workspacePath === "" ? " your workspace" : workspacePath
          }`
        );
    }
  };

  return (
    <PopupLayout
      display={display}
      heading="Create Folder"
      onClick={close}
      cta={
        <button
          type="button"
          className="mr-2 outline-none flex items-center text-white py-2 px-3
            rounded-sm"
          onClick={createTarget}
          disabled={inputValue.trim() === ""}
          style={{
            background:
              inputValue === path || inputValue.trim() === ""
                ? "#383838"
                : "#F97316",
          }}
        >
          <p className="text-xs font-medium">Create</p>
        </button>
      }
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.currentTarget.value);
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

export default CreateFolder;
