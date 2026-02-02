import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { Task } from '../../domain/entities/Task';
import { db } from '../firestore/firebase';
import admin from 'firebase-admin';

export class FirestoreTaskRepository implements TaskRepository {
  private collection = db.collection('tasks');

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
      const ref = await this.collection.add(docData);
      return { ...docData, id: ref.id } as Task;

    } catch (error) {
      console.error('Error al insertar en Firestore:', error);
      throw error;
    }
  }

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
        createdAt: (data.createdAt as admin.firestore.Timestamp).toDate(),
      } as Task;
    });
  }

  async update(task: Task): Promise<Task> {
    if (!task.id) throw new Error('Task ID es requerido para actualizar la tarea');

    const docRef = this.collection.doc(task.id);

    const updateData: Partial<Task> = {};
    if (task.title !== undefined) updateData.title = task.title;
    if (task.color !== undefined) updateData.color = task.color;
    if (task.description !== undefined) updateData.description = task.description;
    if (task.completed !== undefined) updateData.completed = task.completed;

    if (Object.keys(updateData).length === 0) {
      throw new Error('No valid fields to update');
    }

    await docRef.update(updateData);

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

  async delete(taskId: string): Promise<void> {
    await this.collection.doc(taskId).delete();
  }
}