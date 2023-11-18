import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { TbMinusVertical } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Typed from "typed.js";
import TextBoxHome from "./TextBoxHome";

export default function Home() {
  const navigate = useNavigate();
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
      <div className="flex flex-col items-center mt-0 justify-around ">
        <div className=" px-20 grid grid-cols-3 grid-rows-1 gap-5">
          <TextBoxHome
            fontClass={"alex"}
            title={"Sample Title"}
            desc={
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis similique praesentium, mollitia earum, unde nulla eaque alias aliquid iusto modi in optio ad at possimus magni. Minima ut, quaerat temporibus inventore pariatur, repellat fuga distinctio nihil nam numquam explicabo sit quasi dolorem? Inventore voluptas dolorem maxime corrupti non magnam quisquam sunt nostrum error vitae omnis ea, tempora deserunt cupiditate pariatur tenetur quas enim natus distinctio recusandae alias! Esse, praesentium a consectetur commodi enim vitae libero cumque sunt qui in? Dicta deserunt culpa iure ipsum expedita sunt iste deleniti esse! Perferendis corporis omnis fugiat amet consectetur odit eligendi adipisci odio tempora."
            }
          />
          {/* <TextBoxHome
            fontClass={"ayul"}
            title={"Hi this is something"}
            desc={
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis similique praesentium, mollitia earum, unde nulla eaque alias aliquid iusto modi in optio ad at possimus magni. Minima ut, quaerat temporibus inventore pariatur, repellat fuga distinctio nihil nam numquam explicabo sit quasi dolorem? Inventore voluptas dolorem maxime corrupti non magnam quisquam sunt nostrum error vitae omnis ea, tempora deserunt cupiditate pariatur tenetur quas enim natus distinctio recusandae alias! Esse, praesentium a consectetur commodi enim vitae libero cumque sunt qui in? Dicta deserunt culpa iure ipsum expedita sunt iste deleniti esse! Perferendis corporis omnis fugiat amet consectetur odit eligendi adipisci odio tempora."
            }
          />
          <TextBoxHome
            fontClass={"southam"}
            title={"Sample Title"}
            desc={
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis similique praesentium, mollitia earum, unde nulla eaque alias aliquid iusto modi in optio ad at possimus magni. Minima ut, quaerat temporibus inventore pariatur, repellat fuga distinctio nihil nam numquam explicabo sit quasi dolorem? Inventore voluptas dolorem maxime corrupti non magnam quisquam sunt nostrum error vitae omnis ea, tempora deserunt cupiditate pariatur tenetur quas enim natus distinctio recusandae alias! Esse, praesentium a consectetur commodi enim vitae libero cumque sunt qui in? Dicta deserunt culpa iure ipsum expedita sunt iste deleniti esse! Perferendis corporis omnis fugiat amet consectetur odit eligendi adipisci odio tempora."
            }
          /> */}
        </div>
        <div className="flex justify-center items-center fixed bottom-0 z-30 w-screen h-20 transition-all">
          <buttton
            className="hover:bg-teal-700 transition-colors duration-500 rounded-md flex justify-around items-center w-44 px-5 cursor-pointer py-3 text-white bg-orange-700"
            onClick={() => {
              navigate("/register");
            }}
          >
            <span className="font-semibold text-stone-300">Get Started</span>
            <TbMinusVertical className="text-3xl text-stone-300" />
            <FaArrowRight className="text-md text-stone-300" />
          </buttton>
        </div>
      </div>
    </>
  );
}
