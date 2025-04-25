import React, { useEffect, useState } from 'react';
import CreateExpense from './CreateExpense';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { useTheme } from '@/components/themeProvider';
import API_URI from '@/config';
import { useParams } from 'react-router-dom';

const ExpenseList = () => {
    const { theme } = useTheme();
    const [expenses, setExpenses] = useState([]);
    const { budgetId } = useParams(); // ✅ Destructure budgetId from URL params

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
            // console.log(data);
            if (data.success) {
                // toast.success(data.message || "Expenses retrieved successfully.");
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
        try {
            const res = await fetch(`${API_URI}/dashboard/expenses/${budgetId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await res.json();
            if (data.success) {
                setExpenses(data.expenses);
                toast.success(data.message || "Expenses retrieved successfully.");
            } else {
                toast.error(data.message || "Error fetching expenses.");
            }
        } catch (error) {
            console.error('Error getting expenses:', error);
            toast.error("Error fetching expenses.");
        }
    };

    const handleAddExpense = async (newExpense) => {
        try {
            const res = await fetch(`${API_URI}/dashboard/expenses/add-expense`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newExpense),
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message || "Expense added successfully.");
                getExpensesForBudget(budgetId); // ✅ Refetch expenses
            } else {
                toast.error(data.message || "Error adding expense.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error adding expense.");
        }
    };

    const handleDelete = async (expenseId) => {
        try {
            const response = await fetch(`${API_URI}/dashboard/expenses/delete/${expenseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();

            if (data.success) {
                setExpenses(expenses.filter((expense) => expense._id !== expenseId));
                toast.success(data.message || "Expense deleted successfully.");
            } else {
                toast.error(data.message || "Error deleting expense.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting expense.");
        }
    };

    const handleEditExpense = async (expenseId) => {
        const expenseToEdit = expenses.find((expense) => expense._id === expenseId);
        if (expenseToEdit) {
            const updatedExpense = { ...expenseToEdit, amount: expenseToEdit.amount + 100 }; // Example update
            try {
                const response = await fetch(`${API_URI}/dashboard/expenses/update/${expenseId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(updatedExpense),
                });
                const data = await response.json();

                if (data.success) {
                    setExpenses(expenses.map((expense) => (expense._id === expenseId ? updatedExpense : expense)));
                    toast.success(data.message || "Expense updated successfully.");
                } else {
                    toast.error(data.message || "Error updating expense.");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error updating expense.");
            }
        }
    }

    useEffect(() => {
        if (budgetId) {
            getExpensesForBudget(budgetId); // ✅ Run only if budgetId is available
        }
        getExpenses(); // Fetch all expenses on component mount
    }, [budgetId]);

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
                                <button onClick={() => handleEditExpense(expense._id)} className={themeClasses.actionButton}>Edit</button>
                                <button onClick={() => handleDelete(expense._id)} className={`${themeClasses.actionButton} ml-2`}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;
