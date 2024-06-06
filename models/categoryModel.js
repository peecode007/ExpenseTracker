import mongoose from "mongoose";

// Define the budget category schema
const budgetCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.String,
        ref: "User",
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define the expense category schema
const expenseCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.String,
        ref: "User",
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create models from the schemas
const BudgetCategory = mongoose.model('BudgetCategory', budgetCategorySchema);
const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);

// Export the models
export { BudgetCategory, ExpenseCategory };
