import Ticket from '../models/ticket.js';
import User from '../models/user.js';
export const seedTickets = async () => {
    const users = await User.find(); // Fetch all users first
    if (users.length < 2) {
        throw new Error('Not enough users in DB to assign tickets.');
    }
    await Ticket.insertMany([
        {
            name: 'Design landing page',
            status: 'In Progress',
            description: 'Create wireframes and mockups for the landing page.',
            assignedUser: users[0]._id,
        },
        {
            name: 'Set up project repository',
            status: 'Done',
            description: 'Create a new repository on GitHub and initialize it with a README file.',
            assignedUser: users[1]._id,
        },
        {
            name: 'Implement authentication',
            status: 'Todo',
            description: 'Set up user authentication using JWT tokens.',
            assignedUser: users[0]._id,
        },
        {
            name: 'Test the API',
            status: 'Todo',
            description: 'Test the API using Insomnia.',
            assignedUser: users[0]._id,
        },
        {
            name: 'Deploy to production',
            status: 'Todo',
            description: 'Deploy the application to Render.',
            assignedUser: users[1]._id,
        },
    ]);
};
