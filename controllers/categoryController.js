import { BudgetCategory, ExpenseCategory } from "../models/categoryModel.js";

export const addBudgetCategoryController = async (req, res) => {
    try {
        const { name, color } = req.body;
        // Simple validation
        if (!name || !color ) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newCategory = new BudgetCategory({ name, color });
        await newCategory.save();
        res.status(201).send({
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
        // Simple validation
        if (!name || !color ) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newCategory = new ExpenseCategory({ name, color });
        await newCategory.save();
        res.status(201).send({
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
        const categories = await BudgetCategory.find({});
        res.status(200).send({
            success: true,
            message: 'Budget categories retrieved successfully',
            categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
};

export const getExpenseCategoryController = async (req, res) => {
    try {
        const categories = await ExpenseCategory.find({});
        res.status(201).send({
            success: true,
            message: 'Expense categories retrieved successfully',
            categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
};
