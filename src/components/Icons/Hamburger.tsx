import React from "react";

const Hamburger: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      fill="#fff"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <circle cx="4" cy="12" r="1" fill="#fff"></circle>
      <rect
        width="14"
        height="2"
        x="7"
        y="11"
        fill="#fff"
        rx=".94"
        ry=".94"
      ></rect>
      <rect
        width="18"
        height="2"
        x="3"
        y="16"
        fill="#fff"
        rx=".94"
        ry=".94"
      ></rect>
      <rect
        width="18"
        height="2"
        x="3"
        y="6"
        fill="#fff"
        rx=".94"
        ry=".94"
      ></rect>
    </svg>
  );
};

export default Hamburger;
