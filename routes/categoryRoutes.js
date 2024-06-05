// routes/category.js
import express from 'express';
import {
    addBudgetCategoryController,
    addExpenseCategoryController,
    getBudgetCategoryController,
    getExpenseCategoryController
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/add-budget-categories', addBudgetCategoryController);

router.get('/budget-categories', getBudgetCategoryController);

router.post('/add-expense-categories', addExpenseCategoryController);

router.get('/expense-categories', getExpenseCategoryController);


export default router;
