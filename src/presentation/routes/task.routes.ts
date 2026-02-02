import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { CreateTask } from '../../application/use-cases/CreateTask';
import { GetTasks } from '../../application/use-cases/GetTasks';
import { UpdateTask } from '../../application/use-cases/UpdateTask';
import { DeleteTask } from '../../application/use-cases/DeleteTask';
import { FirestoreTaskRepository } from '../../infrastructure/repositories/FirestoreTaskRepository';

const router = Router();

const repo = new FirestoreTaskRepository();
const controller = new TaskController(
  new CreateTask(repo),
  new GetTasks(repo),
  new UpdateTask(repo),
  new DeleteTask(repo)
);

router.use(authMiddleware);

router.get('/', controller.getTasks);
router.post('/', controller.createTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

export default router;
