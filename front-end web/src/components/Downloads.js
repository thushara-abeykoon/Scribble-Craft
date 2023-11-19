import React from "react";
import DownloadCard from "./DownloadCard";
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { BsAndroid2 } from "react-icons/bs";

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
    <div>
      {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium non, a id exercitationem nesciunt nostrum. Ipsum quod veniam nam aliquid eum earum voluptates, quo iste tenetur suscipit pariatur obcaecati debitis nostrum hic magnam nihil voluptas. Maxime nemo explicabo ullam eveniet harum animi tempore mollitia non, perspiciatis beatae fuga deleniti dignissimos itaque cum officia, provident autem nam distinctio in magni rem? Voluptates quae eum tempore voluptatum inventore. Porro repellat repudiandae laudantium? Debitis corrupti soluta distinctio alias amet obcaecati nisi. Eum excepturi dolorem alias sed saepe voluptatibus, iste sunt consequatur modi dolor, itaque aspernatur enim commodi dolorum non amet quasi ullam vel!</p> */}
      <div className="flex justify-around w-screen">
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
