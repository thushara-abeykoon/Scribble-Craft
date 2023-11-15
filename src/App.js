import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { Login, Register } from "./components/LoginRegister";
import Header from "./components/Header";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Header />
      <div
        className="flex justify-center items-center"
        style={{ height: "600px" }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
