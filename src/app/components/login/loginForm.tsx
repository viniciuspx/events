"use client";

import { Button } from "../utils/button";
import { lemon } from "@/app/fonts/fonts";
import { login } from "../router/login";
import { useRouter } from "next/navigation";
import { setLoggedIn } from "../dashboard";
import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

export const LoginForm = () => {
  const [loginError, setLoginError] = useState(false);
  const [messageError, setMessageError] = useState("Login Inválido");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const HandleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      await login(event).then((r) => {
        setLoggedIn(r);
        setLoading(false);
      });
    } catch (error: any) {
      setLoading(false);
      setLoginError(true);
      setMessageError(error.response.data.message);
      console.log(error);
      return;
    }

    router.replace("/dashboard");
  };
  return (
    <div className="w-full h-lvh flex flex-wrap justify-center">
      <span
        className={`md:w-2/5 md:text-[64px] text-[48px] text-center inline-block align-top m-auto text-[#42A5F5] ${lemon.className}`}
      >
        Scheduler
        <hr />
      </span>
      <div className="h-2/5 w-full flex flex-col mx-auto justify-center">
        <form
          className="w-4/5 flex flex-col flex-wrap justify-center m-auto"
          onSubmit={HandleSubmit}
        >
          <input
            type="text"
            className="w-4/5 md:w-2/5 h-[25px] border-[2px] border-[#24669C] my-2 mx-auto p-4 text-center rounded-md bg-transparent text-black"
            placeholder="E-mail"
            name="email"
          ></input>
          <input
            type="password"
            className="w-4/5 md:w-2/5 h-[25px] border-[2px] border-[#24669C] my-2 mx-auto p-4 text-center rounded-md bg-transparent text-black"
            placeholder="Password"
            name="password"
          ></input>
          {loading && <BiLoaderAlt className="m-auto animate-spin" />}
          <button
            type="submit"
            className="w-2/5 md:w-2/5 max-w-[600px] text-white font-bold border-[#42A5F5] bg-[#42A5F5] rounded-xl border-2 hover:bg-white hover:text-[#24669C] mx-auto my-2"
          >
            Login
          </button>
          {loginError && (
            <div className="w-4/5 md:w-2/5 h-[60px] border-[#ff1b1b] text-[#ff1b1b] font-bold border-2 my-2 mx-auto p-4 text-center rounded-md animate-shake">
              {messageError}
            </div>
          )}
        </form>
        <Button buttonText="Cancel" link="/" customClass="mx-auto my-2" />
      </div>
    </div>
  );
};
