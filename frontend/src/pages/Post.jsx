import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext';

const Post = () => {
 const { userToken } = useContext(UserContext);
 const [categories, setCategories] = useState([]);
 useEffect(() => {
  axios.get('http://localhost:8000/get_category/')
  .then(response => {
    setCategories(response.data);
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
  });
 }, []);
 const submitForm = (e) => {
  e.preventDefault()
  const data = {
   title: e.target.title.value,
   content: e.target.content.value,
   status: e.target.status.value,
   category: e.target.category.value,
  }
  const response = axios
   .post("http://localhost:8000/post/add/", data,{
    headers: {
     Authorization: `Bearer ${userToken}`
    }
   })
   .then(res => console.log(res))
   .catch(error => console.log(error))
   console.log(response)
 }
 return (
  <div className='flex justify-center'>
   <form className='flex flex-col' action="" method='POST' onSubmit={submitForm}>
    <label htmlFor="title">Title</label>
    <input type="text" name='title' id='title'/>
    <label htmlFor="content">Content</label>
    <textarea name="content" id="content" cols="30" rows="10"/>
    <label htmlFor="status">Status</label>
    <select name="status" id="status">
     <option value="d">Draft</option>
     <option value="p">Published</option>
    </select>
    <label htmlFor="category">Category</label>
    <select name="category" id="category">
     {categories.map((category, index) => (
      <option key={index} value={category.id}>{category.name}</option>
     ))}
    </select>
    <input type="submit" />
   </form>
  </div>
 )
}

export default Post