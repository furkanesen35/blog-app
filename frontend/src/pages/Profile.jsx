import axios from 'axios';
import React,{ useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext';

const Profile = () => {
 const { userToken, fetchProfile, profile } = useContext(UserContext);


 useEffect(() => {
   fetchProfile();
 }, [userToken]);

 const submitProfile = async (e) => {
  e.preventDefault();
  const data = {
    username: e.target.username.value,
    email: e.target.email.value,
    password: e.target.password.value,
  };

  try {
   await axios.put(`http://127.0.0.1:8000/account/change_profile/${profile.id}`, data);
  } catch (error) {
   console.error('Error submitting profile:', error);
  }
 };

 return (
  <div className='flex flex-col items-center bg-black h-[100vh] text-white'>
   <p>
    Your Profile Info
   </p>
   <p>Username: {profile?.username}</p>
   <p>Change your profile settings</p>
   <form action="" method='POST' onSubmit={submitProfile}>
    <div className='mt-[10px]'>
     <label htmlFor="username">Username:</label>
     <input type="text" name='username' className='text-black'/>
    </div>
    <div className='mt-[10px]'>
     <label htmlFor="email">Email:</label>
     <input type="email" name='email' className='text-black'/>
    </div>
    <div className='mt-[10px]'>
     <label htmlFor="password">Password:</label>
     <input type="password" name='password' className='text-black'/>
    </div>
    <div className='flex justify-center'>
     <input type="submit" className='cursor-pointer'/>
    </div>
   </form>
  </div>
 );
};

export default Profile