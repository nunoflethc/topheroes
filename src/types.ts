export interface Task {
  id: string;
  title: string;
  status: 'active' | 'completed';
  priority: 'low' | 'routine' | 'high' | 'security' | 'scheduled';
  deadline?: string;
  metadata?: string;
}

export type AppScreen = 'login' | 'signup' | 'dashboard';
