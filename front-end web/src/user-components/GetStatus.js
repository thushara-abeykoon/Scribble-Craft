import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const GetStatus = ({ setIsStatusOK, fontType="manual" }) => {
  const [jsonStatus, setJsonStatus] = useState("Loading...");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${fontType}/status`);
        const status = response.data.status;

        setJsonStatus(status);

        if (status === "font making started") {
          setIsStatusOK(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 20000);

    return () => clearInterval(intervalId);
  }, [jsonStatus]);

  return (
    <div className="fixed left-0 bottom-0 w-screen h-screen backdrop-blur-md flex justify-center items-center">
      <div className=" gap-5 rounded-lg flex flex-col justify-center items-center w-96 h-40 bg-white bg-opacity-20 text-white font-mono text-xl">
        <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
        <p className="text-lg text-center">{jsonStatus}</p>
      </div>
    </div>
  );
};

export default GetStatus;
