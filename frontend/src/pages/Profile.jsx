import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

const Profile = () => {
 const { userToken } = useContext(UserContext);
 console.log(userToken);
 const submitProfile = () => {
  return
 }
 return (
  <div className='flex flex-col items-center bg-black h-[100vh] text-white'>
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
     <input type="submit" />
    </div>
    </form>
  </div>
 )
}

export default Profile