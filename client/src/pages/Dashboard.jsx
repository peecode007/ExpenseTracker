import React, { useState, useEffect } from 'react';
import { ModeToggle } from '@/components/ModeToggle';
import SideNavbar from '@/layout/SideNavbar';
import { TbPigMoney, TbReportMoney } from "react-icons/tb";
import { PiWalletBold } from "react-icons/pi";
import BudgetChart from '@/components/BudgetChart';
import { useParams } from 'react-router-dom';

const App = () => {
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const {bid} = useParams()

    const getBudgets = async () => {
        const host = 'http://localhost:7000';
        try {
            const res = await fetch(`${host}/dashboard/budgets/get-budget`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                const budgetsWithExpenses = await Promise.all(
                    data.budgets.map(async (budget) => {
                        const expenses = await getExpensesForBudget(budget._id);
                        const used = expenses.reduce((total, expense) => total + expense.amount, 0);
                        return { ...budget, used, remaining: budget.budget - used };
                    })
                );
                setBudgets(budgetsWithExpenses);
            }
        } catch (error) {
            console.error('Error getting budgets:', error);
        } finally {
            setLoading(false);
        }
    };

    const getExpensesForBudget = async (budgetId) => {
        const host = 'http://localhost:7000';
        try {
            const res = await fetch(`${host}/dashboard/expenses/${budgetId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                return data.expenses;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error getting expenses:', error);
            return [];
        }
    };

    useEffect(() => {
        getBudgets();
    }, []);

    const budgetData = budgets.map(budget => ({
        name: budget.description,
        Total: budget.budget,
        Spent: budget.used,
        Remaining: budget.budget - budget.used,
    }));

    const totalBudget = budgets.reduce((acc, budget) => acc + budget.budget, 0);
    const spentBudget = budgets.reduce((acc, budget) => acc + budget.used, 0);
    const remainingBudget = totalBudget - spentBudget;

    return (
        <div className="min-h-screen flex">
            <div className="w-1/5">
                <SideNavbar />
            </div>
            <div className="w-4/5 flex flex-col">
                <nav className='h-[10vh] flex items-center justify-between p-3 bg-blue-50 dark:bg-gray-800'>
                    <h1 className='text-xl font-bold text-gray-900 dark:text-gray-100'>Dashboard</h1>
                    <div>
                        <ModeToggle />
                    </div>
                </nav>
                <main className="flex-grow p-4 bg-white dark:bg-gray-900">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Overview</h1>
                        <div className="flex w-full">
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
                                <div className="bg-slate-100 dark:bg-gray-800 shadow-lg rounded-lg flex items-center p-4 pt-0">
                                    <TbPigMoney size={50} className="mr-4 text-gray-800 dark:text-gray-100" fill='cyan' />
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 ml-10">Total Budget</h1>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 ml-10">₹ {totalBudget}</p>
                                    </div>
                                </div>
                                <div className="bg-slate-100 dark:bg-gray-800 shadow-lg rounded-lg flex items-center p-4 pt-0">
                                    <TbReportMoney size={50} className="mr-4 text-gray-800 dark:text-gray-100" fill='cyan' />
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 ml-10">Expenses</h1>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 ml-10">₹ {spentBudget}</p>
                                    </div>
                                </div>
                                <div className="bg-slate-100 dark:bg-gray-800 shadow-lg rounded-lg flex items-center p-4 pt-0">
                                    <PiWalletBold size={50} className="mr-4 text-gray-800 dark:text-gray-100" fill='cyan' />
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 ml-10">Remaining</h1>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 ml-10">₹ {remainingBudget}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">History</h1>
                        <BudgetChart data={budgetData} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;