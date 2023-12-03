import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdDelete } from "react-icons/md";
import { TbCloudUpload } from "react-icons/tb";

export default function AICreate() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles([
        ...uploadedFiles,
        ...acceptedFiles.filter((file) => {
          return imageFileChecker(file.name);
        }),
      ]);
    },
  });

  const handleDelete = (fileIndex) => {
    setUploadedFiles(
      uploadedFiles.filter((file, index) => index !== fileIndex)
    );
  };

  return (
    <div className="w-full flex flex-col mx-10 ">
      <div
        {...getRootProps()}
        className="bg-orange-800 hover:bg-teal-800 transition-colors duration-700 rounded-3xl cursor-pointer w-full h-80 py-10 px-20 text-xl font-bold font-mono text-white flex flex-col items-center justify-around"
      >
        <TbCloudUpload style={{ fontSize: "150px" }} />
        <input {...getInputProps()} />
        <p>Click Or Drop Here to Upload Your File....</p>
        <p>(Image or PDF)</p>
      </div>
      <ul>
        {uploadedFiles.map((file, index) => (
          <FileBar
            key={index}
            fileIndex={index}
            file={file}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

function FileBar({ fileIndex, file, handleDelete }) {
  const imageFile = URL.createObjectURL(file);

  return (
    <div className="w-full py-4 px-10 mt-5 bg-gray-200 rounded-md flex items-center font-mono text-stone-800 font-bold text-lg justify-between">
      <div className="flex justify-center items-center mr-10 w-36 py-3 bg-gray-400 rounded-lg">
        <img src={imageFile} className="h-10" />
      </div>
      <p className="w-3/4">{file.name}</p>
      <div
        className="text-4xl cursor-pointer px-2 py-2 rounded-full hover:text-red-800 hover:bg-gray-300 transition-colors duration-200"
        onClick={() => {
          handleDelete(fileIndex);
        }}
      >
        <MdDelete />
      </div>
    </div>
  );
}

function imageFileChecker(fileName) {
  const fileExtension = getFileExtension(fileName);
  const regex = new RegExp(/^(jpg|jpeg|png|gif|bmp|svg|tiff)$/i);

  if (fileExtension == null) {
    return false;
  }

  return regex.test(fileExtension);
}

function getFileExtension(filename) {
  const extension = filename.substring(
    filename.lastIndexOf(".") + 1,
    filename.length
  );
  return extension;
}
