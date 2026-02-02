import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { Task } from '../../domain/entities/Task';

export class UpdateTask {
  constructor(private taskRepo: TaskRepository) {}

  async execute(task: Task): Promise<Task> {
    const updatedTask = await this.taskRepo.update(task);
    return updatedTask;
  }
}