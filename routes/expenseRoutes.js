import express from 'express'
import { addExpenseController, addExpensesByBudget, getExpenseController, getExpensesByBudget } from '../controllers/expenseController.js';
const router = express.Router()

router.post('/add-expense', addExpenseController)
router.get('/get-expense', getExpenseController)
router.get('/:bid', getExpensesByBudget);
router.post('/add/:bid', addExpensesByBudget);

export default router;