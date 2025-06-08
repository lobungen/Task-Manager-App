import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.deleteMany({});
  for (const user of [
    { 
      username: 'JollyGuru', 
      password: 'password',
      avatarUrl: '',
      color: '#1864c7',
    },
    { 
      username: 'SunnyScribe', 
      password: 'password',
      avatarUrl: '',
      color: '#28a745',
    },
    { 
      username: 'RadiantComet', 
      password: 'password',
      avatarUrl: '',
      color: '#ffc107',
    },
  ]) {
    const newUser = new User(user);
    await newUser.save(); // This triggers pre-save hook for hashing
  }
};