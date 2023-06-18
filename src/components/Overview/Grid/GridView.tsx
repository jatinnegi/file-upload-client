import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducers";
import { WorkspaceProps } from "@/redux/slices/workspace";

import GridCard from "./GridCard";

const GridView: React.FC = () => {
  const { files, folders } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const [active, setActive] = useState<null | string>(null);

  const handleClick = () => {
    setActive(null);
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  if (files.length === 0 && folders.length === 0) return <></>;

  const handleEllipsisClick = (name: string) => {
    setActive(name);
  };

  return (
    <div className="w-full">
      {folders.length > 0 && (
        <div className="mb-8">
          <p className="text-sm md:text-md lg:text-lg font-medium">Folders</p>
          <div
            className="my-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
            gap-2 sm:gap-4"
          >
            {folders.map((folder: WorkspaceProps) => (
              <GridCard
                key={folder.name}
                active={active === folder.name}
                target={folder}
                handleEllipsisClick={handleEllipsisClick}
              />
            ))}
          </div>
        </div>
      )}
      {files.length > 0 && (
        <div className="mb-8">
          <p className="text-sm md:text-md lg:text-lg font-medium">Files</p>
          <div
            className="my-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
            gap-2 sm:gap-4"
          >
            {files.map((file: WorkspaceProps) => (
              <GridCard
                key={file.name}
                active={active === file.name}
                target={file}
                handleEllipsisClick={handleEllipsisClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GridView;
