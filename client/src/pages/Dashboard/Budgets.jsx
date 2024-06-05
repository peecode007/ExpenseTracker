import BudgetList from '@/components/BudgetList';
import CreateBudget from '@/components/CreateBudget';
import { ModeToggle } from '@/components/ModeToggle';
import SideNavbar from '@/layout/SideNavbar';
import React from 'react';

const Budgets = () => {
    return (
        <div className="min-h-screen flex">
            <div className="w-1/5">
                <SideNavbar />
            </div>
            <div className="w-4/5 flex flex-col">
                <nav className='h-[10vh] flex items-center justify-between p-3 bg-blue-50 dark:bg-gray-800'>
                    <h1 className='text-xl font-bold text-gray-900 dark:text-gray-100'>Budgets</h1>
                    <div>
                        <ModeToggle />
                    </div>
                </nav>
                <main className="flex-grow p-6 bg-white dark:bg-gray-900">
                    <BudgetList />
                </main>
            </div>
        </div>
    )
}

export default Budgets