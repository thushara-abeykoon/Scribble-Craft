import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    console.log(window.location.href);
    const [isHome,setIsHome] = useState((window.location.href==="http://localhost:3000/")?true:false);
  const navigate = useNavigate();
  return (
    <div className={(!isHome)?'headerWrapper flex px-10 pt-10 items-center w-full h-20':'justify-between flex px-10 pt-10 items-center w-full h-20'} >
      <div className={(isHome)?"headerDiv flex flex-col place-items-center":"headerDivNotHome flex flex-col place-items-center"}>
        <h1 className={(isHome)?'header cursor-pointer':'headerNotHome cursor-pointer'} onClick={()=>{navigate("/"); setIsHome(true)}}>
            type 2 write
        </h1>
        <p className='text-xs'>text to handwriting converter</p>
      </div>
        {(isHome)?<NavigationBar />:null}
    </div>
  )
}
