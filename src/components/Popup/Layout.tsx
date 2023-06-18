import React, { useEffect } from "react";

interface Props {
  display: boolean;
  heading: string;
  cta?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({
  display,
  heading,
  cta,
  onClick,
  children,
}) => {
  useEffect(() => {
    if (display) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [display]);

  return (
    <div
      className="fixed top-0 left-0 h-full w-full z-20 transition-opacity ease-out duration-150"
      style={{
        background: "rgba(29, 29, 33, 0.5)",
        opacity: display ? "1" : "0",
        pointerEvents: display ? "all" : "none",
      }}
      onClick={onClick}
    >
      <div
        className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        bg-[#1D1D21] rounded-md w-11/12 max-w-lg border-[1px] border-[#383838] max-h-[90vh]"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) -40px 40px 80px -8px",
        }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        <p className="py-4 px-2 sm:px-4 text-sm">{heading}</p>
        <div
          className="popup-body flex-1 px-2 sm:px-4 overflow-y-scroll"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
        {cta && (
          <div
            className="px-2 sm:px-4 mt-1 py-4 flex justify-end"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
            }}
          >
            {cta}
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
