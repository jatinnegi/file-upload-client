"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

const Header = () => {
  const router = useRouter();

  return (
    <div
      className={`${styles.hero_header} max-w-4xl mx-auto
        flex flex-col items-center justify-center text-center`}
    >
      <p className={styles.hero_section_heading}>
        StackDrive is the easy way to stay organized
      </p>
      <p
        className="md:mb-8 text-base xs:text-lg sm:text-xl text-gray-200
          w-full max-w-2xl"
        style={{ animationDelay: "400ms" }}
      >
        Say goodbye to local storage limitations with our cloud platform. Your
        files are always safe & secure. Join now to make cloud storage
        experience seamless.
      </p>
      <button
        type="button"
        className={styles.get_started}
        onClick={() => {
          router.push("/get-started");
        }}
      >
        Get Started
      </button>
    </div>
  );
};

export default Header;
