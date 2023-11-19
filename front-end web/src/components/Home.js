import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { TbMinusVertical } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { QuotesCard } from "./QuotesCard";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center fixed bottom-0 justify-around ">
        <div className=" px-20 grid grid-cols-3 grid-rows-1 gap-5">
          {/* <QuotesCard
            fontClass={"akadora"}
            title={"- Martin Fowler -"}
            desc={
              '"When you don\'t create things, you become defined by your tastes rather than ability. your tastes only narrow and exclude people. so create...."'
            }
          />
          <QuotesCard
            fontClass={"ayul"}
            title={"- Vincent Van Gogh -"}
            desc={
              '"For the great doesn\'t happen through impulse alone, and is a succession of little things that are brought together...."'
            }
          />
          <QuotesCard
            fontClass={"southam"}
            title={"- Steve Jobs -"}
            desc={
              '"Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn\'t really do it, they just saw something. It seemed obvious to them after a while...."'
            }
          /> */}
        </div>
        <div className="flex justify-center items-center z-30 w-full h-24 transition-all">
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
