import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@/components/themeProvider';
import { format } from 'date-fns';
import SideNavbar from '@/layout/SideNavbar';
import { ModeToggle } from '@/components/ModeToggle';
import toast from 'react-hot-toast';
import CreateBudgetExpense from './CreateBudgetExpense';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AddCategory from './AddCategory';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import API_URI from '@/config';

const BudgetDetail = () => {
    const { theme } = useTheme();
    const { bid } = useParams();
    const navigate = useNavigate();
    const [budget, setBudget] = useState({});
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newBudget, setNewBudget] = useState({
        description: '',
        amount: '',
        category: '',
    });

    // Fetching budget details
    const getBudgetDetails = async () => {
        const host = API_URI;
        try {
            const res = await fetch(`${host}/dashboard/budgets/${bid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success) {
                setBudget(data.budget);
            } else {
                setError(data.message || 'Failed to fetch budget details');
            }
        } catch (error) {
            console.error('Error getting budget details:', error);
            setError('Failed to fetch budget details');
        }
    };

    // Fetching expenses
    const getExpenses = async () => {
        const host = API_URI;
        try {
            const res = await fetch(`${host}/dashboard/expenses/${bid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success) {
                setExpenses(data.expenses);
                setLoading(false);
            } else {
                setError(data.message || 'Failed to fetch expenses');
            }
        } catch (error) {
            console.error('Error getting expenses:', error);
            setError('Failed to fetch expenses');
        }
    };

    // useEffect to fetch budget details and expenses on component mount
    useEffect(() => {
        getBudgetDetails();
        getExpenses();
    }, [bid]);

    // Fetching categories
    const getCategories = async () => {
        try {
            const host = API_URI;
            const res = await fetch(`${host}/dashboard/categories/budget-categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success) {
                setCategories(data.categories);
            } else {
                toast.error(data.message || "Error fetching category.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching category.");
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    // Function to handle category change
    const handleCategoryChange = (value) => {
        setBudget({
            ...budget,
            category: value
        });
    };

    // Function to handle adding new categories
    const handleAddCategory = async (newCategory) => {
        try {
            const host = API_URI;
            const res = await fetch(`${host}/dashboard/categories/add-budget-categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newCategory),
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message || "Category added successfully.");
                setCategories(data.categories);
            } else {
                toast.error(data.message || "Error adding category.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error adding category.");
        }
    };

    // Function to handle budget update
    const handleBudgetUpdate = async (e) => {
        e.preventDefault();
        const host = API_URI;
        try {
            const res = await fetch(`${host}/dashboard/budgets/update-budget/${bid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(budget)
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message || 'Budget updated successfully');
                setNewBudget(data.budget);
                navigate('/dashboard/budgets');
            } else {
                toast.error(data.message || 'Failed to update budget');
            }
        } catch (error) {
            console.error('Error updating budget:', error);
            toast.error('Failed to update budget');
        }
    };

    // Function to handle budget delete
    const handleDelete = async () => {
        const host = API_URI;
        try {
            const res = await fetch(`${host}/dashboard/budgets/delete-budget/${bid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message || 'Budget deleted successfully');
                navigate('/dashboard/budgets');
            } else {
                toast.error(data.message || 'Failed to delete budget');
            }
        } catch (error) {
            console.error('Error deleting budget:', error);
            toast.error('Failed to delete budget');
        }
    };

    // Show confirmation dialog before deleting
    const confirmDelete = () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this budget?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete()
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ],
        });
    };

    // Define theme classes
    const themeClasses = theme === 'dark' ? {
        dialogBg: 'bg-gray-800 text-white',
        border: 'border-white',
        inputBg: 'bg-gray-700 text-white',
        inputBorder: 'border-gray-600',
        buttonBg: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
        progressBg: 'bg-gray-800',
        progressUsed: 'bg-indigo-600'
    } : {
        dialogBg: 'bg-slate-200 text-black',
        border: 'border-gray-300',
        inputBg: 'bg-white text-black',
        inputBorder: 'border-gray-300',
        buttonBg: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500',
        progressBg: 'bg-gray-200',
        progressUsed: 'bg-blue-500'
    };

    // Render loading or error message
    if (loading) {
        return <div>Loading Budget...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen flex">
            <div className="w-1/5">
                <SideNavbar />
            </div>
            <div className="w-4/5 flex flex-col">
                <nav className='h-[10vh] flex items-center justify-between p-3 bg-blue-50 dark:bg-gray-800'>
                    <h1 className='text-xl font-bold text-gray-900 dark:text-gray-100'>Budget Details</h1>
                    <div>
                        <ModeToggle />
                    </div>
                </nav>
                <main className="flex-grow bg-white dark:bg-gray-900">
                    <div className="p-4 flex w-full gap-3">
                        {/* Update budget form */}
                        <div className={`border rounded-md p-4 bg-gray-100 dark:bg-gray-800 ${themeClasses.dialogBg}`} >
                            <h2 className="text-lg font-bold mb-2">Update Budget</h2>
                            <form onSubmit={handleBudgetUpdate}>
                                <label className="mb-2">Description:</label>
                                <input type="text" name="description" value={budget.description} onChange={(e) => setBudget({ ...budget, description: e.target.value })} className={`form-input mt-2 rounded-lg w-full p-3 ${themeClasses.inputBg} ${themeClasses.inputBorder}`} />

                                <label className="mt-5">Amount:</label>
                                <input type="number" name="budget" value={budget.budget} onChange={(e) => setBudget({ ...budget, budget: e.target.value })} className={`form-input mt-1 rounded-lg w-full p-3 ${themeClasses.inputBg} ${themeClasses.inputBorder}`} />

                                <label className="mb-2 mt-5">Category:</label>
                                <Select onValueChange={handleCategoryChange} value={budget.category} required>
                                    <SelectTrigger id="category" className={themeClasses.inputBg}>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <AddCategory onAddCategory={(newCategory) => handleAddCategory(newCategory)} />
                                        {categories && Array.isArray(categories) && categories.map((cat) => (
                                            <SelectItem key={cat._id} value={cat.name}>
                                                <div className="flex items-center">
                                                    <div className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: cat.color }}></div>
                                                    {cat.name}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <div className="flex space-x-4 mt-8">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update Budget</button>
                                    <button type="button" onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete Budget</button>
                                </div>
                            </form>

                        </div>
                        {/* Add new expense form */}
                        <CreateBudgetExpense />
                    </div>
                    <div className="p-4 mt-4">
                        <h2 className="text-lg font-bold mb-2">Expenses</h2>
                        <div className={`border rounded-md p-4 bg-gray-100 dark:bg-gray-800 ${themeClasses.dialogBg}`}>
                            {expenses.length > 0 ? (
                                <ul>
                                    {expenses.map((expense) => (
                                        <li key={expense._id} className="mb-2">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-md font-semibold">{expense.description}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">{format(new Date(expense.date), 'MMMM d, yyyy')}</p>
                                                </div>
                                                <div className="text-md font-semibold text-red-500">
                                                    ₹{expense.amount.toFixed(2)}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No expenses recorded for this budget.</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BudgetDetail;
