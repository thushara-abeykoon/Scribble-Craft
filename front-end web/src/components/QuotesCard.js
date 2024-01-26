import React, { useEffect } from "react";
import Typed from "typed.js";
export function QuotesCard({ title, desc, fontClass }) {
  const titleElement = React.useRef(null);
  const descElement = React.useRef(null);
  useEffect(() => {
    const titleTyped = new Typed(titleElement.current, {
      strings: [title],
      typeSpeed: 200,
    });
    const descTyped = new Typed(descElement.current, {
      strings: [desc],
      typeSpeed: 100,
    });
    return () => {
      titleTyped.destroy();
      descTyped.destroy();
    };
  }, []);
  return (
    <div
      className={` font-serif text-3xl text-stone-300 flex-col w-96 h-full bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-10`}
    >
      <div className="mt-5 px-1 h-64 scroll-m-12 rounded-lg text-ellipsis overflow-hidden font-serif text-md">
        <p
          className={`${fontClass} text-sm inline font-normal`}
          style={{ fontSize: "25px" }}
          ref={descElement}
        ></p>
      </div>
      <div className="flex justify-center mt-5">
        <h3
          className={`${fontClass} text-3xl font-black inline`}
          ref={titleElement}
        ></h3>
      </div>
    </div>
  );
}
