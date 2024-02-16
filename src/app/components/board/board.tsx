import { FC, useEffect, useState } from "react";

import { postEvents } from "../router/postEvents";
import { getEvents } from "../router/getEvents";
import { deleteAllEntries } from "../router/deleteAllEntries";
import { NewCalendar } from "../utils/calendar";

import { lemon } from "@/app/fonts/fonts";
import Modal from "react-modal";
import { BiSolidTrashAlt } from "react-icons/bi";
import { BiCheckCircle } from "react-icons/bi";
import { BiSolidXCircle } from "react-icons/bi";
import { Logout } from "../logout/logout";
import { formatDate } from "../utils/formatedDate";
import { deleteByDate } from "../router/deleteByDate";

interface userboard {
  id: string;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    border: "solid 2px #24669C",
  },
};

Modal.setAppElement("body");

export const Board: FC<userboard> = ({ id }) => {
  const [logout, setLogout] = useState(false);

  const handleLogout = () => {
    setLogout(true);
  };

  const today = new Date();
  const [mainEvents, setMainEvents] = useState([{}]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectItem, setSelectItem] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentDate, setCurrentDate] = useState(today);

  useEffect(() => {
    getEvents(id, formatDate(currentDate)).then((r) => {
      if (r === null) {
        setMainEvents([{}]);
      } else {
        var events = [...r.events];
        setMainEvents(events);
      }
    });
  }, [currentDate]);

  const afterOpenModal = () => {};
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleAddItem = (e: any) => {
    e.preventDefault();
    var newEvents = [...mainEvents];
    const [startTime, endTime, desc] = e.target;
    newEvents.push({
      startTime: startTime.value,
      endTime: endTime.value,
      desc: desc.value,
    });
    setMainEvents(newEvents);
    setIsOpen(false);
  };

  const handleSave = async () => {
    if (mainEvents.length < 100) {
      try {
        const res = await postEvents(id, formatDate(currentDate), mainEvents);
        setSaved(res);
        setTimeout(() => {
          setSaved(false);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Max list length.");
    }
  };

  const handleSelectItem = () => setSelectItem(!selectItem);

  const handleDeleteItem = (event: any) => {
    const selectedIndex = Number(event.target.id);
    var tempList = [...mainEvents];
    tempList.splice(selectedIndex, 1);
    setMainEvents(tempList);
  };

  const handleDeleteAll = async () => {
    let del = confirm("Are you shure?");
    if (del) {
      await deleteAllEntries(id);
      setMainEvents([{}]);
    }
  };

  const handleDeleteByDate = async () => {
    await deleteByDate(id, formatDate(currentDate));
    setMainEvents([{}]);
  };

  return (
    <div className="w-full flex-row">
      <div className="w-full flex justify-center">
        <NewCalendar setCurrentDate={setCurrentDate} />
      </div>
      <div
        className={`w-full text-center text-[28px] md:text-[30px] font-bold m-4 ${lemon.className} text-[#24669C]`}
      >
        {currentDate.toLocaleDateString()}
      </div>
      <div className="w-full my-auto border-t-2 border-b-2 border-[#24669c5a] border-dashed pt-10 pb-10">
        {selectItem && (
          <button
            onClick={handleDeleteByDate}
            className="flex justify-center mx-auto border-solid border-2 rounded-xl p-2 border-[red]"
          >
            <BiSolidTrashAlt className="w-[20px] text-red-600 cursor-pointer m-auto pointer-events-none" />
            <span className="text-red-600 font-bold">Delete All Events</span>
          </button>
        )}
        {mainEvents.map((item: any, index) => {
          if (item.desc) {
            return (
              <div
                className="p-2 border-b-2 flex flex-row flex-wrap text-center text-wrap overflow-auto hover:bg-[#0000000A]"
                key={index}
                onClick={handleSelectItem}
              >
                {selectItem && (
                  <button id={String(index)} onClick={handleDeleteItem}>
                    <BiSolidXCircle className="w-[20px] text-red-600 cursor-pointer m-auto pointer-events-none" />
                  </button>
                )}
                <div className="w-1/5">
                  {item.startTime + " - " + item.endTime}
                </div>
                <div className={selectItem ? `w-2/5` : `w-3/5`}>
                  {item.desc}
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="flex p-20 md:flex-row flex-col h-[300px]">
        <button
          className="w-4/5 md:w-1/5 max-w-[600px] text-[#24669C] font-bold border-[#42A5F5] rounded-xl border-2 hover:bg-[#42A5F5] hover:text-white m-auto"
          onClick={openModal}
        >
          Add Item
        </button>
        <button
          className="w-4/5 md:w-1/5 max-w-[600px] text-[#24669C] font-bold border-[#42A5F5] rounded-xl border-2 hover:bg-[#42A5F5] hover:text-white m-auto"
          onClick={handleSave}
        >
          Save
        </button>
        {saved && (
          <span className="my-auto text-green-700">
            <BiCheckCircle />
          </span>
        )}
      </div>
      <div className="flex flex-row justify-center w-full">
        <details className="cursor-pointer w-full text-center">
          <summary>Menu</summary>
          <div className="flex flex-row flex-wrap">
            <button
              className="w-4/5 md:w-1/5 max-w-[600px] text-[#ff2929] font-bold border-[#ff2929] rounded-xl border-2 hover:bg-[#ff2929] hover:text-white m-auto"
              onClick={handleDeleteAll}
            >
              Delete All Entries
            </button>
          </div>
          <div className="flex flex-row flex-wrap m-4">
            <button
              className="w-4/5 md:w-1/5 max-w-[600px] text-[#24669C] font-bold border-[#42A5F5] rounded-xl border-2 hover:bg-[#42A5F5] hover:text-white m-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </details>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form className="flex flex-col" onSubmit={handleAddItem}>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            name="startTime"
            className="p-2 m-4 border-2"
            id="startTime"
          ></input>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            name="endTime"
            className="p-2 m-4 border-2"
            id="endTime"
          ></input>
          <label htmlFor="task">Description:</label>
          <textarea
            id="desc"
            placeholder="Description..."
            maxLength={144}
            className="p-2 md:w-[400px] md:h-[150px] border-2 m-4 break-words"
          ></textarea>
          <button className="w-2/5 md:w-2/5 max-w-[600px] text-[#24669C] font-bold border-[#42A5F5] rounded-xl border-2 hover:bg-[#42A5F5] hover:text-white m-auto">
            Add
          </button>
        </form>
      </Modal>
      {logout && <Logout path="/" />}
    </div>
  );
};
