import React from 'react'
import axios from "axios"

const Login = () => {
 const submitForm = (e) => {
  e.preventDefault()
  const data = {
   username: e.target.username.value,
   password: e.target.password.value,
  }
  axios
  .post("http://localhost:8000/account/api/token/", data)
  .then(res => {
   if ( res.data ) {
    const token = res.data.access;
    localStorage.setItem('token', token);
   }
  })
  .catch(error => console.log(error));
 }
 return (
  <div className='flex flex-col  items-center bg-black h-[100vh] w-[100%]'>
   <div className=''>
    <h3 className='text-white '>Please Login with your account</h3>
   </div>
   <form action="" onSubmit={submitForm}>
    <input type="text" name='username' placeholder='username'/>
    <input type="password" name='password' placeholder='password' />
    <button type='submit' className='text-white'>Submit</button>
   </form>
  </div>
 )
}

export default Login