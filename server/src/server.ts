import dotenv from 'dotenv';
dotenv.config();
import path from 'node:path';
import express from 'express';
//import mongoose from 'mongoose';
import routes from './routes/index.js';
import { connectDB } from './models/index.js'; // Import the database connection

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { typeDefs, resolvers } from './schemas/index.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
const PORT = process.env.PORT || 3001;
//const connection = process.env.MONGODB_URI || 'mongodb://localhost:27017/kanban_db';
//console.log("Connecting to MongoDB at:", connection);


const startApolloServer = async () => {
  await server.start();

  await connectDB(); // Initialize database connection

  app.use(express.static('../client/dist')); // Serve frontend
  app.use(express.json());

  // Use routes
  app.use(routes);
  app.use('/graphql', expressMiddleware(server));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }


  app.get('/test', (_, res) => {
    res.send('✅ Server is live!');
  });
  
  app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
  });
};

startApolloServer().catch((error) => {
  console.error('Error starting Apollo Server:', error);
});