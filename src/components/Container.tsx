import React from "react";

interface Props {
  paddingOff?: boolean;
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ paddingOff, children }) => {
  return (
    <div
      className="w-11/12 my-4 mx-auto max-w-7xl pt-28 md:pt-36 pb-4"
      style={paddingOff ? { padding: "0px" } : {}}
    >
      {children}
    </div>
  );
};

export default Container;
