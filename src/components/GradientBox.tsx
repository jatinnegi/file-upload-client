import React from "react";

interface Props {
  children: React.ReactNode;
}

const GradientBox: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(198, 155, 119, 0.3), rgba(255, 255, 255, 0))",
      }}
    >
      {children}
    </div>
  );
};

export default GradientBox;
