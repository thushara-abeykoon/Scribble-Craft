import { data } from "autoprefixer";
import axios from "axios";
import React, { useState } from "react";

const CharacterChoose = () => {
  const characters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const [loading, setLoading] = useState(true);
  const [characterFiles, setCharacterFiles] = useState([{ name: "A", data: ["something1", "something2"] }, { name: "B", data: ["something1", "something2"] }]);
  const [selectedCharacterFiles, setSelectedCharacterFiles] = useState([]);
  const url = "";

  // characters.forEach(async (character) => {
  //   axios.get(`http://localhost:5000/getImages/${character}`).then(res => {
  //     if (res.status === 200) {
  //       setCharacterFiles([...{ name: character, data: res.data }])
  //     }
  //   }).catch(err => {
  //     console.error(err)
  //   })
  // });


  console.log(characterFiles);

  return <div className="flex flex-col justify-around items-start bg-white w-full mx-10 p-10 gap-10">
    {characterFiles.map(characterFile => (
      <CharacterArrayChard name={characterFile.name} data={characterFile.data}/>
    ))}
  </div>;
};


const CharacterArrayChard = ({name, data}) => { 
  
  const [selectedIndex, setSelectedIndex] = useState();
  
  const handleSelection = (index) => { setSelectedIndex(index) }

  return(<div className="flex flex-col justify-around">
  <p>Character {name}</p>
  <div className="flex w-full justify-around gap-10">
    {data.map((data, index) => (
      <CharacterCard data={data} index={index} selectedStatus={index===selectedIndex} handleSelection={handleSelection} />
    ))}
  </div>
</div>)
 }

const CharacterCard = ({ index, data, selectedStatus, handleSelection }) => {;


  return <div className={`h-24 w-24 flex justify-center items-center bg-red-500 rounded-lg cursor-pointer ${selectedStatus ? 'border-4 border-blue-500' : 'border-none'}`} onClick={() => { handleSelection(index) }}>
    {data}
  </div>
}

export default CharacterChoose;
