import { data } from "autoprefixer";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { Form, useNavigate } from "react-router-dom";

const AICreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [doc, setDoc] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useCallback((accptedFiles) => {
      setDoc(accptedFiles);
    }),
  });
  return (
    <div className="flex flex-col justify-around items-center w-full px-10">
      <div
        {...getRootProps()}
        className="cursor-pointer h-40 hover:bg-opacity-40 transition-all duration-300 bg-white bg-opacity-30 backdrop-blur-md text-white px-10 py-5 flex flex-col justify-around items-center w-full mb-10 rounded-xl text-xl font-mono"
      >
        <FiUpload className="text-5xl" />
        <input {...getInputProps()} />
        <p>Drop the document image here....</p>
      </div>
      {doc ? (
        <div className="font-mono backdrop-blur-sm flex flex-col items-center justify-center gap-10 text-xl rounded-lg bg-opacity-40 text-white bg-white py-10 mb-5 px-10">
          <p>DOCUMENT PREVIEW</p>
          <img src={URL.createObjectURL(doc[0])} className="w-screen" />
          <div className="fixed bottom-0">
            <button
              onClick={() => {
                setLoading(true);
                fetchImages(doc[0], setLoading, navigate);
              }}
              className="font-mono text-xl text-white rounded-2xl bg-blue-900 h-14 w-52 mb-5 flex justify-around items-center hover:bg-blue-700 transition-all duration-500"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
              ) : (
                "Process"
              )}
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const fetchImages = async (image, setLoading, navigate) => {
  const url = "http://localhost:5000/auto/upload_file";
  console.log(image);
  const formdata = new FormData();
  formdata.append("file", image);
  axios
    .post(url, formdata, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) navigate("/chooseImages");
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setLoading(false);
    });
};

export default AICreate;
