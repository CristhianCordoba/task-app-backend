import express from 'express';
import cors from 'cors';
import authRoutes from './presentation/routes/auth.routes';
import taskRoutes from './presentation/routes/task.routes';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://task-app-backend.stackblitz.io'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});