import React from 'react'
import { Link } from 'react-router-dom'

export default function NavigationBar() {
  return (
    <div className='w-96 flex justify-around'>
        <Link to='converter' className='navBarItem'>converter</Link>
        <Link to='mobile_app' className='navBarItem'>mobile app</Link>
        <Link to='about' className='navBarItem'>about</Link>
        <Link to='register' className='navBarItem'>register</Link>
        <Link to='login' className='navBarItem'>login</Link>
    </div>
  )
}
