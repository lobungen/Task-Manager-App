import { useEffect, useState } from 'react';
import auth from '../utils/auth';
import { FaUserCircle } from 'react-icons/fa';

const getAvatarColor = (username?: string) => {
  if (!username) return '#888';
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 50%)`;
};

const Profile = () => {
  const [userData, setUserData] = useState<{ username?: string } | null>(null);

  useEffect(() => {
    const user = auth.getProfile();
    setUserData(user);
  }, []);

  if (!userData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="container">
      <h1>Profile</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <FaUserCircle size={48} color={getAvatarColor(userData.username)} />
        <span style={{ fontSize: 24 }}>{userData.username}</span>
      </div>
      {/* Add more user info here if available */}
    </div>
  );
};

export default Profile;