import User from '../models/user.js';
import Ticket from '../models/ticket.js';

export const root = {
  users: async () => await User.find(),
  user: async ({ id }: { id: string }) => await User.findById(id),
  tickets: async () => await Ticket.find(),
  ticket: async ({ id }: { id: string }) => await Ticket.findById(id),

  createTicket: async ({ input }: any) => {
    const newTicket = await Ticket.create(input);
    return newTicket;
  },

  deleteTicket: async ({ id }: { id: string }) => {
    await Ticket.findByIdAndDelete(id);
    return `Ticket ${id} deleted`;
  },
};
