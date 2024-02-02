import axios from "axios";
import React, { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleLogin = async(e) => { 
      e.preventDefault()
      await axios.post("http://localhost:5000/user/login",{email, password})
   }

  return (
    <div className="box font-mono">
      <p className="boxHeader">Login</p>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="inputField" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="inputField" />
        <input type="submit" value="Login" className="button" />
        <p className="text-xs text-stone-200 mt-8 hover:underline hover:underline-offset-2 cursor-pointer">
          Forgot Password?
        </p>
      </form>
    </div>
  );
}

export function Register() {
  const handleSubmit = (event) => {};

  return (
    <div
      className="box font-mono"
      style={{
        paddingTop: "50px",
        height: "450px",
        justifyContent: "flex-start",
      }}
    >
      <p className="boxHeader">Register</p>
      <form>
        <input type="text" placeholder="Name" className="inputField" />
        <input type="email" placeholder="Email" className="inputField" />
        <input type="password" placeholder="Password" className="inputField" />
        <input
          type="password"
          placeholder="Confirm Password"
          className="inputField"
        />
        <input type="submit" value="Register" className="button" />
      </form>
    </div>
  );
}
