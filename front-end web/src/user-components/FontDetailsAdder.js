import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CreateFont = ({ setCreate }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return <Success setCreate={setCreate} />;
  } else {
    return (
      <div className="box">
        <h2 className="boxHeader">Font Details</h2>
        <form>
          <input type="text" placeholder="Font Name" className="inputField" />
          <input
            type="text"
            placeholder="Font Family Name"
            className="inputField"
          />
          <input
            type="submit"
            value="Generate"
            className="button"
            onClick={() => {
              setIsSuccess(true);
            }}
          />
        </form>
      </div>
    );
  }
};

const Success = ({ setCreate }) => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen backdrop-blur-md fixed top-0 left-0 flex justify-center items-center">
      <div className="flex gap-10 flex-col w-96 h-48 bg-white rounded-3xl justify-center items-center text-3xl text-green-600">
        <div className="flex justify-center items-center gap-4">
          Success
          <FaCheckCircle />
        </div>
        <button
          onClick={() => {
            navigate("/dashboard");
            setCreate(false);
          }}
          className="bg-green-600 text-white w-24 p-2 rounded-xl text-sm hover:bg-green-800 transition-all duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CreateFont;
