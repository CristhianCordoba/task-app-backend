import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { CreateTask } from '../../application/use-cases/CreateTask';
import { GetTasks } from '../../application/use-cases/GetTasks';
import { UpdateTask } from '../../application/use-cases/UpdateTask';
import { DeleteTask } from '../../application/use-cases/DeleteTask';
import { FirestoreTaskRepository } from '../../infrastructure/repositories/FirestoreTaskRepository';

const router = Router();

/**
 * COMPOSICIÓN DE LA CAPA DE TAREAS (Inyección de Dependencias)
 * 1. Instanciamos el repositorio real (Firestore).
 * 2. Inyectamos el repositorio en cada caso de uso.
 * 3. Pasamos los casos de uso al controlador.
 * Esto permite que el controlador sea agnóstico a la base de datos.
 */
const repo = new FirestoreTaskRepository();
const controller = new TaskController(
  new CreateTask(repo),
  new GetTasks(repo),
  new UpdateTask(repo),
  new DeleteTask(repo)
);

/**
 * CONFIGURACIÓN DE SEGURIDAD
 * Aplicamos el middleware de autenticación a todas las rutas de este archivo.
 * Ningún endpoint de tareas será accesible sin un token JWT válido.
 */
router.use(authMiddleware);

/**
 * DEFINICIÓN DE ENDPOINTS (CRUD)
 * Base URL: /tasks (configurado en el index.ts principal)
 */

// Obtener todas las tareas del usuario logueado
router.get('/', controller.getTasks);

// Crear una nueva tarea
router.post('/', controller.createTask);

// Actualizar una tarea existente mediante su ID
router.put('/:id', controller.updateTask);

// Eliminar una tarea mediante su ID
router.delete('/:id', controller.deleteTask);

export default router;