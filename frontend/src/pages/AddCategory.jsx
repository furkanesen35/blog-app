import React from 'react'
import axios from "axios"

const AddCategory = () => {
 const submitForm = (e) => {
  e.preventDefault()
  const data = {
   name: e.target.username.value,
  }
  // const response = axios
  //  .post("http://localhost:8000/categories/", data)
  //  .then(res => console.log(res))
  //  .catch(error => console.log(error))
   console.log(data);
 }
 return (
  <div>
   <form action="" onSubmit={submitForm}>
    <label htmlFor="name">Category Name:</label>
    <input type="text" id='name' name='name' placeholder='name'/>
    <button type='submit'>Submit</button>
   </form>
  </div>
 )
}

export default AddCategory