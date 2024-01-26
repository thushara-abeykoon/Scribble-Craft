import React from "react";
import RobotImage from "../images/robot.jpg";
import HumanImage from "../images/human.jpg";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col justify-around items-center mx-10">
      <div className="grid grid-cols-2 gap-40 mx-10 w-full h-screen">
        <HomeCard
          image={RobotImage}
          title={"Using AI (BETA)"}
          navigation={"/aicreate"}
        />
        <HomeCard
          image={HumanImage}
          title={"Manually!"}
          navigation={"/create"}
        />
      </div>
    </div>
  );
}

function HomeCard({ image, title, navigation }) {
  const navigate = useNavigate();
  return (
    <div className="shadow-stone-800 shadow-2xl w-full h-4/5 bg-teal-700 flex flex-col justify-between items-center text-stone-100 rounded-3xl">
      <div>
        <img src={image} className="w-full rounded-t-2xl" />
      </div>
      <div className="flex flex-col justify-around h-full items-center">
        <p className="text-3xl">
          Create Your Font{" "}
          <span className="font-bold text-orange-200">{title}</span>
        </p>
        <button
          onClick={() => {
            navigate(navigation);
          }}
          className="shadow-2xl bg-orange-700 hover:bg-black py-4 px-8 transition-colors duration-300 rounded-xl text-xl font-normal"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
