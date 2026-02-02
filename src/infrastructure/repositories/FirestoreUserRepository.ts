// FirestoreUserRepository.ts
import { db } from '../firestore/firebase';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';

export class FirestoreUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const snap = await db
      .collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (snap.empty) return null;

    const doc = snap.docs[0];
    return { id: doc.id, ...doc.data() } as User;
  }

  async create(user: User): Promise<User> {
    const ref = await db.collection('users').add(user);
    return { ...user, id: ref.id };
  }
}