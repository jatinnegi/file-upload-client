import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import links, { LinkItemProps } from "@/utils/links";
import StorageFolderIcon from "@/components/Icons/StorageFolder";

interface Props {
  displayMenu: boolean;
  setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<Props> = ({ displayMenu, setDisplayMenu }) => {
  const router = useRouter();

  return (
    <div
      className="md:hidden fixed top-0 w-full h-full z-20"
      style={{
        background:
          "linear-gradient(75deg, rgba(29, 29, 33, 0.48) 0%, rgb(29, 29, 33) 100%)",
        opacity: displayMenu ? "1" : "0",
        pointerEvents: displayMenu ? "all" : "none",
        transition: "all 0.3s ease-out",
      }}
      onClick={() => {
        setDisplayMenu(false);
      }}
    >
      <div
        className="absolute top-0 h-full w-4/5 max-w-xs z-20 bg-[#383838] overflow-y-scroll"
        style={{
          left: displayMenu ? "0px" : "-100%",
          transition: "left 0.3s ease-out",
        }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        <div className="w-11/12 mx-auto py-4 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center">
              <div className="relative h-6 w-6 xs:h-7 xs:w-7">
                <Image
                  src="/assets/stack-drive.png"
                  alt="stack-drive"
                  priority
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="font-medium text-xs xs:text-md ml-2">
                <Link href="/workspace">StackDrive</Link>
              </p>
            </div>
            {Object.keys(links).map((link: string) => (
              <div key={link} className="mt-6 w-full">
                <div className="w-full mb-8">
                  <p className="text-[11px] xs:text-xs">{link}</p>
                  <ul className="w-full my-2">
                    {links[link].map((linkItem: LinkItemProps) => (
                      <li
                        key={linkItem.id}
                        className={`w-full ${
                          linkItem.id === "overview-1"
                            ? "text-white"
                            : "text-gray-200"
                        }`}
                      >
                        <button
                          type="button"
                          className={`${
                            linkItem.id === "overview-1"
                              ? "bg-orange-500"
                              : "bg-none"
                          } w-full h-8 xs:h-9 rounded-sm px-2 outline-none flex items-center justify-start my-1`}
                          onClick={() => {}}
                        >
                          <span className="flex h-4 w-4 xs:h-6 xs:w-6 items-center justify-center">
                            {linkItem.icon}
                          </span>
                          <p className="text-[11px] xs:text-xs font-medium ml-2">
                            {linkItem.text}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            {/* <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="flex items-center justify-center h-4 w-4 xs:h-6 xs:w-6">
                    <StorageFolderIcon />
                  </span>
                  <p className="ml-2 text-[11px] xs:text-xs">Storage</p>
                </div>
                <p className="text-[11px] xs:text-xs font-medium">45%</p>
              </div>
              <div className="w-full bg-[#46464a] rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: "45%" }}
                ></div>
                <p className="text-[10px] font-normal mt-1.5">
                  90 MB used of 200 MB
                </p>
              </div>
              <button
              type="button"
              className="mt-4 mb-2 w-full bg-orange-500 text-xs rounded-sm
              py-3 font-medium"
              >
              Upgrade Plan
            </button>
            </div> */}
          </div>
          <div>
            <button
              type="button"
              className="bg-[#2A2A2A] w-full py-3 rounded-md text-xs font-medium"
              onClick={() => {
                localStorage.removeItem("accessToken");
                router.push("/get-started");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
