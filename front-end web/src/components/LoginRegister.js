import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../other-components/SuccessAlert";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ErrorAlert from "../other-components/ErrorAlert";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorActive, setIsErrorActive] = useState(false);

  const handleLogin = async(e) => { 
      setIsLoading(true);
      e.preventDefault()
      await axios.post("http://localhost:5000/user/login",{email, password}).then(res=> {
        setIsLoading(false);
      if(res.status === 200){
        localStorage.setItem("token",res.data['access_token'])
        window.location.href = "http://localhost:3000";
      }
    }).catch(err=>{
      setIsLoading(false);
      setIsErrorActive(true);
    });
   }

  return (
    <div className="box font-mono">
      <p className="boxHeader">Login</p>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="inputField" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="inputField" />
        <button type="submit" className="button">{isLoading?<AiOutlineLoading3Quarters className="text-3xl animate-spin" />:"Login"}</button>
        <p className="text-xs text-stone-200 mt-8 hover:underline hover:underline-offset-8 cursor-pointer">
          Forgot Password?
        </p>
      </form>
      {isErrorActive?<ErrorAlert alertInfo={"Invalid email or password"} setIsActive={setIsErrorActive} />:null}
    </div>
  );
}

export function Register() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [alertBoxActive, setAlertBoxActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!password !== confirmPassword){
      registerUser()
    }
  };

  const registerUser = async () => {
    setIsLoading(true);
    await axios.post("http://localhost:5000/user/register",{name,email,password})
    .then(res=>{
      setIsLoading(false);
      setAlertBoxActive(true);
    })
    .catch(err=>{
      setIsLoading(false);
      alert("Error Occured!");
    })
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
       <button type="submit" className="button">{isLoading?<AiOutlineLoading3Quarters className="text-3xl animate-spin" />:"Register"}</button>
      </form>
      {alertBoxActive?<SuccessAlert alertInfo={"Registration Successful"} setIsActive={setAlertBoxActive} buttonFunction={()=>{navigate('/login')}} />:<></>}
    </div>
  );
}
