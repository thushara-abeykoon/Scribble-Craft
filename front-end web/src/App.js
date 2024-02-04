import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppUser from "./AppUser";
import AppWelcome from "./AppWelcome";

export default function App() {
  const [accessToken, setAccessToken] = useState()
  console.log(accessToken);

  useEffect(()=>{
    setAccessToken(localStorage.getItem("token"))
  })
  return (
    <BrowserRouter>
      {accessToken?<AppUser />:<AppWelcome />}
    </BrowserRouter>
  );
}
