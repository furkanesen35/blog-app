import React from 'react'
import axios from "axios"

const AddCategory = () => {
 const submitForm = (e) => {
  e.preventDefault()
  const data = {
   name: e.target.name.value,
  }
  const response = axios
   .post("http://localhost:8000/add_category/", data)
   .then(res => console.log(res))
   .catch(error => console.log(error))
 }
 return (
  <div className='flex items-start justify-center bg-black h-[100vh] text-white'>
   <form action="" onSubmit={submitForm}>
    <label htmlFor="name">Category Name:</label>
    <input type="text" id='name' name='name' placeholder='name'/>
    <button type='submit'>Submit</button>
   </form>
  </div>
 )
}

export default AddCategory