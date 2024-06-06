import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    amount : {
        type : Number,
        required : [true, "Please provide the expense amount."],
        min : [0, "Expense amount must be greater than or equal to zero."],
    },
    description : {
        type : String,
        required : [true, "Please give the description."],
        trim : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    budget: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Budget', // This refers to the name of the Budget model
    },
    user: {
        type: mongoose.Schema.Types.String,
        ref: "User",
        required: true 
    },
    category: {
        type: mongoose.Schema.Types.String,
        ref: "ExpenseCategories",
        required: true 
    }
}, {timestamps : true, versionKey : false})

const Expense = mongoose.model.expenses || mongoose.model("Expense", expenseSchema)
export default Expense;