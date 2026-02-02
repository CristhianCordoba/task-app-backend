import express from 'express';
import cors from 'cors';
import authRoutes from './presentation/routes/auth.routes';
import taskRoutes from './presentation/routes/task.routes';

const app = express();

const allowedOrigins = [
  'http://localhost:4200',
  'https://task-app-dnfj.onrender.com' 
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});