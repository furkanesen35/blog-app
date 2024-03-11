import axios from 'axios';
import React,{ useContext, useEffect, useState} from 'react'
import { UserContext } from '../context/UserContext';

const Profile = () => {
 const { userToken } = useContext(UserContext);
 const [user, setUser] = useState({});
 const [profile, setProfile] = useState({});

 function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
 }

 const csrftoken = getCookie('csrftoken');
 
 const headers = {
  'Content-Type': 'application/json',
  'X-CSRFToken': csrftoken,
  Authorization : `Bearer ${userToken}`,
 };

 useEffect(() => {
  if (!profile.id) {
   axios.get("http://127.0.0.1:8000/account/get_user_profile/1")
    .then(response => {
     setProfile(response.data);
    })
    .catch(error => {
     console.error('Error fetching profile:', error);
    });
  }
 }, []);

 const submitProfile = (e) => {
  e.preventDefault();
  const data = {
   username: e.target.username.value,
   password: e.target.password.value,
  };
  setUser(data);

 };

 console.log(headers);

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