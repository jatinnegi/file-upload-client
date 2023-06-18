"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import links, { LinkItemProps } from "@/utils/links";
import StorageFolderIcon from "@/components/Icons/StorageFolder";

const InnerContainer: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <div className="w-10/12 mx-auto py-4">{children}</div>
);

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed hidden md:block w-72 border-r-[1px] border-r-[#383838]">
      <div className="border-b-[1px] border-b-[#383838]">
        <InnerContainer>
          <div className="h-10 flex items-center">
            <div className="relative h-7 w-7">
              <Image
                src="/assets/stack-drive.png"
                alt="stack-drive"
                priority
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="font-medium text-sm ml-2">
              <Link href="/workspace">StackDrive</Link>
            </p>
          </div>
        </InnerContainer>
      </div>
      <div
        className="sidebar-main overflow-y-scroll flex flex-col justify-between"
        style={{
          height: "calc(100vh - 73px)",
        }}
      >
        <div>
          {Object.keys(links).map((link: string) => (
            <div key={link} className="border-b-[1px] border-b-[#383838]">
              <InnerContainer>
                <div className="w-full">
                  <p className="text-xs">{link}</p>
                  <ul className="w-full mt-2">
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
                          } ${
                            linkItem.id === "overview-1"
                              ? "hover:bg-orange-500"
                              : "hover:bg-gray-[#383838]"
                          } w-full h-9 rounded-sm px-2 outline-none flex items-center justify-start mt-1`}
                          onClick={() => {}}
                        >
                          <span className="flex h-5 w-5 items-center justify-center">
                            {linkItem.icon}
                          </span>
                          <p className="text-xs font-medium ml-2">
                            {linkItem.text}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </InnerContainer>
            </div>
          ))}
          {/* <div className="border-b-[1px] border-b-[#383838]"> */}
          {/* <div>
            <InnerContainer>
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="flex items-center justify-center h-4 w-4 xs:h-6 xs:w-6">
                      <StorageFolderIcon stroke="#1D1D21" />
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
              </div>
            </InnerContainer>
          </div> */}
        </div>

        <InnerContainer>
          <button
            type="button"
            className="bg-[#303030] w-full py-3 rounded-md text-xs font-medium"
            onClick={() => {
              localStorage.removeItem("accessToken");
              router.push("/get-started");
            }}
          >
            Logout
          </button>
        </InnerContainer>
      </div>
    </div>
  );
};

export default Sidebar;
