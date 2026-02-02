import { TaskRepository } from '../../domain/repositories/TaskRepository';

/**
 * Caso de uso para eliminar tareas existentes mediante su identificador.
 */
export class DeleteTask {
  constructor(private taskRepo: TaskRepository) {}

  async execute(taskId: string): Promise<void> {
    await this.taskRepo.delete(taskId);
  }
}