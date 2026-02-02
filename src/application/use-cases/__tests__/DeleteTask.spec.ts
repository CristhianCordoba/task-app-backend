import { DeleteTask } from '../DeleteTask';
import { taskRepositoryMock } from './mocks/taskRepository.mock';

describe('DeleteTask UseCase', () => {
  it('should delete a task by id', async () => {
    const repo = taskRepositoryMock();
    const useCase = new DeleteTask(repo);

    repo.delete.mockResolvedValue();

    await useCase.execute('task-id');

    expect(repo.delete).toHaveBeenCalledWith('task-id');
  });
});