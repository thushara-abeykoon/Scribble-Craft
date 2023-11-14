import React, { useState } from "react";


export function Login() {
  return (
    <div className="box">
      <p className="boxHeader">Login</p>
      <form>
      <input type="email" placeholder="Email" className="inputField" />
      <input type="password" placeholder="Password" className="inputField"/>
      <input type="submit" value="Login" className="button" />
      <p className="text-xs text-stone-500 mt-8 hover:underline hover:underline-offset-2 cursor-pointer">Forgot Password?</p>
      </form>
    </div>
  );
}

export function Register() {
  return (
    <div className="box" style={{padding:"50px", height:"450px", justifyContent:"flex-start"}}>
      <p className="boxHeader">Register</p>
      <form>
        <input type="text" placeholder="Name" className="inputField" />
        <input type="email" placeholder="Email" className="inputField"/>
        <input type="password" placeholder="Password" className="inputField"/>
        <input type="password" placeholder="Confirm Password" className="inputField"/>
        <input type="submit" value="Register" className="button" />
      </form>
    </div>
  );
}
