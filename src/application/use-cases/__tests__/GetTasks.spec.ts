import { GetTasks } from '../GetTasks';
import { taskRepositoryMock } from './mocks/taskRepository.mock';

describe('GetTasks UseCase', () => {
  it('should return tasks for a user', async () => {
    const repo = taskRepositoryMock();
    const useCase = new GetTasks(repo);

    repo.getAllByUser.mockResolvedValue([
      {
        id: '1',
        title: 'Task 1',
        color: '#FF5733',
        description: '',
        completed: false,
        userId: 'user-1',
        createdAt: new Date(),
      },
    ]);

    const result = await useCase.execute('user-1');

    expect(repo.getAllByUser).toHaveBeenCalledWith('user-1');
    expect(result.length).toBe(1);
  });
});
