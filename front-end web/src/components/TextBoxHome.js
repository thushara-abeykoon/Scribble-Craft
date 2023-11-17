import React, { useEffect } from 'react'
import Typed from 'typed.js';
export default function TextBoxHome({title,desc,fontClass}) {
    const titleElement = React.useRef(null);
    const descElement = React.useRef(null);
    useEffect(()=>{
        const titleTyped = new Typed(titleElement.current,{
            strings: [title],
            typeSpeed:100,
        });
        const descTyped = new Typed(descElement.current,{
            strings:[desc],
            typeSpeed:100
        })
        return ()=>{
            titleTyped.destroy()
            descTyped.destroy()
        };
    },[])
  return (
    <div className={`font-serif text-3xl drop-shadow-2xl w-96 h-96 backdrop-blur-sm hover:backdrop-blur-lg rounded-3xl p-10`}>
      <h3 className={`${fontClass} text-3xl font-bold inline`} ref={titleElement}></h3>
        <div className='font-serif text-sm'>
        <p className={`${fontClass} text-sm inline`} style={{fontSize:"20px"}} ref={descElement}></p>
        </div>
    </div>
  )
}
