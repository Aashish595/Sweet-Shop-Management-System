import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import sweetsRoutes from './routes/sweets.routes.js';
import { notFound, errorHandler } from './middleware/error.middleware.js';

// Load environment variables

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: ' Sweet Shop API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
      },
      sweets: {
        getAll: 'GET /api/sweets',
        search: 'GET /api/sweets/search?name=&category=&minPrice=&maxPrice=',
        create: 'POST /api/sweets (Admin only)',
        update: 'PUT /api/sweets/:id (Admin only)',
        delete: 'DELETE /api/sweets/:id (Admin only)',
        purchase: 'POST /api/sweets/:id/purchase',
        restock: 'POST /api/sweets/:id/restock (Admin only)',
      },
    },
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});