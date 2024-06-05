import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from 'react-hot-toast';
import { useTheme } from '@/components/themeProvider';
import { format } from 'date-fns';
import AddCategory from './AddCategory';

const CreateBudget = () => {
    const { theme } = useTheme();
    const [credentials, setCredentials] = useState({
        budget: '',
        description: '',
        category: '',
        date: new Date()
    });
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [budgets, setBudgets] = useState([]);


    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials({
            ...credentials,
            [id]: value
        });
    };

    const handleDateChange = (date) => {
        setCredentials({
            ...credentials,
            date: date
        });
    };

    const handleCategoryChange = (value) => {
        setCredentials({
            ...credentials,
            category: value
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
            const host = "http://localhost:7000";
            const res = await fetch(`${host}/dashboard/categories/budget-categories`, {
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

    // Define handleAddCategory function to handle adding new categories
    const handleAddCategory = async (newCategory) => {
        try {
            const host = "http://localhost:7000";
            const res = await fetch(`${host}/dashboard/categories/add-budget-categories`, {
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

    const getBudgets = async () => {
        try {
            const host = "http://localhost:7000";
            const res = await fetch(`${host}/dashboard/budgets/get-budget`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            console.log(data);
            if (data.success) {
                toast.success(data.message || "Budgets retrieved successfully.");
                setBudgets(data);
            } else {
                toast.error(data.message || "Error fetching budgets.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching budgets.");
        }
    };
    
    useEffect(() => {
        getBudgets();
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = "http://localhost:7000";
        try {
            const res = await fetch(`${host}/dashboard/budgets/add-budget`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...credentials, date: credentials.date.toISOString() }),
            });
            const data = await res.json();
            console.log(data);

            if (data.success) {
                toast.success(data.message || "Budget created successfully.");
                setCredentials({
                    budget: '',
                    description: '',
                    category: '',
                    date: new Date()
                });
            }
        } catch (error) {
            console.error('Error creating budget:', error);
            toast.error(error.message || "Error creating budget.");
        }
    };

    const { budget, description, category, date } = credentials;

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
        <div className="p-5">
            <div >
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger  onClick={handleOpenModal}>
                        <div>
                            <h1>+</h1>
                            <div>Add budget</div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className={themeClasses.dialogBg}>
                        <DialogHeader className={themeClasses.dialogBg}>
                            <DialogTitle>Create a new Budget</DialogTitle>
                            <DialogDescription>
                                <form onSubmit={handleSubmit} className={`space-y-6 max-w-lg mx-auto p-6 shadow-md rounded-lg ${themeClasses.dialogBg}`}>
                                    <div className="flex flex-col">
                                        <label htmlFor="budget" className="font-medium mb-2">Budget</label>
                                        <input
                                            type="number"
                                            id="budget"
                                            placeholder="eg. ₹5000"
                                            className={`rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${themeClasses.inputBg} ${themeClasses.inputBorder}`}
                                            value={budget}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="description" className="font-medium mb-2">Description</label>
                                        <input
                                            type="text"
                                            id="description"
                                            placeholder="eg. Grocery"
                                            className={`rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${themeClasses.inputBg} ${themeClasses.inputBorder}`}
                                            value={description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                    <label htmlFor="category" className='font-medium mb-2'>Category</label>
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
                                        />
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <button
                                                type="submit"
                                                className={`text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${themeClasses.buttonBg}`}
                                                disabled={!budget || !description || !date || !category}
                                            >
                                                Create Budget
                                            </button>
                                        </DialogClose>
                                    </DialogFooter>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default CreateBudget;
