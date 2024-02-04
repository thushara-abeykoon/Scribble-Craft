import React, { useState } from "react";
import { getFileNameWithoutExtension } from "./ManualCreate";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";

const Proceed = ({ characterFiles, setCreate }) => {
  const [loading, setLoading] = useState(false);

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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    <div className="fixed bottom-0 z-50">
      <button
        onClick={postImages}
        className="font-mono text-xl text-white rounded-2xl bg-blue-900 h-14 w-52 mb-5 flex justify-around items-center hover:bg-blue-700 transition-all duration-500"
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
