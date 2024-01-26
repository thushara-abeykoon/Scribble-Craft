import React, { useEffect } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import AlertBox from "../other-components/AlertBox";
import Proceed from "./Proceed";

export default function ManualCreate({ setCreate }) {
  const [characterFiles, setCharacterFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setCharacterFiles(
        acceptedFiles.filter((file) => {
          return (
            imageFileChecker(file.name) &&
            characters.find(
              (char) => char === getFileNameWithoutExtension(file.name)
            )
          );
        })
      );
    },
  });

  const characters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <div className="w-full px-10 flex flex-col items-center">
      <AlertBox message={"Accepted Image Types are JPEG and PNG only"} />
      <AlertBox
        message={
          "If you're uploading a folder with character images, please ensure that each image is appropriately named, such as A.jpg, B.png, and so forth."
        }
      />
      <div
        {...getRootProps()}
        className="cursor-pointer h-40 hover:bg-opacity-100 transition-all duration-200 bg-orange-700 bg-opacity-80 backdrop-blur-md text-white px-10 py-5 flex flex-col justify-around items-center w-full mb-10 rounded-xl text-xl font-mono"
      >
        <FiUpload className="text-5xl" />
        <input {...getInputProps()} />
        <p>Click Or Drop to Upload the Image Folder Here....</p>
      </div>
      {characters.length == characterFiles.length ? (
        <Proceed characterFiles={characterFiles} setCreate={setCreate} />
      ) : (
        <></>
      )}
      <div className="grid grid-cols-6 justify-around items-start w-full p-10 gap-10">
        {characters.map((chr) => (
          <CharacterUploadBox
            key={chr}
            character={chr}
            characterImage={characterFiles.filter(
              (file) => getFileNameWithoutExtension(file.name) === chr
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function CharacterUploadBox({ character, characterImage }) {
  const [file, setFile] = useState([]);

  useEffect(() => {
    if (characterImage[0] !== undefined) {
      setFile(characterImage);
    }
  }, [character, characterImage]);

  const onDrop = (acceptedFile) => {
    if (imageFileChecker(acceptedFile[0].name)) setFile(acceptedFile);
    else alert("Wrong File Type Detected!");
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });
  return (
    <div
      {...getRootProps()}
      className="backdrop-blur-sm w-full cursor-pointer hover:bg-teal-700 transition-colors duration-200 h-64 flex justify-around items-center font-mono  rounded-xl hover:text-white text-5xl text-teal-700 flex-col"
    >
      {file[0] !== undefined ? (
        <img
          src={URL.createObjectURL(file[0])}
          className="w-full h-3/4 border-4 border-teal-700 rounded-t-xl"
        />
      ) : (
        <>
          <input {...getInputProps()} />
          <div className=" px-5 border-dashed border-t-4 border-x-4 border-teal-700 rounded-t-xl h-3/4 flex flex-col justify-center gap-6 items-center w-full text-center text-lg">
            <FiUpload className="text-5xl" />
            <p>Click or Drop Here to Upload Image</p>
          </div>
        </>
      )}
      <div className="h-1/4 rounded-b-xl text-3xl flex justify-center items-center w-full bg-teal-700 text-white">
        {character}
      </div>
    </div>
  );
}

export function imageFileChecker(fileName) {
  const fileExtension = getFileExtension(fileName);
  const regex = new RegExp(/^(jpg|jpeg|png)$/i);

  if (fileExtension == null) {
    return false;
  }

  return regex.test(fileExtension);
}

function getFileExtension(filename) {
  return filename.substring(filename.lastIndexOf(".") + 1, filename.length);
}

export function getFileNameWithoutExtension(fileName) {
  return fileName.substring(0, fileName.lastIndexOf("."));
}
