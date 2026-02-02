import { Task } from '../entities/Task';

export interface TaskRepository {
  create(task: Task, userId: string): Promise<Task>;
  getAllByUser(userId: string): Promise<Task[]>;
  update(task: Task): Promise<Task>;
  delete(taskId: string): Promise<void>;
}