import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Extensión de la interfaz Request de Express.
 * Permite adjuntar la información del usuario autenticado al objeto de la petición
 * para que esté disponible en los controladores.
 */
export interface AuthRequest extends Request {
  user?: { userId: string }; // Usamos userId para mantener consistencia con el token
}

/**
 * Middleware de autenticación basado en JWT.
 * Valida que la petición incluya un token válido en la cabecera 'Authorization'.
 */
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // 1. Extraer el header de autorización
  const authHeader = req.headers.authorization;

  // 2. Si no hay header, denegar el acceso inmediatamente (401 Unauthorized)
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

  // 3. El formato suele ser "Bearer <token>", por lo que dividimos el string y tomamos el índice 1
  const token = authHeader.split(' ')[1];

  try {
    /**
     * 4. Verificar la autenticidad del token.
     * Intenta usar la variable de entorno; si no existe, usa la clave por defecto.
     */
    const secret = process.env.JWT_SECRET || 'secret-key';
    const decoded = jwt.verify(token, secret) as { userId: string };

    // 5. Inyectamos los datos del usuario decodificados en la petición
    req.user = decoded;

    // 6. Cede el control al siguiente middleware o controlador en la ruta
    next();
  } catch (err) {
    // 7. Si el token expiró o es manipulado, lanzamos error 401
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};