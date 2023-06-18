import React from "react";

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: string | JSX.Element;
}

const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button
      type="button"
      className="text-white font-normal tracking-wide
        text-sm py-2 px-4 rounded-[3px] outline-none border-none bg-orange-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
