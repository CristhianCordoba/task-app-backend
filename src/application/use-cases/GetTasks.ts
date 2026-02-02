import { TaskRepository } from '../../domain/repositories/TaskRepository';

/**
 * Caso de uso para recuperar el listado completo de tareas de un usuario específico.
 */
export class GetTasks {
  constructor(private taskRepo: TaskRepository) {}

  async execute(userId: string) {
    return this.taskRepo.getAllByUser(userId);
  }
}