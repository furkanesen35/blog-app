import React from 'react'
import axios from "axios"

const Register = () => {
 const submitForm = (e) => {
  e.preventDefault()
  const data = {
   username: e.target.username.value,
   password: e.target.password.value,
   email: e.target.email.value,
  }
  const response = axios
   .post("http://localhost:8000/account/register/", data)
   .then(res => console.log(res))
   .catch(error => console.log(error))
   console.log(response)
 }
 return (
  <div>
   <form action="" onSubmit={submitForm}>
    <input type="text" name='username' placeholder='username'/>
    <input type="email" name='email' placeholder='email' />
    <input type="password" name='password' placeholder='password' />
    <button type='submit'>Submit</button>
   </form>
  </div>
 )
}

export default Register