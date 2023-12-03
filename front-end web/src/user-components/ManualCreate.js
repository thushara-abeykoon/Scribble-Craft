import React from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

export default function ManualCreate() {
  const characters = Array.from({ length: 10 }, (_, i) =>
    String.fromCharCode(48 + i)
  )
    .concat(Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)))
    .concat(Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)));

  return (
    <div className="grid grid-cols-4 w-full gap-10 mx-10 mb-10">
      {characters.map((chr) => (
        <CharacterUploadBox key={chr} character={chr} />
      ))}
    </div>
  );
}

function CharacterUploadBox({ character }) {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFile) => {
    setFile(acceptedFile);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });
  return (
    <div
      {...getRootProps()}
      className="w-full cursor-pointer hover:bg-teal-700 transition-colors duration-200 h-96 flex justify-between items-center font-mono  rounded-xl hover:text-white text-5xl text-teal-700 flex-col"
    >
      {file !== null ? (
        <img
          src={URL.createObjectURL(file[0])}
          className="w-full h-3/4 border-4 border-teal-700 rounded-t-xl"
        />
      ) : (
        <>
          <input {...getInputProps()} />
          <div className=" px-5 border-dashed border-t-4 border-x-4 border-teal-700 rounded-t-xl h-3/4 flex flex-col justify-center gap-6 items-center w-full text-center text-2xl">
            <FiUpload className="text-5xl" />
            <p>Click or Drop Here to Upload Image</p>
          </div>
        </>
      )}
      <div className="h-1/4 rounded-b-xl flex justify-center items-center w-full bg-teal-700 text-white">
        {character}
      </div>
    </div>
  );
}
