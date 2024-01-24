import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppUser from "./AppUser";

export default function App() {
  return (
    <BrowserRouter>
      <AppUser />
    </BrowserRouter>
  );
}
