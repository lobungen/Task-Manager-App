import { useEffect, useState } from 'react';
import auth from '../utils/auth';

const Profile = () => {
  const [userData, setUserData] = useState<{ username?: string; email?: string } | null>(null);

  useEffect(() => {
    const user = auth.getUser();
    if (user) {
      setUserData(user);
    } else {
    }
  }, []);

  if (!userData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="container">
      <h1>Profile</h1>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      {/* Add more user info here */}
    </div>
  );
};

export default Profile;
