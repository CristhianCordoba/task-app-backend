import { TaskRepository } from '../../domain/repositories/TaskRepository';

export class GetTasks {
  constructor(private taskRepo: TaskRepository) {}

  async execute(userId: string) {
    return this.taskRepo.getAllByUser(userId);
  }
}