import axios from "axios";
import React, { useState } from "react";

const CharacterChoose = () => {
  const [loading, setLoading] = useState(true);
  const [characterFiles, setCharacterFiles] = useState();
  const [selectedCharacterFiles, setSelectedCharacterFiles] = useState([]);
  const url = "";
  axios
    .get(url)
    .then((res) => {
      if (res.status === 200) {
        setCharacterFiles(res.data);
      }
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setLoading(false);
    });
  console.log(characterFiles);
  return <div></div>;
};

export default CharacterChoose;
