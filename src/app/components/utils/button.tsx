"use client";

import { FC } from "react";

interface buttonProps {
  buttonText: string;
  link: string;
  customClass?: string;
}

const handleOnClick = () => {
  
};

export const Button: FC<buttonProps> = ({ buttonText, link, customClass }) => {
  return (
    <a href={link ? link : ""} className={`w-4/5 md:w-4/5 max-w-[300px] flex m-2 flex-wrap justify-center ${customClass}`}>
      <button
        type="button"
        onClick={handleOnClick}
        className="w-full md:w-full max-w-[600px] text-[#24669C] font-bold border-[#42A5F5] rounded-xl border-2 hover:bg-[#42A5F5] hover:text-white"
      >
        {buttonText}
      </button>
    </a>
  );
};
