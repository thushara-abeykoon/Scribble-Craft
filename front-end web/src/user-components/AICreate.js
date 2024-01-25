import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";

const AICreate = () => {
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
        className="cursor-pointer h-40 hover:bg-opacity-100 transition-opacity duration-500 bg-orange-700 bg-opacity-80 backdrop-blur-md text-white px-10 py-5 flex flex-col justify-around items-center w-full mb-10 rounded-xl text-3xl font-mono"
      >
        <FiUpload className="text-5xl" />
        <input {...getInputProps()} />
        <p>Drop the document image here....</p>
      </div>
      {doc ? (
        <div className="font-mono flex flex-col items-center justify-center gap-10 text-xl rounded-lg bg-opacity-70 text-white bg-orange-500 py-10 px-10">
          <p>DOCUMENT PREVIEW</p>
          <img src={URL.createObjectURL(doc[0])} className="w-screen" />
          <div>
            <button
              onClick={() => {
                setLoading(true);
              }}
              className="font-mono text-2xl text-white rounded-2xl bg-orange-600 h-16 w-52 mb-10 flex justify-around items-center hover:bg-teal-700 transition-all duration-200"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
              ) : (
                "PROCESS"
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

export default AICreate;
