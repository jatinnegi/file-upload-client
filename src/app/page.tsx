"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GradientBox from "@/components/GradientBox";
import Navbar from "@/components/Navbar";
import Header from "@/components/Landing/Header/Header";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) router.push("/workspace");
    else setIsLoading(false);
  }, []);

  if (isLoading) return <div className="h-full w-full bg-[#1D1D21]" />;

  return (
    <GradientBox>
      <Navbar />
      <div className="w-11/12 mx-auto pt-20 pb-14">
        <Header />
        {/* <div className="max-w-6xl mx-auto my-10 md:my-16">
          <Preview />
        </div> */}
      </div>
    </GradientBox>
  );
}
