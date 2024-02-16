import { FC, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface props {
  setCurrentDate: any;
}
export const NewCalendar: FC<props> = ({ setCurrentDate }) => {
  const [value, onChange] = useState<Value>(new Date());

  useEffect(() => {
    setCurrentDate(value);
  }, [value]);

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};
