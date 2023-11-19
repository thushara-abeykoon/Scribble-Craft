import React from "react";

export default function DownloadCard({title,headerImage,desc,icon,buttonHeader,buttonTitle}) {
  return <div className={`justify-between flex-col w-72 flex items-center h-96 bg-black bg-opacity-20 backdrop-blur-md  rounded-3xl`}>
    
    <img className="w-72 rounded-ss-3xl rounded-se-3xl" src={`./images/${headerImage}`} alt="" />
    <div className=" h-full justify-around flex flex-col items-center">
        <div className="flex flex-col items-center text-center w-72 px-10">
            <h2 className="mb-4 text-xl font-semibold">{title}</h2>
            <p>{desc}</p>
        </div>
        <button className="flex hover:bg-black bg-stone-800 text-white text-left items-center py-2 px-5 rounded-lg">
            <div className="text-4xl mr-3">{icon}</div>
            <div className="flex flex-col">
            <span className="text-xs">{buttonHeader}</span>
            <span className="text-lg">{buttonTitle}</span>
            </div>
        </button>
    </div>
  </div>;
}
