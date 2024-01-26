import React, { useState } from "react";
import AICreate from "./AICreate";
import ManualCreate from "./ManualCreate";
import CreateFont from "./FontDetailsAdder";

export default function FontCreatorManual() {
  const [createFont, setCreateFont] = useState(false);

  return (
    <div>
      {!createFont ? (
        <ManualCreate setCreate={setCreateFont} />
      ) : (
        <CreateFont setCreate={setCreateFont} />
      )}
    </div>
  );
}
