import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import configureExpressSession from './middlewares/expressSession.js';
import budgetRoutes from './routes/budgetRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import categoriesRoutes from './routes/categoryRoutes.js';
import { authRouter } from './routes/authRoutes.js';

// __dirname workaround for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env or .env.production based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });
console.log(`✅ Loaded environment: ${envFile}`);

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// ✅ CORS setup
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.set('trust proxy', 1); // Trust first proxy (required by Render to detect HTTPS)


// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
configureExpressSession(app);

// Handle preflight requests
app.options('*', cors());

// ✅ API Routes
app.use('/api/auth', authRouter);
app.use('/dashboard/budgets', budgetRoutes);
app.use('/dashboard/expenses', expenseRoutes);
app.use('/dashboard/categories', categoriesRoutes);

// ✅ Health check / Root
app.get('/', (req, res) => {
  res.send('🚀 Backend is up and running!');
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message,
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
