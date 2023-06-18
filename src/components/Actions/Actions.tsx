import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/reducers";
import { updateUtilities } from "@/redux/actions";

import ListViewIcon from "@/components/Icons/ListView";
import GridViewIcon from "@/components/Icons/GridView";
import PlusIcon from "@/components/Icons/Plus";
import UploadIcon from "@/components/Icons/Upload";

interface Props {
  setDisplayUploader: React.Dispatch<React.SetStateAction<boolean>>;
}

const Actions: React.FC<Props> = ({ setDisplayUploader }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [menu, setMenu] = useState<boolean>(false);
  const [paths, setPaths] = useState<string[]>([]);

  const { path: workspacePath } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const handleClick = () => {
    if (menu) setMenu(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [menu]);

  useEffect(() => {
    const updatedPaths = workspacePath.split("/");
    if (updatedPaths.length === 1 && updatedPaths[0] === "") setPaths([]);
    else setPaths(updatedPaths);
  }, [workspacePath]);

  return (
    <div
      className="fixed top-[48px] md:top-[73px] w-full md:w-[calc(100vw-288px)] backdrop-blur-sm z-10"
      style={{
        backgroundColor: "rgba(29, 29, 33, 0.8)",
      }}
    >
      <div
        className="relative h-[72px] w-11/12 max-w-7xl mx-auto
       flex items-center justify-between"
      >
        <div className="flex items-center">
          <div className="flex items-center overflow-hidden">
            {paths.length < 2 ? (
              <button
                type="button"
                className="text-left text-[10px] xs:text-xs sm:mt-0 sm:text-sm 
                outline-none border-none hover:underline"
                onClick={() => {
                  router.push("/workspace");
                }}
              >
                My Workspace
              </button>
            ) : (
              <p className="text-xs sm:text-sm">...</p>
            )}
            {paths.slice(-2).map((path: string) => (
              <div key={path}>
                <span className="mx-1 sm:mx-2">/</span>
                <button
                  type="button"
                  className="text-left text-[10px] xs:text-xs sm:text-sm outline-none border-none
                      max-w-[40px] xs:max-w-[50px] sm:max-w-[68px] md:max-w-[80px] lg:max-w-[150px] 
                      whitespace-nowrap text-ellipsis overflow-hidden"
                  onClick={() => {
                    const pathArray = pathname.split("/");
                    let href = "";

                    for (let i = 0; i < pathArray.length; i++) {
                      if (pathArray[i].trim() === "") continue;
                      if (
                        pathArray[i]
                          .replace(/%20/g, " ")
                          .replace("/%40/g", "@") === path
                      )
                        break;
                      href += `/${pathArray[i]}`;
                    }
                    href += `/${path}`;

                    router.push(href);
                  }}
                >
                  {path}
                </button>
              </div>
            ))}
            {/* {paths.length <= 2
              ? paths.map((path: string) => (
                  <div key={path}>
                    <span className="mx-1 sm:mx-2">/</span>
                    <button
                      type="button"
                      className="text-left text-[10px] xs:text-xs sm:text-sm outline-none border-none
                      max-w-[40px] xs:max-w-[50px] sm:max-w-[68px] md:max-w-[80px] lg:max-w-[150px] 
                      whitespace-nowrap text-ellipsis overflow-hidden"
                      onClick={() => {
                        const pathArray = pathname.split("/");
                        let href = "";

                        for (let i = 0; i < pathArray.length; i++) {
                          if (pathArray[i].trim() === "") continue;
                          if (pathArray[i] === path) break;
                          href += `/${pathArray[i]}`;
                        }
                        href += `/${path}`;

                        router.push(href);
                      }}
                    >
                      {path}
                    </button>
                  </div>
                ))
              : getLastTwo(paths)} */}
          </div>
        </div>
        <div className="flex items-center justify-center">
          {/* <button
            type="button"
            className="outline-none flex items-center bg-[#383838] text-[#CCCCCC] py-2 px-3
            rounded-sm"
          >
            <span className="block h-4 w-4 sm:h-5 sm:w-5">
              <GridViewIcon />
              <ListViewIcon />
            </span>
            <p className="hidden sm:block text-xs font-medium ml-1">View</p>
          </button> */}
          <div
            className="relative ml-2 sm:ml-3"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
            }}
          >
            <button
              type="button"
              className="outline-none flex items-center bg-orange-500 text-white py-2 px-3
            rounded-sm"
              onClick={() => {
                setMenu(true);
              }}
            >
              <span className="block h-4 w-4 sm:h-5 sm:w-5">
                <PlusIcon />
              </span>
              <p className="hidden sm:block text-xs font-medium ml-1">Create</p>
            </button>
            <ul
              className={`${
                menu
                  ? "opacity-1 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              } absolute bottom-[-87px] right-0 bg-[#383838] w-40 rounded-sm
              shadow-lg transition-opacity ease-linear duration-100`}
            >
              <li>
                <button
                  type="button"
                  className="flex items-center justify-start text-left w-full py-3 px-2 hover:bg-[#3F3F3F]"
                  onClick={() => {
                    console.log("new folder");
                    dispatch(
                      updateUtilities({
                        create: true,
                        rename: false,
                        isFolder: true,
                        delete: false,
                        path: workspacePath,
                      })
                    );
                    setMenu(false);
                  }}
                >
                  <span className="block h-4 w-4">
                    <PlusIcon />
                  </span>
                  <p className="text-xs ml-2">New Folder</p>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center justify-start text-left w-full py-3 px-2 hover:bg-[#3F3F3F]"
                  onClick={() => {
                    setDisplayUploader(true);
                    setMenu(false);
                  }}
                >
                  <span className="block h-4 w-4">
                    <UploadIcon />
                  </span>
                  <p className="text-xs ml-2">Upload files/folder</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actions;
