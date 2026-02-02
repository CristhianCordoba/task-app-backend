import { TaskRepository } from '../../../../domain/repositories/TaskRepository';
import { Task } from '../../../../domain/entities/Task';

export const taskRepositoryMock = (): jest.Mocked<TaskRepository> => ({
  create: jest.fn(),
  getAllByUser: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});