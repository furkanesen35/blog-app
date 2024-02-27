import React from 'react';
import axios from 'axios';

const LogoutComponent = () => {
 const handleLogout = async () => {
  try {
   await axios.post('http://localhost:8000/account/api/logout/');
   localStorage.removeItem('access_token');
   localStorage.removeItem('refresh_token');
   console.log('Logout successful');
  } catch (error) {
   console.error('Logout failed:', error);
  }
 };
 return (
  <div>
   <button onClick={handleLogout}>Logout</button>
  </div>
 );
};

export default LogoutComponent;