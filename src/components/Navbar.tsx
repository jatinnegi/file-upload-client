import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 w-full backdrop-blur-xl z-10">
    <div
      className="w-11/12 mx-auto max-w-5xl py-3 border-b-[1px] border-b-[rgba(214,214,214,0.08)]
      flex items-center justify-between"
    >
      <Link href="/" className="flex items-center">
        <div className="relative h-5 w-5 xs:h-7 xs:w-7">
          <Image
            src="/assets/stack-drive.png"
            alt="stack-drive"
            priority
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <p className="text-xs xs:text-sm font-medium ml-2">StackDrive</p>
      </Link>
      <Link href="/get-started">
        <p
          className="text-xs xs:text-sm font-semibold text-gray-300 hover:text-white
          transition-all ease-linear duration-200"
        >
          Get Started
        </p>
      </Link>
    </div>
  </nav>
);

export default Navbar;
