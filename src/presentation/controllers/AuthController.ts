import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { FirestoreUserRepository } from '../../infrastructure/repositories/FirestoreUserRepository';

// Instancia del repositorio para interactuar con la persistencia de usuarios
const userRepo = new FirestoreUserRepository();

/**
 * Controlador encargado de la autenticación y registro de usuarios.
 * Maneja las peticiones HTTP y define los códigos de respuesta (200, 201, 404, etc.).
 */
export class AuthController {
  
  /**
   * Maneja el inicio de sesión.
   * Verifica la existencia del usuario y genera un token JWT.
   */
  static async login(req: Request, res: Response) {
    const { email } = req.body;
    let user = await userRepo.findByEmail(email);

    // Si el usuario no existe en Firestore, devolvemos 404
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generación del token de sesión con una validez de 24 horas
    // En AuthController.ts
    const secret = process.env.JWT_SECRET || 'secret-key';
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '24h' });
    
    res.json({ token, user });
  }

  /**
   * Registra un nuevo usuario si el correo no está duplicado.
   */
  static async register(req: Request, res: Response) {
    try {
      const { email } = req.body;
      
      // Validación de duplicados para evitar registros redundantes
      const existingUser = await userRepo.findByEmail(email);

      if (existingUser) {
        // Código 409: Conflicto (el recurso ya existe)
        return res.status(409).json({
          message: 'Este correo ya está registrado',
          user: existingUser,
        });
      }

      // Persistencia del nuevo usuario en la base de datos
      const newUser = await userRepo.create({
        email,
        createdAt: new Date(),
      });

      // Se entrega un token inmediatamente tras el registro exitoso (experiencia de usuario fluida)
      const token = jwt.sign({ userId: newUser.id }, 'secret-key', { expiresIn: '24h' });
      
      res.status(201).json({ token, user: newUser });
    } catch (err) {
      // Captura de errores inesperados (ej. problemas de conexión con Firebase)
      res.status(500).json({ message: 'Ocurrió un error al registrar el usuario' });
    }
  }
}