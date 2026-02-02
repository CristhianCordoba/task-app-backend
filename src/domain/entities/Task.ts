/**
 * Representa una tarea dentro del sistema.
 * Esta es una entidad core del dominio y debe permanecer independiente
 * de cualquier framework o base de datos.
 */
export interface Task {
  /** Identificador único de la tarea (UUID o Firestore ID) */
  id: string;
  
  /** Referencia al ID del usuario propietario de esta tarea */
  userId: string;
  
  /** Código hexadecimal o nombre del color para representar la tarea en la UI */
  color: string;
  
  /** Título breve de la actividad */
  title: string;
  
  /** Detalle extendido de lo que se debe realizar */
  description: string;
  
  /** Estado de progreso de la tarea */
  completed: boolean;
  
  /** Fecha de creación del registro */
  createdAt: Date;
}