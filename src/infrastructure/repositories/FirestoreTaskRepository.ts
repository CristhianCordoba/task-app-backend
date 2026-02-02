import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { Task } from '../../domain/entities/Task';
import { db } from '../firestore/firebase';
import admin from 'firebase-admin';

/**
 * Implementación de TaskRepository específica para Google Cloud Firestore.
 * Contiene toda la lógica de acceso a datos y mapeo entre Firestore y el Dominio.
 */
export class FirestoreTaskRepository implements TaskRepository {
  /** Referencia a la colección 'tasks' en Firestore */
  private collection = db.collection('tasks');

  /**
   * Crea un documento en Firestore.
   * Valida la presencia de campos obligatorios antes de realizar la escritura.
   */
  async create(task: Task, userId: string): Promise<Task> {
    if (!task.title || !task.description || !task.color) {
      throw new Error('Faltan campos requeridos: title, description y color son obligatorios.');
    }
    try {
      const docData = {
        title: task.title.trim(),
        description: task.description,
        color: task.color,
        userId: userId,
        completed: false,
        createdAt: new Date()
      };
      
      // .add() genera automáticamente un ID aleatorio en Firestore
      const ref = await this.collection.add(docData);
      
      return { ...docData, id: ref.id } as Task;
    } catch (error) {
      console.error('Error al insertar en Firestore:', error);
      throw error;
    }
  }

  /**
   * Obtiene las tareas de un usuario filtradas y ordenadas.
   * @note Requiere un índice compuesto en Firestore para funcionar con orderBy() y where().
   */
  async getAllByUser(userId: string): Promise<Task[]> {
    const snapshot = await this.collection
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        title: data.title,
        color: data.color,
        description: data.description,
        completed: data.completed,
        // Convierte el objeto Timestamp nativo de Firebase a un objeto Date de JS
        createdAt: (data.createdAt as admin.firestore.Timestamp).toDate(),
      } as Task;
    });
  }

  /**
   * Actualiza parcialmente un documento de tarea.
   * Realiza una limpieza de campos para evitar sobreescribir datos con valores 'undefined'.
   */
  async update(task: Task): Promise<Task> {
    if (!task.id) throw new Error('Task ID es requerido para actualizar la tarea');

    const docRef = this.collection.doc(task.id);

    // Mapeo dinámico de campos para permitir actualizaciones parciales
    const updateData: Partial<Task> = {};
    if (task.title !== undefined) updateData.title = task.title;
    if (task.color !== undefined) updateData.color = task.color;
    if (task.description !== undefined) updateData.description = task.description;
    if (task.completed !== undefined) updateData.completed = task.completed;

    if (Object.keys(updateData).length === 0) {
      throw new Error('NO hay campos para actualizar');
    }

    await docRef.update(updateData);

    // Recupera el documento actualizado para devolver el estado final
    const updatedDoc = await docRef.get();
    const data = updatedDoc.data()!;
    return {
      id: updatedDoc.id,
      userId: data.userId,
      title: data.title,
      color: data.color,
      description: data.description,
      completed: data.completed,
      createdAt: (data.createdAt as admin.firestore.Timestamp).toDate(),
    };
  }

  /**
   * Elimina un documento por su ID.
   * Si el documento no existe, Firestore no lanza error, simplemente no hace nada.
   */
  async delete(taskId: string): Promise<void> {
    await this.collection.doc(taskId).delete();
  }
}