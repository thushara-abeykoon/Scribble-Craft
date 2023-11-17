import React, { useEffect } from 'react'
import { IoIosArrowDropright } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js';
import TextBoxHome from './TextBoxHome';

export default function Home() {
    const navigate = useNavigate()
    // const el = React.useRef(null);
    // useEffect(()=>{
    //     const typed = new Typed(el.current,{
    //         strings: ["See your style on screen...","Type with your own handwriting.","Turn your script digital.","Click below to get started..!"],
    //         typeSpeed:150,
    //         backSpeed:60,
    //         loop:true
    //     });
    //     return ()=>{
    //         typed.destroy()
    //     };
    // },[])
  return (
    <>
    <div className='flex flex-col items-center mt-5'>
        <div className=' px-20 grid grid-cols-3 gap-10'>
           <TextBoxHome fontClass={'alex'} title={"Sample Title"} desc={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis similique praesentium, mollitia earum, unde nulla eaque alias aliquid iusto modi in optio ad at possimus magni. Minima ut, quaerat temporibus inventore pariatur, repellat fuga distinctio nihil nam numquam explicabo sit quasi dolorem? Inventore voluptas dolorem maxime corrupti non magnam quisquam sunt nostrum error vitae omnis ea, tempora deserunt cupiditate pariatur tenetur quas enim natus distinctio recusandae alias! Esse, praesentium a consectetur commodi enim vitae libero cumque sunt qui in? Dicta deserunt culpa iure ipsum expedita sunt iste deleniti esse! Perferendis corporis omnis fugiat amet consectetur odit eligendi adipisci odio tempora."} />
         <TextBoxHome fontClass={'ayul'} title={"Hi this is something"} desc={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis similique praesentium, mollitia earum, unde nulla eaque alias aliquid iusto modi in optio ad at possimus magni. Minima ut, quaerat temporibus inventore pariatur, repellat fuga distinctio nihil nam numquam explicabo sit quasi dolorem? Inventore voluptas dolorem maxime corrupti non magnam quisquam sunt nostrum error vitae omnis ea, tempora deserunt cupiditate pariatur tenetur quas enim natus distinctio recusandae alias! Esse, praesentium a consectetur commodi enim vitae libero cumque sunt qui in? Dicta deserunt culpa iure ipsum expedita sunt iste deleniti esse! Perferendis corporis omnis fugiat amet consectetur odit eligendi adipisci odio tempora."} />
          <TextBoxHome fontClass={'southam'} title={"Sample Title"} desc={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis similique praesentium, mollitia earum, unde nulla eaque alias aliquid iusto modi in optio ad at possimus magni. Minima ut, quaerat temporibus inventore pariatur, repellat fuga distinctio nihil nam numquam explicabo sit quasi dolorem? Inventore voluptas dolorem maxime corrupti non magnam quisquam sunt nostrum error vitae omnis ea, tempora deserunt cupiditate pariatur tenetur quas enim natus distinctio recusandae alias! Esse, praesentium a consectetur commodi enim vitae libero cumque sunt qui in? Dicta deserunt culpa iure ipsum expedita sunt iste deleniti esse! Perferendis corporis omnis fugiat amet consectetur odit eligendi adipisci odio tempora."} />
        </div>
      <buttton className="button buttonHome" onClick={()=>{navigate('/register')}}> 
      Get Started <IoIosArrowDropright className='iconRightArrow'/></buttton>
    </div>
    </>
  )
}