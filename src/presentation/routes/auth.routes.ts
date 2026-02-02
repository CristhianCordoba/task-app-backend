import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

/**
 * Enrutador de Autenticación.
 * Define los endpoints públicos para el acceso y registro de usuarios.
 */
const router = Router();

/**
 * @route   POST /auth/login
 * @desc    Autentica un usuario y devuelve un token JWT.
 * @access  Público
 */
router.post('/login', AuthController.login);

/**
 * @route   POST /auth/register
 * @desc    Crea una nueva cuenta de usuario y devuelve el perfil con su token.
 * @access  Público
 */
router.post('/register', AuthController.register);

export default router;