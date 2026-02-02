import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { v4 as uuid } from 'uuid';

export class CreateUser {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string): Promise<User> {
    const user: User = {
      id: uuid(),
      email,
      createdAt: new Date()
    };

    return this.userRepo.create(user);
  }
}