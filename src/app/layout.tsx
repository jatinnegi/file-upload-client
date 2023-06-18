"use client";
import "./globals.css";
import { Inter } from "next/font/google";

import { Provider } from "react-redux";
import store from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "File Upload System",
  description: "File upload system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1D1D21] text-white`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
