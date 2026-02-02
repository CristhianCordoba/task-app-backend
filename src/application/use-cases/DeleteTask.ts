import { TaskRepository } from '../../domain/repositories/TaskRepository';

export class DeleteTask {
  constructor(private taskRepo: TaskRepository) {}

  async execute(taskId: string): Promise<void> {
    await this.taskRepo.delete(taskId);
  }
}