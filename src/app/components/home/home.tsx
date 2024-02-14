"use client";

import { useEffect, useState } from "react";
import { Trail } from "../animations/trail";
import { Button } from "../utils/button";
import { lemon } from "@/app/fonts/fonts";

export const MakeHome = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  setTimeout(() => {
    setOpen(!open);
  }, 4000);

  return (
    <div className="h-lvh flex flex-row">
      <div
        className="w-0 md:w-8/12 bg-[#42A5F5] flex justify-center"
        onClick={handleClick}
      >
        <div className="m-auto">
          <Trail open={open}>
            <span>An easy way</span>
            <span>to schedule</span>
            <span>your day</span>
          </Trail>
        </div>
      </div>
      <div className="w-full md:w-4/12 flex flex-col flex-wrap border-l-2 md:border-[#42A5F5]">
        <div className="md:w-full w-full flex h-2/5 justify-center flex-wrap flex-col">
          <span
            className={`md:w-3/5 md:text-[30px] text-[24px] text-center inline-block align-top m-auto text-[#42A5F5] ${lemon.className}`}
          >
            Scheduler
            <hr />
          </span>
          <span className="text-center text-[#42A5F5] font-bold md:text-[18px] text-[14px]">
            Sign-up now!
          </span>
        </div>
        <div className="w-3/5 flex flex-wrap flex-row m-auto justify-around">
          <Button buttonText="Login" link="/login" />
          <Button buttonText="Sign-up" link="/signup" />
        </div>
        <span className="text-center text-[#42A5F5] font-bold md:text-[10px] text-[10px] my-8">
          All rigths reserved - 2024
        </span>
      </div>
    </div>
  );
};
