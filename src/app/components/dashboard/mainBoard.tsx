import { FC } from "react";
import { Board } from "../board/board";
import { capitalizeFirstLetter } from "../utils/capitalize";

interface dashBoardProps {
  user: string;
  id: string;
}

export const CreateDashBoard: FC<dashBoardProps> = ({ user, id }) => {
  return (
    <div className="flex flex-col md:w-full w-full">
      <div className="w-full md:h-2/12 md:border-b-2 p-6 md:border-[#24669C] flex flex-col justify-between">
        <h2 className="text-[16px] md:text-[22px] text-[#24669C] font-bold">
          Welcome! {capitalizeFirstLetter(user)}
        </h2>
      </div>
      <div className="p-4 w-full md:h-10/12 flex m-auto">
        <Board id={id} />
      </div>
    </div>
  );
};
