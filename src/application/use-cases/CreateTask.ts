import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { Task } from '../../domain/entities/Task';

/**
 * Caso de uso para la creación de nuevas tareas.
 * Se encarga de orquestar la lógica necesaria para persistir una tarea asociada a un usuario.
 */
export class CreateTask {
  constructor(private taskRepo: TaskRepository) {}

  /**
   * Ejecuta la lógica de creación.
   * @param userId ID del usuario que crea la tarea.
   * @param title Título descriptivo.
   * @param description Contenido detallado.
   * @param color Etiqueta visual para la interfaz.
   * @returns La tarea recién creada.
   */
  async execute(userId: string, title: string, description: string, color: string): Promise<Task> {
    return this.taskRepo.create({ title, description, color } as Task, userId);
  }
}