import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from './user';

export interface ITicket extends Document {
  name: string;
  status: string;
  description: string;
  assignedUser: Types.ObjectId | IUser;
  createdAt?: Date;
  updatedAt?: Date;
  priority: 'Low' | 'Medium' | 'High';
}

const TicketSchema: Schema<ITicket> = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  assignedUser: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' }
}, {
  timestamps: true
});

export const Ticket = mongoose.model<ITicket>('Ticket', TicketSchema);