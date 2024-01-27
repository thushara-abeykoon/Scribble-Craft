import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GetStatus from "./GetStatus";
import axios from "axios";

const CreateFont = ({ setCreate }) => {
  const [isStatusOk, setIsStatusOK] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fontName, setFontName] = useState("");
  const [fontFamilyName, setFontFamilyName] = useState("");

  const handleSubmit = async () => {
    await axios
      .post("http://localhost:5000/manual/create_font", {
        font_name: fontName,
        font_family: fontFamilyName,
      })
      .then((res) => setIsSuccess(res.status === 200 ? true : false))
      .catch((err) => console.error(err));
  };

  if (isSuccess) {
    return <Success setCreate={setCreate} />;
  } else if (isStatusOk) {
    return (
      <div className="box font-mono">
        <h2 className="boxHeader">Font Details</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={fontName}
            onChange={(e) => {
              setFontName(e.target.value);
            }}
            type="text"
            placeholder="Font Name"
            className="inputField"
          />
          <input
            value={fontFamilyName}
            onChange={(e) => {
              setFontFamilyName(e.target.value);
            }}
            type="text"
            placeholder="Font Family Name"
            className="inputField"
          />
          <input type="submit" value="Generate" className="button" />
        </form>
      </div>
    );
  } else {
    return <GetStatus setIsStatusOK={setIsStatusOK} />;
  }
};

const Success = ({ setCreate }) => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen backdrop-blur-md fixed top-0 left-0 flex justify-center items-center">
      <div className="font-mono flex gap-10 flex-col w-96 h-48 bg-white bg-opacity-20 rounded-3xl justify-center items-center text-3xl text-white">
        <div className="flex justify-center items-center gap-2">
          Success
          <FaCheckCircle />
        </div>
        <button
          onClick={() => {
            navigate("/dashboard");
            setCreate(false);
          }}
          className="bg-purple-800 text-white w-24 p-2 rounded-xl text-sm hover:bg-purple-700 transition-all duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CreateFont;
