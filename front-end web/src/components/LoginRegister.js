import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();


  const handleLogin = async(e) => { 
      e.preventDefault()
      await axios.post("http://localhost:5000/user/login",{email, password}).then(res=> {
      if(res.status === 200){
        localStorage.setItem("token",res.data['access_token'])
        
        navigate('/')
        window.location.reload();

      }
    }).catch(err=>console.log(err));
   }

  return (
    <div className="box font-mono">
      <p className="boxHeader">Login</p>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="inputField" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="inputField" />
        <input type="submit" value="Login" className="button" />
        <p className="text-xs text-stone-200 mt-8 hover:underline hover:underline-offset-8 cursor-pointer">
          Forgot Password?
        </p>
      </form>
    </div>
  );
}

export function Register() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!password !== confirmPassword){
      registerUser()
    }
  };

  const registerUser = async () => {
    await axios.post("http://localhost:5000/user/register",{name,email,password})
    .then(res=>console.log(res.data))
    .catch(err=>console.error(err))
  }

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
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder="Name" className="inputField" />
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="inputField" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="inputField" />
        <input
        value={confirmPassword}
        onChange={e=>setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          className="inputField"
        />
        <input type="submit" value="Register" className="button" />
      </form>
    </div>
  );
}
