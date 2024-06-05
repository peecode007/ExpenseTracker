import Expense from "../models/expenseModel.js";

export const addExpenseController = async (req, res) => {
    try {
        const { amount, description, date, category} = req.body;

        // Simple validation
        if (!amount || !description || !date || !category ) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new budget document
        const newExpense = new Expense({
            amount,
            description,
            date,
            category,
        });

        // Save the budget to the database
        await newExpense.save();

        // Return a success response
        return res.status(201).json({
            success : true,
            message: 'Expense created successfully',
            newExpense
        });
    } catch (error) {
        console.error(error);

        // Return an error response
        res.status(500).json({
            success: false,
            message: 'Error adding Expense',
            error: error.message
        });
    }
};

export const getExpenseController = async (req, res) => {
    try {
        // Get all the expenses from the database
        const expenses = await Expense.find({});
        res.status(201).json({
            success: true,
            message: 'Expenses retrieved successfully',
            expenses
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error getting budget',
            error: error.message
        });
    }

}

export const getExpensesByBudget = async (req, res) => {
    try {
        const { bid } = req.params;
        const expenses = await Expense.find({ budget: bid }).populate('budget');
        res.status(200).send({
            success: true,
            message: 'Expenses fetched successfully.',
            expenses
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "An error occurred while getting the expenses. Try again later!",
            error
        });
    }
};

export const addExpensesByBudget = async (req, res) => {
    try {
        const { bid } = req.params;
        const { amount, description, date, category } = req.body;

        // Simple validation
        if (!amount || !description || !date || !category) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newExpense = new Expense({
            amount,
            description,
            date,
            category,
            budget: bid
        });

        await newExpense.save();

        return res.status(201).send({
            success: true,
            message: 'Expense added successfully',
            newExpense
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error adding expense',
            error: error.message
        });
    }
};