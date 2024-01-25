import React, { useState } from "react";
import AICreate from "./AICreate";
import ManualCreate from "./ManualCreate";
import CreateFont from "./FontDetailsAdder";

export default function FontCreatorManual() {
  const [create, setCreate] = useState(true);

  return (
    <div>
      {create ? (
        <ManualCreate setCreate={setCreate} />
      ) : (
        <CreateFont setCreate={setCreate} />
      )}
    </div>
  );
}
