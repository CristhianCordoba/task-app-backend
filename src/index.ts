import express from 'express';
import cors from 'cors';
import authRoutes from './presentation/routes/auth.routes';
import taskRoutes from './presentation/routes/task.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(3000, () => {
  console.log('API running on port 3000');
});
