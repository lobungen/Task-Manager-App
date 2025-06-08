// filepath: server/src/seeds/ticket-seeds.ts
// import { updateTicket } from '../controllers/ticket-controller.js';
import { Ticket } from '../models/ticket.js';
export const seedTickets = async (users) => {
    const now = new Date();
    await Ticket.create([
        {
            name: 'Design landing page',
            status: 'In Progress',
            description: 'Create wireframes and mockups for the landing page.',
            assignedUser: users[0]._id,
            createdAt: now,
            updatedAt: now,
            priority: 'High',
        },
        {
            name: 'Set up project repository',
            status: 'Done',
            description: 'Create a new repository on GitHub and initialize it with a README file.',
            assignedUser: users[1]._id,
            createdAt: now,
            updatedAt: now,
            priority: 'Medium',
        },
        {
            name: 'Implement authentication',
            status: 'To Do',
            description: 'Set up user authentication using JWT tokens.',
            assignedUser: users[2]._id,
            createdAt: now,
            updatedAt: now,
            priority: 'High',
        },
        {
            name: 'Test the API',
            status: 'To Do',
            description: 'Test the API using Insomnia.',
            assignedUser: users[0]._id,
            createdAt: now,
            updatedAt: now,
            priority: 'Low',
        },
        {
            name: 'Deploy to production',
            status: 'To Do',
            description: 'Deploy the application to Render.',
            assignedUser: users[1]._id,
            createdAt: now,
            updatedAt: now,
            priority: 'Medium',
        },
    ]);
};
