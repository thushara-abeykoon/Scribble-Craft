import React, { useState } from "react";
import { getFileNameWithoutExtension } from "./ManualCreate";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";

const Proceed = ({ characterFiles, setCreate }) => {
  const [loading, setLoading] = useState(false);

  const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwNjEyMDM0MiwianRpIjoiYWFkYmUyYzItOTc1NC00NmY2LWEzMDItM2IxZDRmYTQ2NmI4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRodXNoYXJhZEBnYWRhZC5jb20iLCJuYmYiOjE3MDYxMjAzNDIsImV4cCI6MTcwNjEyMTI0Mn0.6e5-4CHgofR2kUf6LthhGT6aL33nU9V8Aq5F--qEoB8";
  const uploadUrl = "http://localhost:5000/manual/generate";

  const formData = new FormData();

  characterFiles.forEach((file) => {
    formData.append(getFileNameWithoutExtension(file.name), file, file.name);
  });

  const postImages = () => {
    setCreate(false);
    setLoading(true);
    axios
      .post(uploadUrl, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setLoading(false);
          setCreate(true);
        }
      })
      .catch((err) => {
        alert("Connection Error");
        setLoading(false);
      });
  };

  return (
    <div>
      <button
        onClick={postImages}
        className="font-mono text-xl text-white rounded-2xl bg-orange-700 h-14 w-40 mb-10 flex justify-around items-center hover:bg-teal-700 transition-all duration-200"
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
        ) : (
          <>Process</>
        )}
      </button>
      <div></div>
    </div>
  );
};

export default Proceed;
