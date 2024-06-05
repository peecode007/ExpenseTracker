import React, { useState, useEffect } from 'react';
import CreateBudget from './CreateBudget';
import { useTheme } from '@/components/themeProvider';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const BudgetList = () => {
    const { theme } = useTheme();
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBudgets = async () => {
        const host = 'http://localhost:7000';
        try {
            const res = await fetch(`${host}/dashboard/budgets/get-budget`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            console.log(data);
            if (data.success) {
                const budgetsWithExpenses = await Promise.all(
                    data.budgets.map(async (budget) => {
                        const expenses = await getExpensesForBudget(budget._id);
                        const used = expenses.reduce((total, expense) => total + expense.amount, 0);
                        return { ...budget, used };
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
            });
            const data = await res.json();
            console.log(data);
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

    const themeClasses = theme === 'dark' ? {
        dialogBg: 'bg-gray-800 text-white',
        border: 'border-white',
        inputBg: 'bg-gray-700 text-white',
        inputBorder: 'border-gray-600',
        buttonBg: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
        progressBg: 'bg-gray-200',
        progressUsed: 'bg-indigo-600'
    } : {
        dialogBg: 'bg-gray-100 text-black',
        border: 'border-gray-300',
        inputBg: 'bg-white text-black',
        inputBorder: 'border-gray-300',
        buttonBg: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500',
        progressBg: 'bg-gray-200',
        progressUsed: 'bg-blue-500'
    };

    if (loading) {
        return <div>Loading Budgets...</div>;
    }

    return (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={`text-center border-2 rounded-lg cursor-pointer shadow-md ${themeClasses.border} ${themeClasses.dialogBg} p-2`}>
                    <CreateBudget />
                </div>
                {budgets.length > 0 ? (
                    budgets.map((budget) => {
                        const usedPercentage = Math.min(budget.used / budget.budget * 100, 100);
                        const remaining = budget.budget - budget.used;

                        return (
                            <Link to={`/dashboard/budgets/${budget._id}`} key={budget._id}>
                                <div className={`border-2 rounded-lg shadow-md ${themeClasses.border} ${themeClasses.dialogBg} p-2`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-lg font-bold">{budget.description.toUpperCase()}</p>
                                        <h1 className="text-lg font-bold">₹{budget.budget}</h1>
                                    </div>
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="mb-2 text-sm">Category: {budget.category}</p>
                                        <p className="text-xs">{format(new Date(budget.date), 'MMMM do, yyyy')}</p>
                                    </div>
                                    <div className="relative h-3 rounded-full overflow-hidden mb-1">

                                        <div className={`absolute inset-0 ${themeClasses.progressBg}`}></div>
                                        <div
                                            className={`absolute inset-0 ${themeClasses.progressUsed}`}
                                            style={{ width: `${usedPercentage}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs ml-1">₹{budget.used} Used</span>
                                        <span className="text-xs mr-1">₹{remaining} Left</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p className="col-span-1 md:col-span-2 lg:col-span-3 text-center">No budgets available</p>
                )}
            </div>
        </div>
    );
};

export default BudgetList;
