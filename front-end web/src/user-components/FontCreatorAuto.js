import React, { useState } from "react";
import CharacterChoose from "./CharacterChoose";
import CreateFont from "./FontDetailsAdder";

const FontCreatorAuto = () => {
  const [create, setCreate] = useState(false);

  return (
    <div>
      {!create ? (
        <CharacterChoose setCreate={setCreate} />
      ) : (
        <CreateFont setCreate={setCreate} font_type="auto" />
      )}
    </div>
  );
};

export default FontCreatorAuto;
