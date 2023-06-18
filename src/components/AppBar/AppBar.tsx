"use client";
import React, { useState } from "react";
import Image from "next/image";

// Components
import HamburgerIcon from "@/components/Icons/Hamburger";
import BellIcon from "@/components/Icons/Bell";
import SearchIcon from "@/components/Icons/Search";
import Menu from "@/components/AppBar/Menu";

const AppBar: React.FC = () => {
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  return (
    <>
      <nav
        className="md:hidden fixed h-12 w-full top-0 left-0 
        border-b-[1px] border-b-[#383838] flex items-center bg-[#1D1D21] z-10"
      >
        <div className="h-8 w-11/12 mx-auto flex items-center justify-between">
          <div className="h-full flex items-center">
            <button
              type="button"
              className="h-6 w-6 outline-none border-none"
              onClick={() => {
                setDisplayMenu(true);
              }}
            >
              <HamburgerIcon />
            </button>
            {/* <button
              type="button"
              className="h-4 w-4 ml-4 outline-none border-none"
            >
              <SearchIcon />
            </button> */}
          </div>
          <div className="h-full flex items-center">
            {/* <button type="button" className="bg-none outline-none mr-6 h-5 w-5">
              <BellIcon />
            </button> */}
            <button
              type="button"
              className="h-full w-8 flex items-center relative
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
      </nav>
      <Menu displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} />
    </>
  );
};

export default AppBar;
