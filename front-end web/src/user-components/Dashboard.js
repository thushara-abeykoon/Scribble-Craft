import React, { useEffect, useState } from "react";
import AlertBox from "../other-components/AlertBox";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import CustomFont from "../fonts/akaDora.ttf";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [typedText, setTypedText] = useState();
  const [fontStyle, setFontStyle] = useState(CustomFont);
  const [fontCreatedStatus, setFontCreatedStatus] = useState(false);

  const font = new FontFace("MyHandwriting", `url(${fontStyle})`, {
    fontWeight: "normal",
    fontStyle: "normal",
  });

  font.load().then(() => {
    document.fonts.add(font);
  });

  useEffect(() => {
    const getFont = async () => {
      await axios
        .get("http://localhost:5000/manual/request-font",{headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }})
        .then((res) => {
          if (res.status === 200) {
            setFontCreatedStatus(true);
            setFontStyle(
              `data:application/x-font-woff;charset=utf-8;base64,${res.data.font}`
            );
          }
        })
        .catch((err) => console.error(err));
    };
    getFont();
  }, []);

  const downloadFont = async() => {
    try {
      setLoading(true)
      const response = await axios.get('http://127.0.0.1:5000/manual/download_font', {responseType:"blob", headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }});
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'font.ttf'; // Change this to your file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
  } catch (error) {
      console.error('Download error:', error);
  }
  finally{
    setLoading(false)
  }
  }

  return (
    <div className="flex flex-col justify-around items-center gap-10 w-screen px-10">
      {!fontCreatedStatus ? (
        <AlertBox
          message={"Your font isn't created yet.. Try our sample font"}
        />
      ) : (
        <></>
      )}
      <div className="flex w-full gap-5 ">
        <textarea
          autoFocus
          value={typedText}
          className="noScrollBar resize-none p-5 outline-none h-96 w-full bg-white bg-opacity-20 backdrop-blur-md rounded-2xl focus:bg-blue-200 focus:bg-opacity-40 transition-all duration-300 text-black font-bold text-lg font-sans"
          onChange={(e) => setTypedText(e.target.value)}
        ></textarea>
        <textarea
          value={typedText}
          style={{ fontFamily: "MyHandwriting", fontSize: "100px" }}
          className="noScrollBar  handwrittenFont bg-opacity-40 backdrop-blur-md resize-none text-8xl p-5 outline-none h-96 w-full bg-white rounded-2xl"
          readOnly="true"
        ></textarea>
      </div>
      <button
        className="bg-blue-700 mb-10 h-12 w-40 flex items-center justify-center text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
        onClick={downloadFont}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
        ) : (
          "Download Font"
        )}
      </button>
    </div>
  );
}
