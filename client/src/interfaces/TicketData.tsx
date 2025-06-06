import { UserData } from './UserData';

export interface TicketData {
  id: number; 
  name: string;
  description: string;
  status: string;
  assignedUserId: number;
  assignedUser: UserData | null; // Optional, can be null if not assigned
}
