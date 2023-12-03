import React from "react";
import { HeaderUser } from "./components/Header";
import Dashboard from "./user-components/Dashboard";
import About from "./components/About";
import Downloads from "./components/Downloads";
import { Route, Routes } from "react-router-dom";
import Home from "./user-components/Home";
import Account from "./user-components/Account";
import Create from "./user-components/FontCreator";
import backgroundVideo from "./videos/background.mp4";

export default function AppUser() {
  return (
    <>
      <video
        muted
        autoplay={"autoplay"}
        preload="auto"
        loop
        className="fixed min-h-full min-w-full -z-10"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div>
        <HeaderUser />
        <div
          className="flex mt-20 justify-center items-center"
          // style={{ height: "600px" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/account" element={<Account />} />
            {/* <Route path="/logout" element={<Register />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
}
