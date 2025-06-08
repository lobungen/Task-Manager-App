import { UserData } from './UserData';

export interface TicketData {
  id: string;
  name: string;
  description: string;
  status: string;
  assignedUserId: string;
  assignedUser: UserData | null;
  avatarUrl: string; 
  createdAt: string;
  updatedAt?: string;
  priority?: 'Low' | 'Medium' | 'High';
}
