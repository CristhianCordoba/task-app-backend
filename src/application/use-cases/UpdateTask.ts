import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { Task } from '../../domain/entities/Task';

/**
 * Caso de uso para actualizar la información de una tarea existente.
 */
export class UpdateTask {
  constructor(private taskRepo: TaskRepository) {}

  /**
   * Procesa la actualización de los campos modificados de una tarea.
   * @param task Objeto tarea con los datos actualizados y su respectivo ID.
   */
  async execute(task: Task): Promise<Task> {
    const updatedTask = await this.taskRepo.update(task);
    return updatedTask;
  }
}