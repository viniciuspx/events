import { FC, useEffect, useState } from "react";

import { postEvents } from "../router/postEvents";
import { getEvents } from "../router/getEvents";
import { deleteAllEntries } from "../router/deleteAllEntries";
import { NewCalendar } from "../utils/calendar";

import Modal from "react-modal";

import { BiSolidTrashAlt } from "react-icons/bi";
import { BiCheckCircle } from "react-icons/bi";
import { BiSolidXCircle } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { BiDotsVertical } from "react-icons/bi";
import { BiMeteor } from "react-icons/bi";

import { formatDate } from "../utils/formatedDate";
import { deleteByDate } from "../router/deleteByDate";
import { sortEvents } from "../utils/sort";

import backimg from "../../img/backdrop.jpg";
import Image from "next/image";
import { eventOverlapping } from "../utils/compareHours";

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
    border: "solid 2px #2e9c8e",
  },
};

Modal.setAppElement("body");

export const Board: FC<userboard> = ({ id }) => {
  const today = new Date();
  const [mainEvents, setMainEvents] = useState([{}]);
  const [addItemModalIsOpen, setAddIsOpen] = useState(false);
  const [selectItem, setSelectItem] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentDate, setCurrentDate] = useState(today);
  const [editItemModalIsOpen, setEditIsOpen] = useState(false);
  const [selectEditIndex, setSelectedEditIndex] = useState(0);

  useEffect(() => {
    getEvents(id, formatDate(currentDate)).then((r) => {
      if (r === null) {
        setMainEvents([{}]);
      } else {
        var events = [...r.events];
        setMainEvents(sortEvents(events));
      }
    });
  }, [currentDate]);

  const afterOpenModal = () => {};
  const closeModal = () => {
    setAddIsOpen(false);
    setEditIsOpen(false);
  };
  const openAddModal = () => setAddIsOpen(true);

  const handleAddItem = (e: any) => {
    e.preventDefault();
    const [startTime, endTime, desc] = e.target;
    if (!eventOverlapping(mainEvents, startTime.value, endTime.value)) {
      var newEvents = [...mainEvents];
      newEvents.push({
        startTime: startTime.value,
        endTime: endTime.value,
        desc: desc.value,
      });
      setMainEvents(sortEvents(newEvents));
    } else {
      alert("Already exists an event in this period, not adding.");
    }
    setAddIsOpen(false);
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
    setMainEvents(sortEvents(tempList));
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

  const handleEditMenuEvent = async (event: any) => {
    setSelectedEditIndex(Number(event.target.id));
    setEditIsOpen(true);
  };

  const handleEditEvent = async (event: any) => {
    event.preventDefault();
    var newEvents = [...mainEvents];
    const [startTime, endTime, desc] = event.target;
    newEvents[selectEditIndex] = {
      startTime: startTime.value,
      endTime: endTime.value,
      desc: desc.value,
    };
    setMainEvents(sortEvents(newEvents));
    setEditIsOpen(false);
  };

  return (
    <div className="md:w-[1200px] flex flex-col m-auto border-2 border-solid rounded-xl md:px-10 md:py-5 bg-white">
      <div className="flex flex-col">
        <div className="md:py-2 flex flex-row">
          <NewCalendar setCurrentDate={setCurrentDate} />
          <div className="w-full">
            <img
              src={backimg.src}
              alt="field"
              className="object-cover md:h-[282px] h-[0px] md:w-full w-[0px] object-bottom"
            />
          </div>
        </div>
        <div className="border-2 w-full m-auto">
          <div
            className={
              "text-[20px] text-center p-2 md:text-[20px] font-bold text-black"
            }
          >
            {currentDate.toLocaleDateString()}
          </div>
          <hr></hr>
          {selectItem && (
            <>
              <button
                onClick={handleDeleteByDate}
                className="flex justify-center mx-auto border-solid p-2 m-2"
              >
                <BiSolidTrashAlt className="w-[20px] text-red-600 cursor-pointer m-auto pointer-events-none" />
                <span className="text-red-600 font-bold">
                  Delete all events on this date
                </span>
              </button>
              <button
                className="flex justify-center text-red-600 font-bold mx-auto"
                onClick={handleDeleteAll}
              >
                <BiMeteor className="w-[20px] text-red-600 cursor-pointer m-auto pointer-events-none" />
                Delete All Entries
              </button>
            </>
          )}
          <div className="flex flex-row text-[24px] m-2 cursor-pointer justify-end">
            <BiDotsVertical onClick={handleSelectItem} />
          </div>
          {mainEvents.map((item: any, index) => {
            if (item.desc) {
              return (
                <div
                  className="p-2 divide-x-2 border-b-2 flex flex-row flex-wrap text-center text-wrap overflow-auto hover:bg-[#0000000A]"
                  key={index}
                  onClick={handleSelectItem}
                >
                  {selectItem && (
                    <>
                      <button id={String(index)} onClick={handleDeleteItem}>
                        <BiSolidXCircle className="w-[20px] cursor-pointer m-auto pointer-events-none" />
                      </button>
                      <button id={String(index)} onClick={handleEditMenuEvent}>
                        <BiEditAlt className="w-[20px] cursor-pointer m-auto pointer-events-none" />
                      </button>
                    </>
                  )}
                  <div className="w-1/5">
                    {item.startTime + " - " + item.endTime}
                  </div>
                  <div className={selectItem ? `w-3/5` : `w-4/5`}>
                    {item.desc}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="flex md:flex-row flex-col h-[100px]">
        <button
          className="w-4/5 md:w-1/5 max-w-[600px] text-[#2e9c8e] font-bold border-[#2e9c8e] rounded-xl border-2 hover:bg-[#2e9c8e] hover:text-white m-auto"
          onClick={openAddModal}
        >
          Add Event
        </button>
        <button
          className="w-4/5 md:w-1/5 max-w-[600px] text-[#2e9c8e] font-bold border-[#2e9c8e] rounded-xl border-2 hover:bg-[#2e9c8e] hover:text-white m-auto"
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

      <Modal
        isOpen={addItemModalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form className="flex flex-col" onSubmit={handleAddItem}>
          <label htmlFor="startTime" className="font-bold">
            Start Time:
          </label>
          <input
            type="time"
            name="startTime"
            className="p-2 m-4 border-2"
            id="startTime"
          ></input>
          <label htmlFor="endTime" className="font-bold">
            End Time:
          </label>
          <input
            type="time"
            name="endTime"
            className="p-2 m-4 border-2"
            id="endTime"
          ></input>
          <label htmlFor="task" className="font-bold">
            Description:
          </label>
          <textarea
            id="desc"
            placeholder="Description..."
            maxLength={144}
            className="p-2 md:w-[400px] md:h-[150px] border-2 m-4 break-words"
          ></textarea>
          <button className="w-2/5 md:w-2/5 max-w-[600px] text-[#2e9c8e] font-bold border-[#2e9c8e] rounded-xl border-2 hover:bg-[#2e9c8e] hover:text-white m-auto">
            Add
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={editItemModalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form className="flex flex-col" onSubmit={handleEditEvent}>
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
          <button className="w-2/5 md:w-2/5 max-w-[600px] text-[#2e9c8e] font-bold border-[#2e9c8e] rounded-xl border-2 hover:bg-[#2e9c8e] hover:text-white m-auto">
            Edit
          </button>
        </form>
      </Modal>
    </div>
  );
};
