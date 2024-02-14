import { FC, useState } from "react";
import { Board } from "../board/day";
import { Logout } from "../logout/logout";

interface dashBoardProps {
  user: string;
  id: string;
}

export const CreateDashBoard: FC<dashBoardProps> = ({ user, id }) => {
  const [logout, setLogout] = useState(false);

  const handleLogout = () => setLogout(true);

  return (
    <div className="flex flex-col md:w-full w-full md:flex-row">
      <div className="w-full md:w-2/12 md:h-lvh md:border-r-2 p-6 md:border-[#24669C] flex flex-col justify-between">
        <h2 className="text-[16px] md:text-[22px] text-[#24669C] font-bold text-center">
          Welcome! {user}
        </h2>
        <button
          onClick={handleLogout}
          className="w-3/5 md:w-4/5 my-4 max-w-[600px] text-[#24669C] font-bold border-[#42A5F5] rounded-xl border-2 hover:bg-[#42A5F5] hover:text-white m-auto"
        >
          Logout
        </button>
      </div>
      <div className="p-4 w-full md:w-10/12 flex m-auto">
        <Board id={id}/>
      </div>
      {logout && <Logout path="/" />}
    </div>
  );
};
