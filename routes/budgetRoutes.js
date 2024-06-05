import express from 'express'
const router = express.Router()
import { addBudgetController, deleteBudgetController, getBudgetController, getBudgetsController, updateBudgetController } from '../controllers/budgetController.js';

router.post('/add-budget', addBudgetController)
router.get('/get-budget', getBudgetsController)
// router.get('/:bid/:eid', getBudgetExpenseController)
router.get('/:bid', getBudgetController)
router.put('/update-budget/:bid', updateBudgetController)
router.delete('/delete-budget/:bid', deleteBudgetController)


export default router;