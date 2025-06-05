import { Ticket, User } from '../models/index.js';



const resolvers = {
  Query: {
    tickets: async () => {
      return await Ticket.find();
    },
    users: async () => {
        return await User.find(); // Assuming you have a User model, replace Ticket with User
        }
  },

    Mutation: {
        createTicket: async (_: any, { name, status, description }: { name: string; status: string; description: string;  }) => {
        const newTicket = await Ticket.create({ name, status, description });
        return newTicket;
        },
    }
};

export default resolvers;
