import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    budget: {
        type: Number,
        required: [true, "Please provide the budget amount."],
        min: [0, "Budget cannot be negative."]
    },
    description: {
        type: String,
        required: [true, "Please provide the description."],
        trim: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true 
    // },
    category: {
        type: mongoose.Schema.Types.String,
        ref: "BudgetCategories",
        required: true 
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }]
}, {
    timestamps: true,
    versionKey: false
});

// Ensuring the model is not re-compiled if it's already in the models collection
const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);

export default Budget;
