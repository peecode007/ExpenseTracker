import { ModeToggle } from '@/components/ModeToggle'
import React from 'react'
import { Link } from 'react-router-dom'

const HomeNavbar = () => {
  return (
    <nav className="bg-blue-100 h-16 flex items-center px-5 justify-between relative border-b-2 border-gray-300">
      <Link to="/">
        <div className="logo rounded-lg ">
          <img src="/logo.svg" alt="" height={175} width={175}/>
        </div>
      </Link>
      <div className="flex gap-3 items-center">
        <div>
          <ModeToggle />
        </div>

        <Link to="/dashboard" className="transition-background inline-flex h-8 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-2 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
          Dashboard
        </Link>

        <button className="inline-flex h-8 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-2 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
          Get Started
        </button>
      </div>
    </nav>
  )
}

export default HomeNavbar