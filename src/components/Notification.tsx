import React, { useEffect } from "react";
import CloseIcon from "@/components/Icons/Close";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/reducers";
import { remove } from "@/redux/actions";

const getIcon = (): JSX.Element => {
  return (
    <div className="bg-[#2A4634] h-[38px] w-[38px] flex items-center justify-center rounded-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        width="1.5em"
        height="1.5em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill="#54d62c"
          d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.3 7.61l-4.57 6a1 
              1 0 0 1-.79.39a1 1 0 0 1-.79-.38l-2.44-3.11a1 1 0 0 1 1.58-1.23l1.63 
              2.08l3.78-5a1 1 0 1 1 1.6 1.22Z"
        ></path>
      </svg>
    </div>
  );
};

const Notification: React.FC = () => {
  const { message } = useSelector(
    (state: RootState) => state.notificationReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (message.trim() !== "") {
      setTimeout(() => {
        dispatch(remove());
      }, 3000);
    }
  }, [message]);

  return (
    <div
      className={`fixed bg-[#2C2C2C] right-[-100%] top-[20px] z-20
        py-[10px] pr-[80px] pl-[10px] flex items-center shadow-2xl rounded-md ${
          message.trim() === ""
            ? "notification_container hide"
            : "notification_container display"
        }`}
    >
      {getIcon()}
      <p className="text-[10px] xs:text-sm font-medium ml-3">{message}</p>
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer bg-none outline-none
            w-[18px] h-[18px] p-0 border-none text-gray-400"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          dispatch(remove());
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default Notification;
