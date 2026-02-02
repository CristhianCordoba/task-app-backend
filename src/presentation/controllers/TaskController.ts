import { Response } from 'express';
import { AuthRequest } from '../../types/AuthRequest';
import { CreateTask } from '../../application/use-cases/CreateTask';
import { GetTasks } from '../../application/use-cases/GetTasks';
import { UpdateTask } from '../../application/use-cases/UpdateTask';
import { DeleteTask } from '../../application/use-cases/DeleteTask';

/**
 * Controlador de Tareas.
 * Actúa como mediador entre las peticiones HTTP y la lógica de negocio (Casos de Uso).
 */
export class TaskController {
    /**
     * Se inyectan los casos de uso por constructor para facilitar las pruebas unitarias.
     */
    constructor(
        private createTaskUsecase: CreateTask,
        private getTasksUsecase: GetTasks,
        private updateTaskUsecase: UpdateTask,
        private deleteTaskUsecase: DeleteTask
    ) { }

    /**
     * Obtiene todas las tareas vinculadas al usuario autenticado.
     * El ID del usuario se recupera del middleware de autenticación (req.user).
     */
    getTasks = async (req: AuthRequest, res: Response) => {
        try {
            // Se asume que req.user existe gracias al middleware de seguridad
            const tasks = await this.getTasksUsecase.execute(req.user!.userId);
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ message: 'Ocurrió un error al obtener las tareas', error: err });
        }
    };

    /**
     * Crea una nueva tarea para el usuario actual.
     * Recibe el cuerpo de la petición (JSON) y lo mapea al caso de uso.
     */
    createTask = async (req: AuthRequest, res: Response) => {
        try {
            const { title, description, color } = req.body;
            const task = await this.createTaskUsecase.execute(req.user!.userId, title, description, color);
            // 201 Created: Indica que el recurso se creó con éxito
            res.status(201).json(task);
        } catch (err) {
            res.status(500).json({ message: 'Ocurrió un error al crear la tarea', error: err });
        }
    };

    /**
     * Actualiza una tarea existente.
     * Combina el ID proveniente de la URL (:id) con los datos del cuerpo de la petición.
     */
    updateTask = async (req: AuthRequest, res: Response) => {
        try {
            const task = await this.updateTaskUsecase.execute({
                id: req.params.id,
                ...req.body,
            });
            res.json(task);
        } catch (err) {
            res.status(500).json({ message: 'Ocurrió un error al actualizar la tarea', error: err });
        }
    };

    /**
     * Elimina una tarea por su ID.
     * Responde con un estado 204 (No Content) si la operación fue exitosa.
     */
    deleteTask = async (req: AuthRequest, res: Response) => {
        try {
            // Maneja el ID asegurándose de que sea un string único
            await this.deleteTaskUsecase.execute(
                Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
            );
            // 204 No Content: Éxito, pero no hay nada que devolver en el cuerpo
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ message: 'Ocurrió un error al eliminar la tarea', error: err });
        }
    };
}