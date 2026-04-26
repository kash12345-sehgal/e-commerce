// eslint-disable-next-line no-unused-vars
import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-8 py-2.5 sm:px-10 sm:py-3 rounded-full '>Logout</button>
    </div>
  )
}

export default Navbar