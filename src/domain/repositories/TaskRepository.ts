import { Task } from '../entities/Task';

/**
 * Contrato de persistencia para la entidad Task.
 * Define las operaciones que la capa de infraestructura debe implementar
 * para gestionar las tareas en la base de datos.
 */
export interface TaskRepository {
  /**
   * Registra una nueva tarea vinculándola a un usuario específico.
   * @param task Objeto con los datos de la tarea a crear.
   * @param userId ID del propietario de la tarea.
   * @returns La tarea creada con su ID generado.
   */
  create(task: Task, userId: string): Promise<Task>;

  /**
   * Recupera todas las tareas pertenecientes a un usuario.
   * @param userId Identificador único del usuario.
   * @returns Un listado de tareas (array).
   */
  getAllByUser(userId: string): Promise<Task[]>;

  /**
   * Actualiza los datos de una tarea existente.
   * @param task Tarea con los cambios aplicados (debe incluir su ID).
   * @returns La tarea actualizada.
   */
  update(task: Task): Promise<Task>;

  /**
   * Elimina de forma permanente una tarea del sistema.
   * @param taskId ID de la tarea a remover.
   */
  delete(taskId: string): Promise<void>;
}