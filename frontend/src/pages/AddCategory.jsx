import React, { useContext } from 'react'
import axios from "axios"
import { UserContext } from '../context/UserContext';

const AddCategory = () => {
 const { axiosInstance } = useContext(UserContext);
 const submitForm = (e) => {
  e.preventDefault()
  const data = {
   name: e.target.name.value,
  }
  const response = axiosInstance
   .post("/add_category/", data)
   .then(res => console.log(res))
   .catch(error => console.log(error))
 }
 return (
  <div className='flex items-start justify-center bg-black h-[100vh] text-white'>
   <form action="" onSubmit={submitForm}>
    <label htmlFor="name">Category Name:</label>
    <input type="text" className='text-black' id='name' name='name' placeholder='name'/>
    <button type='submit'>Submit</button>
   </form>
  </div>
 )
}

export default AddCategory