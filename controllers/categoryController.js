import { BudgetCategory, ExpenseCategory } from "../models/categoryModel.js";

export const addBudgetCategoryController = async (req, res) => {
    try {
        const { name, color } = req.body;
        const { user } = req.session;

        // Simple validation
        if (!name || !color || !user) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const newCategory = new BudgetCategory({ name, color, user: user.email });
        await newCategory.save();
        
        res.status(201).json({
            success: true,
            message: 'Budget category created successfully',
            newCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};        

export const addExpenseCategoryController = async (req, res) => {
    try {
        const { name, color } = req.body;
        const { user } = req.session;

        // Simple validation
        if (!name || !color || !user) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const newCategory = new ExpenseCategory({ name, color, user: user.email });
        await newCategory.save();
        
        res.status(201).json({
            success: true,
            message: 'Expense category created successfully',
            newCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};     

export const getBudgetCategoryController = async (req, res) => {
    try {
        const { user } = req.session;
        const categories = await BudgetCategory.find({ user: user.email });
        
        res.status(200).json({
            success: true,
            message: 'Budget categories retrieved successfully',
            categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const getExpenseCategoryController = async (req, res) => {
    try {
        const { user } = req.session;
        const categories = await ExpenseCategory.find({ user: user.email });
        
        res.status(200).json({
            success: true,
            message: 'Expense categories retrieved successfully',
            categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
