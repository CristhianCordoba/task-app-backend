import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { v4 as uuid } from 'uuid';

/**
 * Caso de uso para el registro de nuevos usuarios en el sistema.
 * Genera identificadores únicos y establece la fecha de creación.
 */
export class CreateUser {
  constructor(private userRepo: UserRepository) {}

  /**
   * Crea un perfil de usuario básico.
   * @param email Correo electrónico único del usuario.
   * @returns El objeto de usuario persistido.
   */
  async execute(email: string): Promise<User> {
    const user: User = {
      id: uuid(),
      email,
      createdAt: new Date()
    };

    return this.userRepo.create(user);
  }
}