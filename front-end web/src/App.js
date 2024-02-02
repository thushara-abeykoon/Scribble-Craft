import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppUser from "./AppUser";
import AppWelcome from "./AppWelcome";

export default function App() {
  return (
    <BrowserRouter>
      <AppWelcome />
    </BrowserRouter>
  );
}
