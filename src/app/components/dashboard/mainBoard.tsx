import { FC, useState } from "react";
import { Board } from "../board/board";
import { capitalizeFirstLetter } from "../utils/capitalize";
import { Logout } from "../logout/logout";

interface dashBoardProps {
  user: string;
  id: string;
}

export const CreateDashBoard: FC<dashBoardProps> = ({ user, id }) => {
  const [logout, setLogout] = useState(false);

  const handleLogout = () => {
    setLogout(true);
  }

  return (
    <div className="flex flex-col md:w-full w-full md:h-lvh custom-bg h-screen overflow-auto">
      <div className="w-full h-2/12 md:h-2/12 md:border-b-2 p-6 md:border-[#2e9c8e] flex flex-row justify-between bg-[#2e9c8e]">
        <h2 className="text-[16px] md:text-[22px] text-white font-bold">
          Welcome! {capitalizeFirstLetter(user)}
        </h2>
        <button onClick={handleLogout} className="font-bold text-white hover:text-[#174942]">Logout</button>
      </div>
      <div className="p-2 h-10/12 w-full md:h-lvh flex m-auto">
        <Board id={id} />
      </div>
      {logout && <Logout path="/" />}
    </div>
  );
};
