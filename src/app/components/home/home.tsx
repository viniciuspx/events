"use client";

import { useEffect, useState } from "react";
import { Trail } from "../animations/trail";
import { Button } from "../utils/button";
import { dancingScript, lemon, monteSerrat } from "@/app/fonts/fonts";

export const MakeHome = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);

  useEffect(() => {
    setOpen(true);
  },[])

  return (
    <div className="h-lvh flex flex-row">
      <div
        className="w-0 md:w-8/12 bg-[#2e9c8e] flex justify-center"
        onClick={handleClick}
      >
        <div className="m-auto invisible md:visible">
          <Trail open={open}>
            <span className={`${monteSerrat.className}`}>Events is an easy</span>
            <span className={`${monteSerrat.className}`}>way to organize</span>
            <span className={`${monteSerrat.className}`}>your day.</span>
          </Trail>
        </div>
      </div>
      <div className="w-full md:w-4/12 flex flex-col flex-wrap border-l-2 md:border-[#2e9c8e]">
        <div className="md:w-full w-full flex h-2/5 justify-center flex-wrap flex-col">
          <span
            className={`md:w-3/5 md:text-[64px] text-[36px] text-center inline-block align-top m-auto text-[#2e9c8e] ${dancingScript.className}`}
          >
            Events
            <hr />
          </span>
          <span className="text-center text-[#2e9c8e] font-bold md:text-[18px] text-[14px]">
            Sign-up now!
          </span>
        </div>
        <div className="w-3/5 flex flex-wrap flex-row m-auto justify-around">
          <Button buttonText="Login" link="/login" />
          <Button buttonText="Sign-up" link="/signup" />
        </div>
        <span className="text-center text-[#2e9c8e] font-bold md:text-[10px] text-[10px] my-8">
          All rigths reserved - 2024
        </span>
      </div>
    </div>
  );
};
