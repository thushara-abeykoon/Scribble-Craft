import React from "react";
import { HeaderUser } from "./components/Header";
import Dashboard from "./user-components/Dashboard";
import Downloads from "./components/Downloads";
import { Route, Routes } from "react-router-dom";
import Home from "./user-components/Home";
import FontCreatorManual from "./user-components/FontCreatorManual";
import backgroundVideo from "./videos/background.mp4";
import AICreate from "./user-components/AICreate";
import FontCreatorAuto from "./user-components/FontCreatorAuto";
import axios from "axios";
import CustomFont from "./fonts/akaDora.ttf";
import CreateFont from "./user-components/FontDetailsAdder";

export default function AppUser() {
  return (
    <>
      {/* <video
        muted
        autoPlay={"autoplay"}
        preload="auto"
        loop
        className="fixed min-h-full min-w-full -z-10"
      > <source src={backgroundVideo} type="video/mp4" />
      </video> */}
      <div>
        <HeaderUser />
        <div
          className="flex mt-20 justify-center items-center"
          // style={{ height: "600px" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<FontCreatorManual />} />
            <Route path="/aicreate" element={<AICreate />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/chooseImages" element={<FontCreatorAuto />} />
            {/* <Route path="/logout" element={<Register />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
}
