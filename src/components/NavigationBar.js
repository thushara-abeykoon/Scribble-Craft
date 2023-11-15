import React from 'react'
import { Link } from 'react-router-dom'

export default function NavigationBar({setIsHome}) {
    const handleIsHome = () => {
      setIsHome(false)
    }
    
  return (
    <div className='w-96 flex justify-around'>
        <Link to='converter' className='navBarItem' onClick={handleIsHome}>converter</Link>
        <Link to='mobile_app' className='navBarItem' onClick={handleIsHome}>mobile app</Link>
        <Link to='about' className='navBarItem' onClick={handleIsHome}>about</Link>
        <Link to='register' className='navBarItem' onClick={handleIsHome}>register</Link>
        <Link to='login' className='navBarItem' onClick={handleIsHome}>login</Link>
    </div>
  )
}
