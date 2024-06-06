import express from 'express'
const router = express.Router()
import { addBudgetController, deleteBudgetController, getBudgetController, getBudgetsController, updateBudgetController } from '../controllers/budgetController.js';
import authenticateSession from '../middlewares/auth.js';

router.post('/add-budget', authenticateSession ,addBudgetController)
router.get('/get-budget', authenticateSession ,getBudgetsController)
router.get('/:bid', authenticateSession ,getBudgetController)
router.put('/update-budget/:bid', authenticateSession ,updateBudgetController)
router.delete('/delete-budget/:bid', authenticateSession ,deleteBudgetController)


export default router;