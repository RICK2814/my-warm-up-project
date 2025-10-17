import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import companyRoutes from './routes/companyRoutes';
import { initializeDatabase } from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database
initializeDatabase().catch(console.error);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/companies', companyRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Company Registration & Verification API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});