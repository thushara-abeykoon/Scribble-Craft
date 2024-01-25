import React, { useState } from "react";
import AlertBox from "../other-components/AlertBox";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [typedText, setTypedText] = useState();

  return (
    <div className="flex flex-col justify-around items-center gap-10 w-screen px-10">
      <AlertBox message={"Your font isn't created yet"} />
      <div className="flex w-full gap-5 px-5">
        <textarea
          value={typedText}
          className="resize-none text-lg p-5 outline-none h-96 w-full bg-white rounded-2xl focus:bg-orange-200 transition-all duration-200 font-sans"
          onChange={(e) => setTypedText(e.target.value)}
        ></textarea>
        <textarea
          value={typedText}
          className="handwrittenFont resize-none text-lg p-5 outline-none h-96 w-full bg-white rounded-2xl"
          readOnly="true"
        ></textarea>
      </div>
      <button
        className="bg-orange-600 mb-10 h-12 w-40 flex items-center justify-center text-white rounded-lg hover:bg-teal-600 transition-all duration-200"
        onClick={() => {
          setLoading(true);
        }}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
        ) : (
          "Generate PDF"
        )}
      </button>
    </div>
  );
}

const savePDF = () => {
  const apiUrl = "http://localhost:5000/generatePdf";
};
