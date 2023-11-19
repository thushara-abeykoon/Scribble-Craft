import React from "react";
import DownloadCard from "./DownloadCard";
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { BsAndroid2 } from "react-icons/bs";
import { downloadDesc } from "../utils/desc";

export default function Downloads() {
  const downloadableItems = [
    {
      title: "Google Play",
      headerImage: "googlePlaystore.jpg",
      desc: "Download our mobile app for your Android",
      icon: <FaGooglePlay />,
      buttonHeader: "GET IT ON",
      buttonTitle: "Google Play",
    },
    {
      title: "Download APK",
      headerImage: "android.png",
      desc: "Download our mobile app for your Android",
      icon: <BsAndroid2 />,
      buttonHeader: "Direct Download",
      buttonTitle: "APK Here",
    },
    {
      title: "Appstore",
      headerImage: "appleAppstore.png",
      desc: "Download our mobile app for your IOS",
      icon: <FaApple />,
      buttonHeader: "Download on the",
      buttonTitle: "App Store",
    },
  ];
  return (
    <div className="flex flex-col items-center py-10 rounded-3xl px-10 mx-10 bg-stone-400 bg-opacity-25 backdrop-blur-sm">
      <div className="p-16 text-stone-800 text-lg font-medium text-justify">
        <p>{downloadDesc.description}</p>
      </div>
      <div className="mt-10 mb-10 h-92 grid grid-cols-3 gap-20 h-full">
        {downloadableItems.map((el) => {
          return (
            <DownloadCard
              title={el.title}
              headerImage={el.headerImage}
              desc={el.desc}
              icon={el.icon}
              buttonHeader={el.buttonHeader}
              buttonTitle={el.buttonTitle}
            />
          );
        })}
      </div>
    </div>
  );
}
