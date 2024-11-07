import express, { json } from 'express';
import { config } from 'dotenv';
import connectDB from './config/db';

config();
connectDB();

import userRoutes from './routes/userRoutes';
import lessonRoutes from './routes/lessonRoutes';

const app = express();
app.use(json());

app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
