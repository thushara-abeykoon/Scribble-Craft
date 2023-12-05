import React, { useState } from "react";
import Profile from "../images/sampleProfile.png";
import { CiEdit } from "react-icons/ci";

export default function Account() {
  const name = "Thushara Dilshan";
  const [isEditable, setIsEditable] = useState(false);
  const [isEditIconVisible, setIsEditIconVisible] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(name);
  return (
    <div className="backdrop-blur-sm rounded-xl w-full h-screen flex flex-col items-center py-10">
      <img
        src={Profile}
        className="h-44 w-44 rounded-full mb-8 drop-shadow-xl"
      />
      {isEditable ? (
        <input
          defaultValue={textAreaValue}
          autoFocus={true}
          type="text"
          className="text-4xl w-full font-bold font-mono text-center bg-transparent outline-none placeholder:text-gray-500"
          onKeyDown={(KeyboardEvent) =>
            KeyboardEvent.key === "Enter" || KeyboardEvent.key === "Escape"
              ? setIsEditable(false)
              : null
          }
          placeholder={textAreaValue}
          onChange={(Event) => setTextAreaValue(Event.target.value)}
        />
      ) : (
        <div
          className="flex gap-3 items-center justify-between text-4xl "
          onMouseEnter={() => setIsEditIconVisible(true)}
          onMouseLeave={() => setIsEditIconVisible(false)}
        >
          <p className="font-bold font-mono text-center bg-transparent outline-none placeholder:text-black">
            {textAreaValue}
          </p>
          {isEditIconVisible ? (
            <CiEdit
              className="text-3xl cursor-pointer font-bold"
              onClick={() => setIsEditable(true)}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

function DetailBox({ detail }) {
  return (
    <div>
      {detail} : <input type="text" />
    </div>
  );
}
