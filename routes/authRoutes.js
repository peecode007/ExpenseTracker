import express from "express";
// import authenticateSession from "../middlwares/auth.js";
// import hashPassword from "../middlwares/bcrypt.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post('/signup', authController.createUser);
router.post('/login', authController.loginUser);
// router.post('/reset', userController.resetUser);

// router.post('/logout', authenticateSession, userController.logoutUser);
// router.post('/delete', authenticateSession, userController.deleteUser);

export { router as authRouter };