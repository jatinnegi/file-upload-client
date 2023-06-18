import React from "react";
import Image from "next/image";

import SearchIcon from "@/components/Icons/Search";
import BellIcon from "@/components/Icons/Bell";

const Header: React.FC = () => {
  return (
    <div
      className="fixed hidden md:block border-b-[1px] border-b-[#383838] bg-[#1D1D21] z-10"
      style={{
        width: "calc(100vw - 288px)",
      }}
    >
      <div
        className="h-[72px] w-11/12 max-w-7xl mx-auto overflow-x-hidden
       flex items-center justify-between"
      >
        <div className="md:w-4/5 lg:w-3/5 flex items-center">
          <p className="text-sm font-medium tracking-wide">File Manager</p>
          {/* <div className="bg-[#27292D] flex h-10 flex-1 ml-8 border-[1px] border-[#383838] rounded-sm">
            <span className="h-10 w-10 p-2.5">
              <SearchIcon stroke="#C2C2C2" />
            </span>
            <input
              type="text"
              placeholder="Search here"
              className="outline-none bg-inherit h-full w-full text-xs pr-4
              font-medium"
            />
          </div> */}
        </div>
        <div className="flex items-center">
          {/* <button type="button" className="bg-none outline-none mr-6 h-5 w-5">
            <BellIcon />
          </button> */}
          <button
            type="button"
            className="h-9 w-9 flex items-center relative
            outline-none border-gray-500"
          >
            <Image
              src="/assets/admin.jpg"
              alt="profile-image"
              className="rounded-full"
              priority
              fill
              style={{ objectFit: "contain" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
