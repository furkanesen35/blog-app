import axios from 'axios';
import React,{ useContext, useEffect, useState} from 'react'
import { UserContext } from '../context/UserContext';
import { jwtDecode } from "jwt-decode";

const Profile = () => {
 const { userToken } = useContext(UserContext);
 const [profile, setProfile] = useState({});

 useEffect(() => {
  const fetchProfile = async () => {
   try {
    if (userToken) {
     const decoded = jwtDecode(userToken);
     const user = decoded.user_id;
     const response = await axios.get(`http://127.0.0.1:8000/account/get_user_profile/${user}`);
     setProfile(response.data);
    }
   } catch (error) {
     console.error('Error fetching profile:', error);
   }
  };

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
   setProfile((prevProfile) => ({ ...prevProfile, ...data }));
  } catch (error) {
   console.error('Error submitting profile:', error);
  }
 };

 return (
  <div className='flex flex-col items-center bg-black h-[100vh] text-white'>
   <p>
    Your Profile Info
   </p>
   <p>Username: {profile.username}</p>
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