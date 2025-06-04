import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';

import graphqlHandler from './graphql/index.js';

import cors from 'cors';



const app = express();

// Add GraphQL middleware
app.use('/graphql', graphqlHandler);

app.use(cors({
  origin: 'https://task-manager-client-bajo.onrender.com', // ✅ Allow frontend origin
  credentials: true
}));


const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kanban_db';


app.use(express.json());
app.use(express.static('../client/dist')); // Serve frontend

// Use routes
app.use(routes);

app.get('/test', (_, res) => {
  res.send('✅ Server is live!');
});

// Connect to MongoDB and start the server
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('🟢 Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('🔴 MongoDB connection error:', err);
  });
