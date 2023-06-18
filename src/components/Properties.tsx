import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/reducers";
import { resetProperties } from "@/redux/actions";
import { formatDate } from "@/utils/date";
import getFileIcon from "@/utils/files-helper/getFileIcon";
import convertSize from "@/utils/files-helper/convertSize";

import StarIcon from "@/components/Icons/Star";
import TrashIcon from "@/components/Icons/Trash";

const users = [1, 2, 3, 4, 5];

const Properties: React.FC = () => {
  const { name, items, size, type, createdAt, modifiedAt, shared } =
    useSelector((state: RootState) => state.propertiesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (name.trim() === "") document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";
  }, [name]);

  return (
    <>
      <div
        className="fixed top-0 w-full h-full z-20"
        style={{
          opacity: name.trim() !== "" ? "1" : "0",
          pointerEvents: name.trim() !== "" ? "all" : "none",
        }}
        onClick={() => {
          dispatch(resetProperties());
        }}
      />
      <div
        className="properties fixed top-0 right-0 h-full w-4/5 
        max-w-xs z-20 overflow-y-scroll flex flex-col backdrop-blur-3xl"
        style={{
          boxShadow: "10px 0px #000 1px",
          right: name.trim() !== "" ? "0px" : "-100%",
          transition: "right 0.3s ease-out",
        }}
      >
        <div
          className="px-4 py-4 sm:py-6 flex items-center justify-between"
          style={{
            background: "rgba(35, 35, 35, 0.65)",
          }}
        >
          <p className="text-base font-medium">Properties</p>
          {/* <button
            type="button"
            className="outline-none border-none bg-none h-6 w-6"
          >
            <StarIcon />
          </button> */}
        </div>
        <div
          className="p-4"
          style={{
            background: "rgba(56, 56, 56, 0.65)",
          }}
        >
          <div className="border-dashed border-b-[1px] border-b-[#4F4F4F]">
            <span className="block w-8 h-8 xs:w-10 xs:h-10">
              {getFileIcon(type.toLowerCase())}
            </span>
            <p className="text-sm xs:text-base font-semibold mt-2 my-4">
              {name}
            </p>
          </div>
          <div className="py-4 flex text-xs border-dashed border-b-[1px] border-b-[#4F4F4F]">
            <div className="text-gray-200 mr-12">
              <p className="py-2 font-medium">Size</p>
              {type === "folder" && <p className="py-2 font-medium">Items</p>}
              <p className="py-2 font-medium">Created at</p>
              <p className="py-2 font-medium">Modified at</p>
            </div>
            <div className="text-white">
              <p className="py-2">{convertSize(size)}</p>
              {type === "folder" && <p className="py-2">{items}</p>}
              <p className="py-2">{formatDate(createdAt)}</p>
              <p className="py-2">{formatDate(modifiedAt)}</p>
            </div>
          </div>
        </div>
        <div
          className="flex-1 p-4 py-2"
          style={{
            background: "rgba(56, 56, 56, 0.65)",
          }}
        >
          {/* <p className="text-sm font-medium">Shared with</p> */}
          {/* <ul className="my-4">
            {users.map((user: number) => (
              <li key={user} className="py-3 text-sm flex items-center">
                <span
                  className="h-8 w-8 sm:h-10 sm:w-10 flex items-center relative
                border-gray-500"
                >
                  <Image
                    src="/assets/admin.jpg"
                    alt="profile-image"
                    className="rounded-full"
                    priority
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </span>
                <div className="flex-1 overflow-hidden mx-4">
                  <p className="text-sm font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                    Jatin Negi
                  </p>
                  <p className="text-gray-200 text-xs whitepsace-nowrap text-ellipsis overflow-hidden">
                    jatin@gmail.com
                  </p>
                </div>
                <button
                  type="button"
                  className="outline-none border-none p-2 flex items-center rounded-sm 
                bg-[rgba(80,80,80,0.65)] hover:bg-[rgba(100,100,100,0.65)]"
                >
                  <span className="block h-4 w-4">
                    <TrashIcon />
                  </span>
                  <p className="hidden sm:block ml-2 text-xs">Remove</p>
                </button>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </>
  );
};

export default Properties;
