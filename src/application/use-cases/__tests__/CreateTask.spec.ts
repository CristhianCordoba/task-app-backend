import { CreateTask } from '../CreateTask';
import { taskRepositoryMock } from './mocks/taskRepository.mock';
import { Task } from '../../../domain/entities/Task';

describe('CreateTask UseCase', () => {
    it('should create a task successfully', async () => {
        const repo = taskRepositoryMock();
        const useCase = new CreateTask(repo);

        const task: Task = {
            id: '',
            title: 'Nueva tarea',
            color: '#FF5733',
            description: 'Test',
            completed: false,
            userId: 'user-123',
            createdAt: new Date(),
        };

        repo.create.mockResolvedValue({
            ...task,
            id: 'task-id',
        });

        const result = await useCase.execute(task.userId, task.title, task.description, task.color);

        expect(repo.create).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Nueva tarea',
                description: 'Test',
                color: '#FF5733'
            }),
            'user-123'
        );
        expect(result.id).toBe('task-id');
    });
});
