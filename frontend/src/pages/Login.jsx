import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Login = () => {
 const { loginUser, axiosInstance } = useContext(UserContext);
 
 const submitForm = (e) => {
  e.preventDefault();

  const data = {
   username: e.target.username.value,
   password: e.target.password.value,
  };

  axiosInstance.post("/account/api/token/", data)
   .then(res => {
    if (res.data) {
     const token = res.data.access;
     loginUser(token);
    }
   })
   .catch(error => console.log(error));
 };

 return (
  <div className='flex flex-col items-center bg-black h-[100vh] w-[100%]'>
   <div>
    <h3 className='text-white'>Please Login with your account</h3>
   </div>
   <form onSubmit={submitForm}>
    <input type="text" name='username' placeholder='username' />
    <input type="password" name='password' placeholder='password' />
    <button type='submit' className='text-white'>Submit</button>
   </form>
  </div>
 );
};

export default Login;
