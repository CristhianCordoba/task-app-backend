import { Response } from 'express';
import { AuthRequest } from '../../types/AuthRequest';
import { CreateTask } from '../../application/use-cases/CreateTask';
import { GetTasks } from '../../application/use-cases/GetTasks';
import { UpdateTask } from '../../application/use-cases/UpdateTask';
import { DeleteTask } from '../../application/use-cases/DeleteTask';

export class TaskController {
    constructor(
        private createTaskUsecase: CreateTask,
        private getTasksUsecase: GetTasks,
        private updateTaskUsecase: UpdateTask,
        private deleteTaskUsecase: DeleteTask
    ) { }

    getTasks = async (req: AuthRequest, res: Response) => {
        try {
            const tasks = await this.getTasksUsecase.execute(req.user!.userId);
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ message: 'Ocurrió un error al obtener las tareas', error: err });
        }
    };

    createTask = async (req: AuthRequest, res: Response) => {
        try {
            const { title, description, color } = req.body;
            const task = await this.createTaskUsecase.execute(req.user!.userId, title, description, color);
            res.status(201).json(task);
        } catch (err) {
            res.status(500).json({ message: 'Ocurrió un error al crear la tarea', error: err });
        }
    };


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

    deleteTask = async (req: AuthRequest, res: Response) => {
        try {
            await this.deleteTaskUsecase.execute(
                Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
            );
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ message: 'Ocurrió un error al eliminar la tarea', error: err });
        }
    };
}
