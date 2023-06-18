import React from "react";

const Text: React.FC = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1255_158096)">
        <path
          d="M23.172 0C23.7022 0 24.2107 0.210507 24.5857 0.585255L36.4137 12.4044C36.7891 12.7795 37 13.2884 37 13.8191V35.3333C37 37.9107 34.8689 40 32.24 40H7.76C5.13112 40 3 37.9107 3 35.3333V4.66667C3 2.08934 5.13112 0 7.76 0H23.172Z"
          fill="#454F5B"
        />
        <g filter="url(#filter0_d_1255_158096)">
          <path
            d="M35.1548 12.1381C35.4678 12.4537 35.2443 12.9902 34.7998 12.9902H29C26.4227 12.9902 24.0976 10.7233 24.0976 8.21031V2.20435C24.0976 1.75791 24.6382 1.53528 24.9526 1.85224L35.1548 12.1381Z"
            fill="white"
            fillOpacity="0.24"
            shapeRendering="crispEdges"
          />
        </g>
        <path
          d="M7.99976 24.376V22.324H15.2838V24.376H12.7998V31H10.4598V24.376H7.99976Z"
          fill="white"
        />
        <path
          d="M24.3722 31H21.4562L19.8602 28.276L18.3002 31H15.8162L18.6482 26.62L15.8882 22.324H18.7802L20.1242 24.676L21.4562 22.324H23.9042L21.3122 26.284L24.3722 31Z"
          fill="white"
        />
        <path
          d="M24.8513 24.376V22.324H32.1353V24.376H29.6513V31H27.3113V24.376H24.8513Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1255_158096"
          x="22.0977"
          y="1.70337"
          width="15.2031"
          height="15.2869"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1255_158096"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1255_158096"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_1255_158096">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Text;
