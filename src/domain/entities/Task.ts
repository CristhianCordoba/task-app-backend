export interface Task {
  id: string;
  userId: string;
  color: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}