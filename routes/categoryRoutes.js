// routes/category.js
import express from 'express';
import {
    addBudgetCategoryController,
    addExpenseCategoryController,
    getBudgetCategoryController,
    getExpenseCategoryController
} from '../controllers/categoryController.js';
import authenticateSession from '../middlewares/auth.js';

const router = express.Router();

router.post('/add-budget-categories', authenticateSession ,addBudgetCategoryController);

router.get('/budget-categories', authenticateSession ,getBudgetCategoryController);

router.post('/add-expense-categories', authenticateSession ,addExpenseCategoryController);

router.get('/expense-categories', authenticateSession ,getExpenseCategoryController);


export default router;
