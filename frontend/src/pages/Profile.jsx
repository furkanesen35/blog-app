import axios from 'axios';
import React,{ useContext, useEffect, useState} from 'react'
import { UserContext } from '../context/UserContext';
import { jwtDecode } from "jwt-decode";

const Profile = () => {
 const { userToken } = useContext(UserContext);
 const [profile, setProfile] = useState({});

 useEffect(() => {

  if (userToken) {
   const decoded = jwtDecode(userToken);
   const user = decoded.user_id;
   console.log(user);
  axios.get(`http://127.0.0.1:8000/account/get_user_profile/${user}`)
   .then(response => {
    setProfile(response.data);
   })
   .catch(error => {
    console.error('Error fetching profile:', error);
   });
  }
 }, [userToken]);

 const submitProfile = (e) => {
  e.preventDefault();
  const data = {
   username: e.target.username.value,
  //  password: e.target.password.value,
  };
  axios.put(`http://127.0.0.1:8000/account/change_profile/${profile.id}`, data)
   .catch(error => {
    console.error('Error submitting post:', error);
   });
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