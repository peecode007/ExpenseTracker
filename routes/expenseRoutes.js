import express from 'express'
import { addExpenseController, addExpensesByBudget, deleteExpenseController, getExpenseController, getExpensesByBudget, updateExpenseController } from '../controllers/expenseController.js';
import authenticateSession from '../middlewares/auth.js';
const router = express.Router()

router.post('/add-expense', authenticateSession ,addExpenseController)
router.get('/get-expense', authenticateSession ,getExpenseController)
router.get('/:bid', authenticateSession ,getExpensesByBudget);
router.post('/add/:bid', authenticateSession ,addExpensesByBudget);
router.delete('/delete/:id', authenticateSession , deleteExpenseController);
router.put('/update/:id', authenticateSession , updateExpenseController)

export default router;