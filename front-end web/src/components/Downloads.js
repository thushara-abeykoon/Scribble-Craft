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
    <div className="flex flex-col items-center px-10 mx-10 bg-opacity-70 bg-white">
      <div>
        <h2 className="text-3xl font-bold">Sample title</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          non, a id exercitationem nesciunt nostrum. Ipsum quod veniam nam
          aliquid eum earum voluptates, quo iste tenetur suscipit pariatur
          obcaecati debitis nostrum hic magnam nihil voluptas. Maxime nemo
          explicabo ullam eveniet harum animi tempore mollitia non, perspiciatis
          beatae fuga deleniti dignissimos itaque cum officia, provident autem
          nam distinctio in magni rem? Voluptates quae eum tempore voluptatum
          inventore. Porro repellat repudiandae laudantium? Debitis corrupti
          soluta distinctio alias amet obcaecati nisi. Eum excepturi dolorem
          alias sed saepe voluptatibus, iste sunt consequatur modi dolor, itaque
          aspernatur enim commodi dolorum non amet quasi ullam vel!
        </p>
        <p>
          Certainly! Here's a description for a Printed Text to Handwriting
          Generator app: --- **App Name: ScribbleCraft** **Description:**
          Experience the charm of handwritten notes in the digital age with
          ScribbleCraft, your go-to Printed Text to Handwriting Generator app!
          Transform any typed text into beautiful, personalized handwritten
          notes effortlessly. **Key Features:** 1. **Authentic Handwriting
          Styles:** Choose from a variety of carefully crafted handwriting
          styles to give your digital text a genuine, handwritten feel. From
          elegant cursive to playful print, ScribbleCraft has it all. 2.
          **Customization Options:** Personalize your handwritten notes by
          adjusting the size, slant, and spacing of the text. Experiment with
          different ink colors and pen thickness for a truly customized touch.
          3. **Quick and Easy Conversion:** Simply type or paste your text into
          the app, select your preferred handwriting style, and watch as your
          words transform into beautifully handwritten notes in an instant. 4.
          **Versatile Usage:** Use ScribbleCraft for creating unique greeting
          cards, adding a personal touch to digital invitations, or enhancing
          the aesthetics of your digital journal entries. The possibilities are
          endless! 5. **Export and Share:** Save your handwritten creations as
          image files or PDFs, ready to be shared on social media, messaging
          apps, or printed for physical use. Impress your friends and family
          with heartfelt messages. 6. **Effortless Editing:** Easily edit your
          handwritten text by making adjustments directly on the digital canvas.
          Perfect for refining details and ensuring your message looks just the
          way you want it. 7. **User-Friendly Interface:** ScribbleCraft is
          designed with simplicity in mind. The intuitive interface makes it
          easy for users of all ages to enjoy the art of handwritten
          communication in the digital realm. Bring a touch of warmth and
          personality to your digital communication with ScribbleCraft. Download
          now and start creating beautifully handwritten notes that leave a
          lasting impression! --- Feel free to customize this description based
          on any specific features or aspects you want to highlight for your
          app.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          non, a id exercitationem nesciunt nostrum. Ipsum quod veniam nam
          aliquid eum earum voluptates, quo iste tenetur suscipit pariatur
          obcaecati debitis nostrum hic magnam nihil voluptas. Maxime nemo
          explicabo ullam eveniet harum animi tempore mollitia non, perspiciatis
          beatae fuga deleniti dignissimos itaque cum officia, provident autem
          nam distinctio in magni rem? Voluptates quae eum tempore voluptatum
          inventore. Porro repellat repudiandae laudantium? Debitis corrupti
          soluta distinctio alias amet obcaecati nisi. Eum excepturi dolorem
          alias sed saepe voluptatibus, iste sunt consequatur modi dolor, itaque
          aspernatur enim commodi dolorum non amet quasi ullam vel!
        </p>
        <p>
          Certainly! Here's a description for a Printed Text to Handwriting
          Generator app: --- **App Name: ScribbleCraft** **Description:**
          Experience the charm of handwritten notes in the digital age with
          ScribbleCraft, your go-to Printed Text to Handwriting Generator app!
          Transform any typed text into beautiful, personalized handwritten
          notes effortlessly. **Key Features:** 1. **Authentic Handwriting
          Styles:** Choose from a variety of carefully crafted handwriting
          styles to give your digital text a genuine, handwritten feel. From
          elegant cursive to playful print, ScribbleCraft has it all. 2.
          **Customization Options:** Personalize your handwritten notes by
          adjusting the size, slant, and spacing of the text. Experiment with
          different ink colors and pen thickness for a truly customized touch.
          3. **Quick and Easy Conversion:** Simply type or paste your text into
          the app, select your preferred handwriting style, and watch as your
          words transform into beautifully handwritten notes in an instant. 4.
          **Versatile Usage:** Use ScribbleCraft for creating unique greeting
          cards, adding a personal touch to digital invitations, or enhancing
          the aesthetics of your digital journal entries. The possibilities are
          endless! 5. **Export and Share:** Save your handwritten creations as
          image files or PDFs, ready to be shared on social media, messaging
          apps, or printed for physical use. Impress your friends and family
          with heartfelt messages. 6. **Effortless Editing:** Easily edit your
          handwritten text by making adjustments directly on the digital canvas.
          Perfect for refining details and ensuring your message looks just the
          way you want it. 7. **User-Friendly Interface:** ScribbleCraft is
          designed with simplicity in mind. The intuitive interface makes it
          easy for users of all ages to enjoy the art of handwritten
          communication in the digital realm. Bring a touch of warmth and
          personality to your digital communication with ScribbleCraft. Download
          now and start creating beautifully handwritten notes that leave a
          lasting impression! --- Feel free to customize this description based
          on any specific features or aspects you want to highlight for your
          app.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          non, a id exercitationem nesciunt nostrum. Ipsum quod veniam nam
          aliquid eum earum voluptates, quo iste tenetur suscipit pariatur
          obcaecati debitis nostrum hic magnam nihil voluptas. Maxime nemo
          explicabo ullam eveniet harum animi tempore mollitia non, perspiciatis
          beatae fuga deleniti dignissimos itaque cum officia, provident autem
          nam distinctio in magni rem? Voluptates quae eum tempore voluptatum
          inventore. Porro repellat repudiandae laudantium? Debitis corrupti
          soluta distinctio alias amet obcaecati nisi. Eum excepturi dolorem
          alias sed saepe voluptatibus, iste sunt consequatur modi dolor, itaque
          aspernatur enim commodi dolorum non amet quasi ullam vel!
        </p>
        <p>
          Certainly! Here's a description for a Printed Text to Handwriting
          Generator app: --- **App Name: ScribbleCraft** **Description:**
          Experience the charm of handwritten notes in the digital age with
          ScribbleCraft, your go-to Printed Text to Handwriting Generator app!
          Transform any typed text into beautiful, personalized handwritten
          notes effortlessly. **Key Features:** 1. **Authentic Handwriting
          Styles:** Choose from a variety of carefully crafted handwriting
          styles to give your digital text a genuine, handwritten feel. From
          elegant cursive to playful print, ScribbleCraft has it all. 2.
          **Customization Options:** Personalize your handwritten notes by
          adjusting the size, slant, and spacing of the text. Experiment with
          different ink colors and pen thickness for a truly customized touch.
          3. **Quick and Easy Conversion:** Simply type or paste your text into
          the app, select your preferred handwriting style, and watch as your
          words transform into beautifully handwritten notes in an instant. 4.
          **Versatile Usage:** Use ScribbleCraft for creating unique greeting
          cards, adding a personal touch to digital invitations, or enhancing
          the aesthetics of your digital journal entries. The possibilities are
          endless! 5. **Export and Share:** Save your handwritten creations as
          image files or PDFs, ready to be shared on social media, messaging
          apps, or printed for physical use. Impress your friends and family
          with heartfelt messages. 6. **Effortless Editing:** Easily edit your
          handwritten text by making adjustments directly on the digital canvas.
          Perfect for refining details and ensuring your message looks just the
          way you want it. 7. **User-Friendly Interface:** ScribbleCraft is
          designed with simplicity in mind. The intuitive interface makes it
          easy for users of all ages to enjoy the art of handwritten
          communication in the digital realm. Bring a touch of warmth and
          personality to your digital communication with ScribbleCraft. Download
          now and start creating beautifully handwritten notes that leave a
          lasting impression! --- Feel free to customize this description based
          on any specific features or aspects you want to highlight for your
          app.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          non, a id exercitationem nesciunt nostrum. Ipsum quod veniam nam
          aliquid eum earum voluptates, quo iste tenetur suscipit pariatur
          obcaecati debitis nostrum hic magnam nihil voluptas. Maxime nemo
          explicabo ullam eveniet harum animi tempore mollitia non, perspiciatis
          beatae fuga deleniti dignissimos itaque cum officia, provident autem
          nam distinctio in magni rem? Voluptates quae eum tempore voluptatum
          inventore. Porro repellat repudiandae laudantium? Debitis corrupti
          soluta distinctio alias amet obcaecati nisi. Eum excepturi dolorem
          alias sed saepe voluptatibus, iste sunt consequatur modi dolor, itaque
          aspernatur enim commodi dolorum non amet quasi ullam vel!
        </p>
        <p>
          Certainly! Here's a description for a Printed Text to Handwriting
          Generator app: --- **App Name: ScribbleCraft** **Description:**
          Experience the charm of handwritten notes in the digital age with
          ScribbleCraft, your go-to Printed Text to Handwriting Generator app!
          Transform any typed text into beautiful, personalized handwritten
          notes effortlessly. **Key Features:** 1. **Authentic Handwriting
          Styles:** Choose from a variety of carefully crafted handwriting
          styles to give your digital text a genuine, handwritten feel. From
          elegant cursive to playful print, ScribbleCraft has it all. 2.
          **Customization Options:** Personalize your handwritten notes by
          adjusting the size, slant, and spacing of the text. Experiment with
          different ink colors and pen thickness for a truly customized touch.
          3. **Quick and Easy Conversion:** Simply type or paste your text into
          the app, select your preferred handwriting style, and watch as your
          words transform into beautifully handwritten notes in an instant. 4.
          **Versatile Usage:** Use ScribbleCraft for creating unique greeting
          cards, adding a personal touch to digital invitations, or enhancing
          the aesthetics of your digital journal entries. The possibilities are
          endless! 5. **Export and Share:** Save your handwritten creations as
          image files or PDFs, ready to be shared on social media, messaging
          apps, or printed for physical use. Impress your friends and family
          with heartfelt messages. 6. **Effortless Editing:** Easily edit your
          handwritten text by making adjustments directly on the digital canvas.
          Perfect for refining details and ensuring your message looks just the
          way you want it. 7. **User-Friendly Interface:** ScribbleCraft is
          designed with simplicity in mind. The intuitive interface makes it
          easy for users of all ages to enjoy the art of handwritten
          communication in the digital realm. Bring a touch of warmth and
          personality to your digital communication with ScribbleCraft. Download
          now and start creating beautifully handwritten notes that leave a
          lasting impression! --- Feel free to customize this description based
          on any specific features or aspects you want to highlight for your
          app.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          non, a id exercitationem nesciunt nostrum. Ipsum quod veniam nam
          aliquid eum earum voluptates, quo iste tenetur suscipit pariatur
          obcaecati debitis nostrum hic magnam nihil voluptas. Maxime nemo
          explicabo ullam eveniet harum animi tempore mollitia non, perspiciatis
          beatae fuga deleniti dignissimos itaque cum officia, provident autem
          nam distinctio in magni rem? Voluptates quae eum tempore voluptatum
          inventore. Porro repellat repudiandae laudantium? Debitis corrupti
          soluta distinctio alias amet obcaecati nisi. Eum excepturi dolorem
          alias sed saepe voluptatibus, iste sunt consequatur modi dolor, itaque
          aspernatur enim commodi dolorum non amet quasi ullam vel!
        </p>
        <p>
          Certainly! Here's a description for a Printed Text to Handwriting
          Generator app: --- **App Name: ScribbleCraft** **Description:**
          Experience the charm of handwritten notes in the digital age with
          ScribbleCraft, your go-to Printed Text to Handwriting Generator app!
          Transform any typed text into beautiful, personalized handwritten
          notes effortlessly. **Key Features:** 1. **Authentic Handwriting
          Styles:** Choose from a variety of carefully crafted handwriting
          styles to give your digital text a genuine, handwritten feel. From
          elegant cursive to playful print, ScribbleCraft has it all. 2.
          **Customization Options:** Personalize your handwritten notes by
          adjusting the size, slant, and spacing of the text. Experiment with
          different ink colors and pen thickness for a truly customized touch.
          3. **Quick and Easy Conversion:** Simply type or paste your text into
          the app, select your preferred handwriting style, and watch as your
          words transform into beautifully handwritten notes in an instant. 4.
          **Versatile Usage:** Use ScribbleCraft for creating unique greeting
          cards, adding a personal touch to digital invitations, or enhancing
          the aesthetics of your digital journal entries. The possibilities are
          endless! 5. **Export and Share:** Save your handwritten creations as
          image files or PDFs, ready to be shared on social media, messaging
          apps, or printed for physical use. Impress your friends and family
          with heartfelt messages. 6. **Effortless Editing:** Easily edit your
          handwritten text by making adjustments directly on the digital canvas.
          Perfect for refining details and ensuring your message looks just the
          way you want it. 7. **User-Friendly Interface:** ScribbleCraft is
          designed with simplicity in mind. The intuitive interface makes it
          easy for users of all ages to enjoy the art of handwritten
          communication in the digital realm. Bring a touch of warmth and
          personality to your digital communication with ScribbleCraft. Download
          now and start creating beautifully handwritten notes that leave a
          lasting impression! --- Feel free to customize this description based
          on any specific features or aspects you want to highlight for your
          app.
        </p>
      </div>
      {/* <div className="h-92 grid grid-cols-3 gap-6 h-full bg-red-900">
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
      </div> */}
    </div>
  );
}
