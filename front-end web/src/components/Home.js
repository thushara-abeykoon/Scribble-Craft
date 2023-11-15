import React, { useEffect } from 'react'
import { IoIosArrowDropright } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js';

export default function Home() {
    const navigate = useNavigate()
    const el = React.useRef(null);
    useEffect(()=>{
        const typed = new Typed(el.current,{
            strings: ["See your style on screen...","Type with your own handwriting.","Turn your script digital.","Click below to get started..!"],
            typeSpeed:150,
            backSpeed:60,
            loop:true
        });
        return ()=>{
            typed.destroy()
        };
    },[])
  return (
    <>
    <div className='flex flex-col items-center'>
        <div className='typingText' style={{fontFamily:"monospace"}}>
            <p className='inline typingText' ref={el}></p>
        </div>
      <buttton className="button buttonHome" onClick={()=>{navigate('/register')}}> 
      Get Started <IoIosArrowDropright className='iconRightArrow'/></buttton>
    </div>
    </>
  )
}