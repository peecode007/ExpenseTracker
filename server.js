import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import budgetRoutes from './routes/budgetRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js'
import categoriesRoutes from './routes/categoryRoutes.js'
import { authRouter } from './routes/authRoutes.js';
import configureExpressSession from "./middlewares/expressSession.js";

// Make express app
const app = express();

// Config dotenv
dotenv.config();

// Database 
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

configureExpressSession(app);

// Handle OPTIONS requests
app.options('*', cors());

// Test Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Routes
app.use('/api/auth', authRouter);
app.use('/dashboard/budgets', budgetRoutes);
app.use('/dashboard/expenses', expenseRoutes);
app.use('/dashboard/categories', categoriesRoutes);
// app.use('/api/v1/auth', authRoutes); // Uncomment when authRoutes is available
// app.use('/api/v1/products', productRoutes); // Uncomment when productRoutes is available

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

// Port
const PORT = process.env.PORT || 7000;

// Listen to the server
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
