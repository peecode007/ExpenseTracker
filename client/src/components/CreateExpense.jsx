import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from '@/components/themeProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import AddCategory from './AddCategory'; // Import AddCategory component
import API_URI from '@/config';

const CreateExpense = () => {
    const { theme } = useTheme();
    const [credentials, setCredentials] = useState({
        amount: '',
        description: '',
        category: '',
        date: new Date()
    });
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expenses, setExpenses] = useState([]);


    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials({
            ...credentials,
            [id]: value
        });
    };

    const handleCategoryChange = (value) => {
        setCredentials({
            ...credentials,
            category: value
        });
    };

    const handleDateChange = (date) => {
        setCredentials({
            ...credentials,
            date: date
        });
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const getCategories = async () => {
        try {
            const host = API_URI;
            const res = await fetch(`${host}/dashboard/categories/expense-categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            // console.log(data);
            if (data.success) {
                // toast.success(data.message || "Category retrieved successfully.");
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

    // Define handleAddCategory function to handle adding new categories
    const handleAddCategory = async (newCategory) => {
        try {
            const host = API_URI;
            const res = await fetch(`${host}/dashboard/categories/add-expense-categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newCategory),
            });
            const data = await res.json();
            // console.log(data);
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
                // toast.success(data.message || "Expenses retrieved successfully.");
                setExpenses(data.expenses);
            } else {
                toast.error(data.message || "Error fetching expenses.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching expenses.");
        }
    };
    
    useEffect(() => {
        getExpenses();
    }, []);
    


    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            const host = API_URI;
            const res = await fetch(`${host}/dashboard/expenses/add-expense`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ ...credentials, date: credentials.date.toISOString() }),
            });
            const data = await res.json();
            // console.log(data)
            if (data.success) {
                toast.success(data.message || "Expense created successfully.");
                setCredentials({
                    amount: '',
                    description: '',
                    category: '',
                    date: new Date()
                });
                handleCloseModal();
                getExpenses();
            } else {
                toast.error(data.message || "Error creating expense.");
            }
        } catch (error) {
            toast.error(error.message || "Error creating expense.");
        }
    };

    const { amount, description, category, date } = credentials;

    const themeClasses = theme === 'dark' ? {
        dialogBg: 'bg-black text-white',
        border: 'border-white',
        inputBg: 'bg-gray-700 text-white',
        inputBorder: 'border-gray-600',
        buttonBg: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
    } : {
        dialogBg: 'bg-white text-black',
        border: 'border-gray-300',
        inputBg: 'bg-white text-black',
        inputBorder: 'border-gray-300',
        buttonBg: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
    };

    return (
        <div>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='font-bold text-xl'>My Expenses</h2>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <button
                            onClick={handleOpenModal}
                            className={`py-2 px-4 rounded ${themeClasses.buttonBg} text-white font-bold`}
                        >
                            Add Expense
                        </button>
                    </DialogTrigger>
                    <DialogContent className={`${themeClasses.dialogBg} rounded-lg p-6`}>
                        <DialogHeader>
                            <DialogTitle>Create Expense</DialogTitle>
                            <DialogDescription>Add a new expense to your list.</DialogDescription>
                        </DialogHeader>
                        <CardContent className={themeClasses.dialogBg}>
                            <form onSubmit={handleSubmit}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <label htmlFor="amount">Amount</label>
                                        <input
                                            type="number"
                                            id="amount"
                                            placeholder="eg. 1000"
                                            className={`rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${themeClasses.inputBg} ${themeClasses.inputBorder}`}
                                            value={amount}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <label htmlFor="description">Description</label>
                                        <input
                                            id="description"
                                            placeholder="eg. Bill"
                                            className={`rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${themeClasses.inputBg} ${themeClasses.inputBorder}`}
                                            value={description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <label htmlFor="category">Category</label>
                                        <Select onValueChange={handleCategoryChange} value={category} required>
                                            <SelectTrigger id="category" className={themeClasses.inputBg}>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                {/* Render AddCategory component outside of SelectItem */}
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

                                    <div className="flex flex-col">
                                        <label htmlFor="date" className="font-medium mb-2">Date</label>
                                        <DatePicker
                                            id="date"
                                            selected={date}
                                            onChange={handleDateChange}
                                            className={`rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${themeClasses.inputBg} ${themeClasses.inputBorder}`}
                                            dateFormat="MMMM d, yyyy"
                                            required
                                        />
                                    </div>
                                </div>
                                <DialogFooter className="flex justify-between mt-4">
                                    <Button type="button" variant="outline" onClick={handleCloseModal}>Cancel</Button>
                                    <Button type="submit" className={themeClasses.buttonBg}>Add Expense</Button>
                                </DialogFooter>
                            </form>
                        </CardContent>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default CreateExpense;

