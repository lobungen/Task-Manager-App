import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
//import mongoose from 'mongoose';
import routes from './routes/index.js';
import { connectDB } from './models/index.js'; // Import the database connection
const app = express();
const PORT = process.env.PORT || 3001;
//const connection = process.env.MONGODB_URI || 'mongodb://localhost:27017/kanban_db';
//console.log("Connecting to MongoDB at:", connection);
await connectDB(); // Initialize database connection
app.use(express.static('../client/dist')); // Serve frontend
app.use(express.json());
// Use routes
app.use(routes);
app.get('/test', (_, res) => {
    res.send('✅ Server is live!');
});
// Connect to MongoDB and start the server
/*
mongoose.connect(connection)
  .then(() => {
    console.log('🟢 Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('🔴 MongoDB connection error:', err);
  });
*/
app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
});
