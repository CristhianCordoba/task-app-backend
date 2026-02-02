import { db } from '../firestore/firebase';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';

/**
 * Implementación de UserRepository para Firestore.
 * Se encarga de la persistencia y búsqueda de perfiles de usuario.
 */
export class FirestoreUserRepository implements UserRepository {
  
  /**
   * Busca un usuario por su correo electrónico.
   * Utiliza una consulta filtrada con límite para optimizar el rendimiento.
   * @param email Correo a buscar.
   * @returns El usuario mapeado o null si la colección está vacía para ese criterio.
   */
  async findByEmail(email: string): Promise<User | null> {
    const snap = await db
      .collection('users')
      .where('email', '==', email)
      .limit(1) // Optimización: se detiene al encontrar la primera coincidencia
      .get();

    if (snap.empty) return null;

    const doc = snap.docs[0];
    // Retorna los datos del documento inyectando el ID generado por Firestore
    return { id: doc.id, ...doc.data() } as User;
  }

  /**
   * Persiste un nuevo usuario en la colección 'users'.
   * @param user Objeto con los datos del usuario (el ID puede venir pre-generado o no).
   * @returns El usuario con el ID confirmado por la base de datos.
   */
  async create(user: User): Promise<User> {
    // .add() crea un nuevo documento con un ID automático si no se especifica uno
    const ref = await db.collection('users').add(user);
    return { ...user, id: ref.id };
  }
}