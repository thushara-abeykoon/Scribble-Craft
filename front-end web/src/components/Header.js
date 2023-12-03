import React, { useEffect, useState } from "react";
import NavigationBar, { NavBarUser } from "./NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [isHome, setIsHome] = useState(
    location.pathname === "/" ? true : false
  );
  useEffect(() => {
    if (location.pathname == "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  });
  const navigate = useNavigate();
  return (
    <div
      className={
        !isHome
          ? "headerWrapper flex px-10 pt-10 items-center w-full h-20"
          : "justify-between flex px-10 pt-10 items-center w-full h-20"
      }
    >
      <div
        className={
          isHome
            ? "headerDiv flex flex-col place-items-center"
            : "headerDivNotHome flex flex-col place-items-center"
        }
      >
        <h1
          className={
            isHome ? "header cursor-pointer" : "headerNotHome cursor-pointer"
          }
          onClick={() => {
            navigate("/");
            setIsHome(true);
          }}
        >
          Scribble Craft
        </h1>
        <p className="text-xs">text to handwriting converter</p>
      </div>
      {isHome ? <NavigationBar /> : null}
    </div>
  );
}

export function HeaderUser() {
  const navigate = useNavigate();
  return (
    <div className="justify-between flex px-10 pt-10 items-center w-full h-20">
      <div
        className="headerDiv flex flex-col place-items-center "
        onClick={() => {
          navigate("/");
        }}
      >
        <h1 className="header cursor-pointer">Scribble Craft</h1>
        <p className="text-xs">text to handwriting converter</p>
      </div>
      <NavBarUser />
    </div>
  );
}
