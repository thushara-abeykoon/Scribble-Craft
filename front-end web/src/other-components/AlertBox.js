import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

export default function AlertBox({ message }) {
  const [alertBoxVisible, setAlertBoxVisible] = useState(true);

  return alertBoxVisible ? (
    <div className="w-full bg-red-300 bg-opacity-50 backdrop-blur-md font-mono px-10 py-3 rounded-lg text-red-900 mb-5 flex justify-between items-center">
      <div className="flex items-center gap-10 w-4/5">
        <p className="text-3xl font-bold">ALERT!</p>
        <p className="w-full">{message}</p>
      </div>
      <IoIosCloseCircle
        className="text-4xl cursor-pointer hover:text-red-700"
        onClick={() => {
          setAlertBoxVisible(false);
        }}
      />
    </div>
  ) : (
    <></>
  );
}
