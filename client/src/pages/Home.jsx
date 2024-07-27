import React from 'react'
import HomeNavbar from '../layout/HomeNavbar'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <HomeNavbar />
      <main className='h-full'>
        <div className="flex flex-col h-[100vh] items-center justify-center space-y-4 px-4 md:px-0">
          <span className="font-extrabold text-3xl md:text-5xl text-blue-950 text-center">Manage Your Expenses</span>
          <span className="font-extrabold text-4xl md:text-6xl text-indigo-700 text-center">Control Your Money</span>
          <p className="pt-5 text-lg md:text-xl text-center">
            Take control of your finances with ExpenseTracker, the ultimate expenditure tracking app. <br />
            Easily monitor your spending, set budgets, and achieve your financial goals effortlessly.
          </p>

          <div className="py-5">
            <button className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'>
              <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
              <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm md:text-base font-medium text-gray-50 backdrop-blur-3xl'><Link to="/api/auth/signup">
                Get Started</Link>
              </span>
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home