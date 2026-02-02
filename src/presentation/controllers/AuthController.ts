import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { FirestoreUserRepository } from '../../infrastructure/repositories/FirestoreUserRepository';

const userRepo = new FirestoreUserRepository();
export class AuthController {
  static async login(req: Request, res: Response) {
    const { email } = req.body;
    let user = await userRepo.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '24h' });
    res.json({ token, user });
  }

  static async register(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const existingUser = await userRepo.findByEmail(email);

      if (existingUser) {
        return res.status(409).json({
          message: 'Este correo ya está registrado',
          user: existingUser,
        });
      }
      const newUser = await userRepo.create({
        email,
        createdAt: new Date(),
      });
      const token = jwt.sign({ userId: newUser.id }, 'secret-key', { expiresIn: '24h' });
      res.status(201).json({ token, user: newUser });
    } catch (err) {
      res.status(500).json({ message: 'Ocurrió un error al registrar el usuario' });
    }
  }
}