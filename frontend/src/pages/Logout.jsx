import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const LogoutComponent = () => {
 const { logoutUser } = useContext(UserContext);
 const handleLogout = async () => {
  try {
   await axios.post('http://localhost:8000/account/api/logout/');
   logoutUser();
   console.log('Logout successful');
  } catch (error) {
   console.error('Logout failed:', error);
  }
 };
 return (
  <div className='flex items-start justify-center bg-black h-[100vh] text-white'>
   <button onClick={handleLogout}>Logout</button>
  </div>
 );
};
export default LogoutComponent;
