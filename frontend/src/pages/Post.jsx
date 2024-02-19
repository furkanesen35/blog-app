import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Post = () => {
 const [categories, setCategories] = useState([]);
 const [statuses, setStatuses] = useState([]);
 useEffect(() => {
  axios.get('http://localhost:8000/api/categories/')
  .then(response => {
    setCategories(response.data);
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
  });
  axios.get('http://localhost:8000/api/statuses/')
  .then(response => {
    setStatuses(response.data);
  })
  .catch(error => {
    console.error('Error fetching statuses:', error);
  });
 }, []);
 return (
  <div className='felx justify-center bg-black h-[100vh] text-white'>
   <form action="" method='POST'>
    <label htmlFor="title">Title</label>
    <input type="text" name='title' id='title'/>
    <label htmlFor="content">Content</label>
    <textarea name="content" id="content" cols="30" rows="10"/>
    <label htmlFor="category">Category</label>
    <select name="category" id="category">
     <option value="d">Draft</option>
     <option value="p">Published</option>
    </select>
    <label htmlFor="status">Status</label>
    <select name="status" id="status">
     <option value="d">Draft</option>
     <option value="p">Published</option>
    </select>
   </form>
  </div>
 )
}

export default Post