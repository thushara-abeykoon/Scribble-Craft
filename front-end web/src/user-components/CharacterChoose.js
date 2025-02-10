import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { imageFileChecker } from "./ManualCreate";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CharacterChoose = ({ setCreate }) => {
  const characters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const [loading, setLoading] = useState(false);
  const [generateButtonClicked, setGenerateButtonClicked] = useState(false);
  const [characterFiles, setCharacterFiles] = useState([]);
  const [selectedCharacterFiles, setSelectedCharacterFiles] = useState([]);

  useEffect(() => {
    characters.forEach((character) => {
      axios
        .get(`http://localhost:5000/auto/request_predictions/${character}`)
        .then((res) => {
          if (res.status === 200) {
            setCharacterFiles((prevState) => [
              ...prevState,   
              { name: character, data: res.data },
            ]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }, []);

  const generateFont = async (selectedCharacterFiles) => {
    setLoading(true); 
    const apiUrl = "http://localhost:5000/auto/generate";
    const jwtToken = `Bearer ${localStorage.getItem("token")}` 
    // const formData = new FormData();
    // console.log(selectedCharacterFiles);

    // formData.append("data",selectedCharacterFiles);

    // selectedCharacterFiles.forEach((obj) => {
    //   formData.append(obj.name, obj.data);
    // });

    await axios
      .post(apiUrl, selectedCharacterFiles, {
        headers: {
          // "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: jwtToken,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCreate(true);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  // console.log(selectedCharacterFiles);

  return (
    <div>
      {!generateButtonClicked ? (
        <div className="grid grid-cols-3 justify-around items-start w-full p-10 gap-10">
          {characterFiles.map((characterFile) => (
            <CharacterArrayChard
              setSelectedCharacterFiles={setSelectedCharacterFiles}
              name={characterFile.name}
              data={characterFile.data}
            />
          ))}
          {characterFiles.length === selectedCharacterFiles.length &&
          characterFiles.length !== 0 ? (
            <NextButton setGenerateButtonClicked={setGenerateButtonClicked} />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-6 justify-around items-start w-full p-10 gap-10">
            {characters.map((character) => (
              <CharacterUploadBox
                setSelectedCharacterFiles={setSelectedCharacterFiles}
                character={character}
                characterImage={
                  selectedCharacterFiles
                    .filter((obj) => obj.name === character)
                    .map((el) => el.data)[0]
                }
              />
            ))}
          </div>
          {selectedCharacterFiles.length === 26 ? (
            <div className="flex justify-center items-center py-5 backdrop-blur-sm fixed bottom-0 left-0 w-full">
              <button
                onClick={() => generateFont(selectedCharacterFiles)}
                className="bg-teal-700 w-40 h-14 text-white text-xl font-mono rounded-md hover:bg-orange-600 transition-all duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
                ) : (
                  <>Process</>
                )}
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

const CharacterArrayChard = ({ name, data, setSelectedCharacterFiles }) => {
  const [selectedIndex, setSelectedIndex] = useState();

  const handleSelection = (index) => {
    setSelectedIndex(index);
    setSelectedCharacterFiles((prevState) =>
      !prevState.find((obj) => obj.name === name)
        ? [...prevState, { name, data: `data:image/png;base64,${data[index]}` }]
        : prevState
    );
  };

  return (
    <div className="rounded-2xl flex flex-col items-center gap-5 justify-around bg-opacity-70 bg-stone-300 px-5 py-8 w-max">
      <p className="text-3xl font-mono font-bold">Character {name}</p>
      <div className="grid grid-cols-3 w-full gap-10 h-64 overflow-auto noScrollBar">
        {data.map((data, index) => (
          <CharacterCard
            data={data}
            index={index}
            selectedStatus={index === selectedIndex}
            handleSelection={handleSelection}
          />
        ))}
      </div>
    </div>
  );
};

// character card component used to display predicted character images
const CharacterCard = ({ index, data, selectedStatus, handleSelection }) => {
  return (
    <div
      className={`h-24 w-24 flex justify-center items-center bg-white rounded-lg cursor-pointer ${
        selectedStatus ? "border-4 border-blue-800" : "border-2 border-black"
      }`}
      onClick={() => {
        handleSelection(index);
      }}
    >
      {data ? (
        <img src={`data:image/png;base64,${data}`} className="w-full h-full" />
      ) : (
        <></>
      )}
    </div>
  );
};

// after selecting all predicted characters, next button is displayed
const NextButton = ({ setGenerateButtonClicked }) => {
  const url = "";

  return (
    <div className="fixed bottom-0 left-0 w-full h-24 bg-white bg-opacity-0 flex justify-center items-center">
      <button
        onClick={() => {
          setGenerateButtonClicked(true);
        }}
        className="w-40 h-14 flex justify-center items-center bg-orange-600 text-white font-mono text-xl rounded-xl hover:bg-teal-700 transition-all duration-200"
      >
        Next
      </button>
    </div>
  );
};

// this component used to upload character images
const CharacterUploadBox = ({
  setSelectedCharacterFiles,
  character,
  characterImage,
}) => {
  // console.log(characterImage);

  const onDrop = (acceptedFile) => {
    if (imageFileChecker(acceptedFile[0].name)) {
      // console.log(acceptedFile[0].name);

      convertBlobtoBase64(acceptedFile[0]).then(data=>{
        setSelectedCharacterFiles((prevState) => [
          ...prevState.filter((obj) => obj.name !== character),
          { name: character, data },
        ]);
      });

    } else alert("Wrong File Type Detected!");
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });
  return (
    <div
      {...getRootProps()}
      className="backdrop-blur-sm w-full cursor-pointer transition-colors duration-200 h-64 flex justify-around items-center font-mono  rounded-xl hover:bg-white hover:bg-opacity-10 text-5xl text-white flex-col"
    >
      {characterImage ? (
        <img
          src={characterImage}
          className="w-full h-3/4 border-4 opacity-60 border-white-700 rounded-t-xl"
        />
      ) : (
        <>
          <input {...getInputProps()} />
          <div className=" px-5 py-3 border-dashed border-t-4 border-x-4 border-white border-opacity-40 rounded-t-xl h-3/4 flex flex-col justify-center gap-6 items-center w-full text-center text-lg">
            <FiUpload className="text-5xl" />
            <p>Click or Drop Here to Upload Image</p>
          </div>
        </>
      )}
      <div className="h-1/4 rounded-b-xl text-3xl flex justify-center items-center w-full bg-white bg-opacity-40 text-white">
        {character}
      </div>
    </div>
  );
};

export default CharacterChoose;


// this function converts blob type image to base64
const convertBlobtoBase64 = async (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data)
    };
  });
}
