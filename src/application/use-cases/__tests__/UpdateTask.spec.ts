import { UpdateTask } from '../UpdateTask';
import { taskRepositoryMock } from './mocks/taskRepository.mock';
import { Task } from '../../../domain/entities/Task';

describe('UpdateTask UseCase', () => {
  it('should update a task', async () => {
    const repo = taskRepositoryMock();
    const useCase = new UpdateTask(repo);

    const updatedTask: Task = {
      id: 'task-1',
      title: 'Actualizada',
      color: '#33FF57',
      description: 'Desc',
      completed: true,
      userId: 'user-1',
      createdAt: new Date(),
    };

    repo.update.mockResolvedValue(updatedTask);

    const result = await useCase.execute(updatedTask);

    expect(repo.update).toHaveBeenCalledWith(updatedTask);
    expect(result.completed).toBe(true);
  });
});
