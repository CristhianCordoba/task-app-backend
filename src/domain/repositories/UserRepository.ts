import { User } from '../entities/User';

/**
 * Contrato de persistencia para la entidad User.
 * Gestiona el acceso a los datos de cuenta y autenticación.
 */
export interface UserRepository {
  /**
   * Busca un usuario registrado mediante su dirección de correo.
   * @param email Correo electrónico a consultar.
   * @returns El usuario encontrado o null si no existe.
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Crea un nuevo registro de usuario en el sistema.
   * @param user Datos del usuario a persistir.
   * @returns El usuario creado con su información completa.
   */
  create(user: User): Promise<User>;
}