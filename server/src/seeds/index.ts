import connectDB from '../db/mongoose.js';
import User from '../models/user.js';
import Ticket from '../models/ticket.js';
import bcrypt from 'bcrypt';

const seed = async () => {
  try {
    await connectDB(); // Connect to MongoDB

    // Clear existing records
    await User.deleteMany({});
    await Ticket.deleteMany({});

    // Hash password
    const hashedPassword = await bcrypt.hash('password', 10);

    // Seed users with hashed passwords
    const users = await User.insertMany([
      { username: 'JollyGuru', password: hashedPassword },
      { username: 'SunnyScribe', password: hashedPassword },
      { username: 'RadiantComet', password: hashedPassword }
    ]);

    // Seed tickets with user references
    await Ticket.insertMany([
      {
        name: 'Design landing page',
        status: 'In Progress',
        description: 'Create wireframes and mockups for the landing page.',
        assignedUserId: users[0]._id
      },
      {
        name: 'Deploy to production',
        status: 'Todo',
        description: 'Deploy the application to Render.',
        assignedUserId: users[1]._id
      }
    ]);

    console.log('✅ Seeded users and tickets');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
};

seed();
