import React, { useState } from "react";
import CharacterChoose from "./CharacterChoose";
import CreateFont from "./FontDetailsAdder";

const FontCreatorAuto = () => {
  const [create, setCreate] = useState(true);

  return (
    <div>
      {create ? (
        <CharacterChoose setCreate={setCreate} />
      ) : (
        <CreateFont setCreate={setCreate} />
      )}
    </div>
  );
};

export default FontCreatorAuto;
