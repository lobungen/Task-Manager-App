import User from '../models/user.js';

export const seedUsers = async () => {
  const users = [
    { username: 'JollyGuru', password: 'password' },
    { username: 'SunnyScribe', password: 'password' },
    { username: 'RadiantComet', password: 'password' },
  ];

  for (const userData of users) {
    const user = new User(userData);
    await user.save(); // password is hashed via pre-save hook
  }
};