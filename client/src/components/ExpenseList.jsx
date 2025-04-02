import React, { useEffect, useState } from 'react';
import CreateExpense from './CreateExpense';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { useTheme } from '@/components/themeProvider'; // Import useTheme hook from your theme provider
import API_URI from '@/config';

const ExpenseList = () => {
    const { theme } = useTheme(); // Get the current theme
    const [expenses, setExpenses] = useState([]);

    const getExpenses = async () => {
        try {
            const host = API_URI;
            const res = await fetch(`${host}/dashboard/expenses/get-expense`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await res.json();
            console.log(data);
            if (data.success) {
                toast.success(data.message || "Expenses retrieved successfully.");
                setExpenses(data.expenses);
            } else {
                toast.error(data.message || "Error fetching expenses.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error fetching expenses.");
        }
    };

    const getExpensesForBudget = async (budgetId) => {
        const host = API_URI;
        try {
            const res = await fetch(`${host}/dashboard/expenses/${budgetId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:'include',
            });
            const data = await res.json();
            // console.log(data);
            if (data.success) {
                toast.success("Expense added successfully.")
                return data.expenses;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error getting expenses:', error);
            return [];
        }
    };

    const handleAddExpense = async (newExpense) => {
        try {
            const host = API_URI;
            const res = await fetch(`${host}/dashboard/expenses/add-expense`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newExpense),
            });
            const data = await res.json();
            // console.log(data);
            if (data.success) {
                toast.success(data.message || "Expense added successfully.");
                // Trigger fetching expenses again after adding a new expense
                getExpensesForBudget();
            } else {
                toast.error(data.message || "Error adding expense.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error adding expense.");
        }
    };

    useEffect(() => {
        getExpensesForBudget();
    }, []);

    // Define theme classes based on the current theme
    const themeClasses = theme === 'dark' ? {
        tableBg: 'bg-gray-800 text-white',
        headerBg: 'bg-gray-700',
        rowHoverBg: 'hover:bg-gray-600',
        actionButton: 'text-indigo-400 hover:text-indigo-200',
    } : {
        tableBg: 'bg-white text-gray-900',
        headerBg: 'bg-gray-200',
        rowHoverBg: 'hover:bg-gray-100',
        actionButton: 'text-indigo-600 hover:text-indigo-900',
    };

    return (
        <div>
            <CreateExpense onAddExpense={handleAddExpense} />
            <table className={`min-w-full divide-y divide-gray-200 ${themeClasses.tableBg}`}>
                <thead className={themeClasses.headerBg}>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className={themeClasses.tableBg}>
                    {expenses.map((expense) => (
                        <tr key={expense._id} className={themeClasses.rowHoverBg}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">₹{expense.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{expense.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{expense.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{format(new Date(expense.date), 'MMMM d, yyyy')}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button className={themeClasses.actionButton}>Edit</button>
                                <button className={`${themeClasses.actionButton} ml-2`}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;
