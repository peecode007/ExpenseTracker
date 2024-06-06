import express from 'express'
import { addExpenseController, addExpensesByBudget, getExpenseController, getExpensesByBudget } from '../controllers/expenseController.js';
import authenticateSession from '../middlewares/auth.js';
const router = express.Router()

router.post('/add-expense', authenticateSession ,addExpenseController)
router.get('/get-expense', authenticateSession ,getExpenseController)
router.get('/:bid', authenticateSession ,getExpensesByBudget);
router.post('/add/:bid', authenticateSession ,addExpensesByBudget);

export default router;