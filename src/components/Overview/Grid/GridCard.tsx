import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { add, initProperties, updateUtilities } from "@/redux/actions";

import { WorkspaceProps, initWorkspace } from "@/redux/slices/workspace";
import getFileIcon from "@/utils/files-helper/getFileIcon";
import download from "@/utils/files-helper/download";

// Icons
import EllipsisHorizontalIcon from "@/components/Icons/EllipsisHorizontal";
import StarIcon from "@/components/Icons/Star";
import axios from "axios";
import { RootState } from "@/redux/reducers";

interface Props {
  active: boolean;
  target: WorkspaceProps;
  handleEllipsisClick: (name: string) => void;
}

const GridCard: React.FC<Props> = ({ active, target, handleEllipsisClick }) => {
  const dispatch = useDispatch();
  const {
    path: workspacePath,
    files: workspaceFiles,
    folders: workspaceFolders,
  } = useSelector((state: RootState) => state.workspaceReducer);
  const router = useRouter();
  const pathname = usePathname();

  const handleOpen = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    if (target.type === "folder") router.push(`${pathname}/${target.name}`);
    else dispatch(initProperties({ target: { ...target, shared: [] } }));
  };

  const handleOperation = async (
    _: React.MouseEvent<HTMLButtonElement>,
    operation: "download" | "delete",
    path: string,
    type: string
  ) => {
    let target = "";

    if (workspacePath.trim() === "") target = path;
    else target = `${workspacePath}/${path}`;

    const accessToken = localStorage.getItem("accessToken");

    const uri =
      operation === "download"
        ? "https://stackdrive-server.onrender.com/files/download"
        : "https://stackdrive-server.onrender.com/files/delete";

    try {
      const { data } = await axios.post(
        uri,
        { target, isFolder: type === "folder" },
        {
          responseType: operation === "download" ? "blob" : "json",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (operation === "download") download(data as Blob, path);
      else {
        const updatedWorkspace: WorkspaceProps[] = [];

        if (type === "folder")
          workspaceFolders.forEach((folder: WorkspaceProps) => {
            if (folder.name === path) return;
            else updatedWorkspace.push(folder);
          });
        else
          workspaceFiles.forEach((file: WorkspaceProps) => {
            if (file.name === path) return;
            else updatedWorkspace.push(file);
          });

        if (type === "folder")
          dispatch(
            initWorkspace({
              path,
              files: workspaceFiles,
              folders: updatedWorkspace,
            })
          );
        else
          dispatch(
            initWorkspace({
              path,
              files: updatedWorkspace,
              folders: workspaceFolders,
            })
          );

        dispatch(
          add({
            message: `${
              type === "folder" ? "Folder" : "File"
            } deleted successfully`,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative cursor-pointer rounded-lg shadow-2xl bg-[#2C2C2C] select-none"
      onDoubleClick={handleOpen}
    >
      <div className="p-2 flex items-center justify-between">
        <span className="w-5 h-5 xs:w-7 xs:h-7">
          {getFileIcon(target.type.toLowerCase())}
        </span>
        <div>
          {/* <button
            type="button"
            className="outline-none border-none h-4 w-4 xs:h-5 xs:w-5 mr-2"
          >
            <StarIcon />
          </button> */}
          <button
            type="button"
            className="outline-none border-none h-5 w-5 hover:bg-[#4F4F4F] rounded-full"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleEllipsisClick(target.name);
            }}
          >
            <EllipsisHorizontalIcon />
          </button>
        </div>
      </div>
      <p
        className="p-2 mb-2 text-xs xs:text-sm font-medium whitespace-nowrap text-ellipsis overflow-hidden"
        style={{
          wordWrap: "break-word",
        }}
      >
        {target.name}
      </p>
      <ul
        className={`absolute top-9 right-0 w-24 xs:w-36 sm:w-48
        z-[5] rounded-md shadow-lg text-xs font-medium overflow-hidden
        ${
          active
            ? "opacity-100 pointer-events-auto block"
            : "opacity-0 pointer-events-none"
        }
        transition-opacity ease-linear duration-150`}
      >
        {target.type === "folder" && (
          <li>
            <button
              type="button"
              className="py-3 px-2 outline-none bg-[#3F3F3F] hover:bg-[#5F5F5F] w-full text-left"
              onClick={handleOpen}
            >
              Open
            </button>
          </li>
        )}
        <li>
          <button
            type="button"
            className="py-3 px-2 outline-none bg-[#3F3F3F] hover:bg-[#5F5F5F] w-full text-left"
            onClick={() => {
              dispatch(
                updateUtilities({
                  path: target.name,
                  create: false,
                  isFolder: target.type === "folder",
                  rename: true,
                  delete: false,
                })
              );
            }}
          >
            Rename
          </button>
        </li>
        <li>
          <button
            type="button"
            className="py-3 px-2 outline-none bg-[#3F3F3F] hover:bg-[#5F5F5F] w-full text-left"
            onClick={() => {
              dispatch(initProperties({ target: { ...target, shared: [] } }));
            }}
          >
            Properties
          </button>
        </li>
        <li>
          <button
            type="button"
            className="py-3 px-2 outline-none bg-[#3F3F3F] hover:bg-[#5F5F5F] w-full text-left"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleOperation(e, "download", target.name, target.type);
            }}
          >
            Download
          </button>
        </li>
        {/* <li>
          <button
            type="button"
            className="py-3 px-2 outline-none bg-[#3F3F3F] hover:bg-[#5F5F5F] w-full text-left"
          >
            Share
          </button>
        </li> */}
        <li>
          <button
            type="button"
            className="py-3 px-2 outline-none bg-[#3F3F3F] hover:bg-[#5F5F5F] w-full text-left"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleOperation(e, "delete", target.name, target.type);
            }}
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default GridCard;
