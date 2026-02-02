/**
 * Representa un usuario autenticado en la plataforma.
 */
export interface User {
  /** * Identificador único del usuario. 
   * Es opcional (?) porque durante el registro inicial el ID puede ser generado por el proveedor (Firebase) 
   */
  id?: string;
  
  /** Correo electrónico único vinculado a la cuenta */
  email: string;
  
  /** Fecha en la que el usuario se registró en el sistema */
  createdAt: Date;
}