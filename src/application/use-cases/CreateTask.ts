import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { Task } from '../../domain/entities/Task';

export class CreateTask {
  constructor(private taskRepo: TaskRepository) {}

  async execute(userId: string, title: string, description: string, color:string): Promise<Task> {
    return this.taskRepo.create({ title, description, color } as Task, userId);
  }
}