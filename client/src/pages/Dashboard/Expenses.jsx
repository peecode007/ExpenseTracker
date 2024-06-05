import BudgetList from '@/components/BudgetList';
import CreateBudget from '@/components/CreateBudget';
import ExpenseList from '@/components/ExpenseList';
import { ModeToggle } from '@/components/ModeToggle';
import SideNavbar from '@/layout/SideNavbar';
import React from 'react';

const Expenses = () => {
  return (
    <div className="min-h-screen flex">
            <div className="w-1/5">
                <SideNavbar />
            </div>
            <div className="w-4/5 flex flex-col">
                <nav className='h-[10vh] flex items-center justify-between p-3 bg-blue-50 dark:bg-gray-800'>
                    <h1 className='text-xl font-bold text-gray-900 dark:text-gray-100'>Expenses</h1>
                    <div>
                        <ModeToggle />
                    </div>
                </nav>
                <main className="flex-grow p-6 bg-white dark:bg-gray-900">
                    <ExpenseList/>
                </main>
            </div>
        </div>
  )
}

export default Expenses