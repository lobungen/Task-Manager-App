import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './user.js';
import Ticket from './ticket.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export { connectDB, User, Ticket };
