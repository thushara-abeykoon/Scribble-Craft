import React from 'react';
import NavigationBar from './NavigationBar';

export default function Header() {
  return (
    <div className='flex justify-between px-10 pt-10 items-center w-full h-20'>
      <div className="headerDiv flex flex-col place-items-center">
        <h1 className="header">
            type 2 write
        </h1>
        <p className='text-xs'>text to handwriting converter</p>
      </div>
      <NavigationBar />
    </div>
  )
}
