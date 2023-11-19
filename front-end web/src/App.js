import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { Login, Register } from "./components/LoginRegister";
import Header from "./components/Header";
import backgroundVideo from "./videos/background.mp4";
import Downloads from "./components/Downloads";

function App() {
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
      <div className="w-screen h-screen flex flex-col items-center">
        <Header />
        <div
          className="flex justify-center items-center"
          style={{ height: "600px" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
