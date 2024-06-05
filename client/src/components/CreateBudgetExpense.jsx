import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import AddCategory from './AddCategory';
import { useTheme } from './themeProvider';
import { useParams } from 'react-router-dom';

const CreateBudgetExpense = () => {
    const { theme } = useTheme();
    const [newExpense, setNewExpense] = useState({
        amount: '',
        description: '',
        category: '',
        date: new Date()
    })
    const [categories, setCategories] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewExpense({
            ...newExpense,
            [name]: value
        });
    };
    const { bid } = useParams()

    const handleCategoryChange = (value) => {
        setNewExpense({
            ...newExpense,
            category: value
        });
    };

    const handleDateChange = (date) => {
        setNewExpense({
            ...newExpense,
            date: date
        });
    };

    const getCategories = async () => {
        try {
            const host = "http://localhost:7000";
            const res = await fetch(`${host}/dashboard/categories/expense-categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            console.log(data);
            if (data.success) {
                toast.success(data.message || "Category retrieved successfully.");
                setCategories(data.categories)
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

    }, [])

    const handleAddExpense = async (e) => {
        e.preventDefault();
        const host = 'http://localhost:7000';
        try {
            const res = await fetch(`${host}/dashboard/expenses/add/${bid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newExpense)
            });
            const data = await res.json();
            console.log('Add Expense Response:', data);
            if (data.success) {
                // setExpenses([...expenses, data.expense]);
                setNewExpense({
                    amount: '',
                    description: '',
                    category: '',
                    // date: new Date()
                    date: new Date().toISOString().substring(0, 10)
                });
            } else {
                setError(data.message || 'Failed to add expense');
            }
        } catch (error) {
            console.error('Error adding expense:', error);
            setError('Failed to add expense');
        }
    };

    const handleAddCategory = async (newCategory) => {
        try {
            const host = "http://localhost:7000";
            const res = await fetch(`${host}/dashboard/categories/add-expense-categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });
            const data = await res.json();
            console.log(data);
            if (data.success) {
                toast.success(data.message || "Category added successfully.");
                setCategories(data.categories)
                getCategories()

            } else {
                toast.error(data.message || "Error adding category.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error adding category.");
        }
    };

    const { amount, description, category, date } = newExpense;

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
    return (
        <div className="border rounded-md p-4 bg-slate-200 dark:bg-gray-800">
            <h2 className="text-lg font-bold mb-2">Add New Expense</h2>
            <form onSubmit={handleAddExpense}>
                <label className=" mb-2">
                    Description:
                    <input type="text" name="description" value={newExpense.description} onChange={handleChange} className={`form-input mt-1 rounded-lg w-full p-2 ${themeClasses.inputBg} ${themeClasses.inputBorder}`} />
                </label>
                <label className=" mb-2">
                    Amount:
                    <input type="number" name="amount" value={newExpense.amount} onChange={handleChange} className={`form-input mt-1 rounded-lg w-full p-2 ${themeClasses.inputBg} ${themeClasses.inputBorder}`} />
                </label>

                <div className="flex flex-col">
                    <label htmlFor="date" className="mb-1 mt-1">Date</label>
                    <DatePicker
                        id="date"
                        selected={date}
                        onChange={handleDateChange}
                        className={`rounded-lg px-2 py-2 focus:outline-none focus:ring-2 ${themeClasses.inputBg} ${themeClasses.inputBorder}`}
                        dateFormat="MMMM d, yyyy"
                        required
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <label htmlFor="category">Category</label>
                    <Select onValueChange={handleCategoryChange} value={newExpense.category} required>
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
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-3">Add Expense</button>
            </form>
        </div>
    )
}

export default CreateBudgetExpense