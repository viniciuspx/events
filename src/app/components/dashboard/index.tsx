"use client";

import { Logout } from "../logout/logout";
import { CreateDashBoard } from "./mainBoard";

var loggedIn = false;
var username = "";
var id = "";

export const setLoggedIn = async (value: boolean) => (loggedIn = value);
export const setUserInfo = async (name: string, userid: string) => {
  username = name;
  id = userid;
};

export const DashBoardPage = () => {
  return loggedIn ? (
    <CreateDashBoard user={username} id={id} />
  ) : (
    <Logout path={"/login"} />
  );
};
