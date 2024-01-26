import React from "react";
import RobotImage from "../images/robot.jpg";
import HumanImage from "../images/human.jpg";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex justify-center items-center mx-10">
      <div className="grid grid-cols-2 gap-40 mx-10 w-full h-screen ">
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
    <div
      onClick={() => {
        navigate(navigation);
      }}
      className="hover:bg-opacity-50 cursor-pointer transition-all duration-300 w-full h-96 bg-white bg-opacity-30 backdrop-blur-sm flex flex-col justify-between items-center text-stone-100 rounded-2xl"
    >
      <div>
        <img src={image} className="w-full rounded-t-2xl" />
      </div>
      <div className="flex flex-col justify-around h-full items-center">
        <p className="text-2xl">
          Create Your Font <span className="font-bold">{title}</span>
        </p>
      </div>
    </div>
  );
}
