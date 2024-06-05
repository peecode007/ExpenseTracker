import Budget from '../models/budgetModel.js';

export const addBudgetController = async (req, res) => {
    try {
        const { budget, description, date, category} = req.body;

        // Simple validation
        if (!budget || !description || !date || !category ) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new budget document
        const newBudget = new Budget({
            budget,
            description,
            date,
            category,
        });

        // Save the budget to the database
        await newBudget.save();

        // Return a success response
        return res.status(201).json({
            success : true,
            message: 'Budget created successfully',
            newBudget
        });
    } catch (error) {
        console.error(error);

        // Return an error response
        res.status(500).json({
            success: false,
            message: 'Error adding budget',
            error: error.message
        });
    }
};

export const getBudgetsController = async (req, res) => {
    try {
        const budgets = await Budget.find({})
        res.status(201).json({
                success: true,
                message: 'Budget fetched successfully',
                budgets
            });
        

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error getting budgets',
            error: error.message
        });
    }
};

export const updateBudgetController = async (req, res) => {
    try {
        const { budget, description, date, category } = req.body;
        const { bid } = req.params;

        // Simple validation
        if (!bid || !budget || !description || !date || !category) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Find the budget by id and update it
        const updatedBudget = await Budget.findByIdAndUpdate(
            bid,
            { budget, description, date, category },
            { new: true, runValidators: true }
        );

        if (!updatedBudget) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        // Return a success response
        res.status(200).send({
            success: true,
            message: 'Budget updated successfully',
            updatedBudget
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error updating budget',
            error: error.message
        });
    }
};


export const deleteBudgetController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBudget = await Budget.findByIdAndDelete(id);

        if (!deletedBudget) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Budget deleted successfully',
            deletedBudget
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error deleting budget',
            error: error.message
        });
    }
};

export const getBudgetController = async (req, res) => {
    try {
        const { bid } = req.params;

        const budget = await Budget.findById(bid);

        if (!budget) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Budget fetched successfully',
            budget
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error getting budget',
            error: error.message
        });
    }
};


