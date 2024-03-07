import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Post = () => {
 const { userToken } = useContext(UserContext);
 const [categories, setCategories] = useState([]);

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
  axios.get('http://localhost:8000/get_category/')
   .then(response => {
    setCategories(response.data);
   })
   .catch(error => {
    console.error('Error fetching categories:', error);
   });
 },[]);

 const submitForm = (e) => {
  e.preventDefault();

  const data = {
   title: e.target.title.value,
   content: e.target.content.value,
   status: e.target.status.value,
   category: {id:e.target.category.value, name:e.target.category.value2},
  };

  axios.post("http://localhost:8000/post/add/", data, {headers} )
   .catch(error => {
    console.error('Error submitting post:', error);
   });
 };

 return (
  <div className='flex justify-center bg-black h-[100vh] text-white'>
   <form className='flex flex-col w-[300px]' action="" method='POST' onSubmit={submitForm} >
    <label htmlFor="title">Title</label>
    <input type="text" name='title' id='title' className='text-black' />
    <label htmlFor="content">Content</label>
    <textarea name="content" id="content" cols="30" rows="10" className='text-black' />
    <label htmlFor="status">Status</label>
    <select name="status" id="status" className='text-black'>
     <option value="d" className='text-black'>Draft</option>
     <option value="p" className='text-black'>Published</option>
    </select>
    <label htmlFor="category">Category</label>
    <select name="category" id="category" className='text-black' >
     {categories.map((category, index) => (
      <option key={index} value={category.id} className='text-black' value2={category.name}>{category.name} {category.id}</option>
     ))}
    </select>
    <input type="submit" />
   </form>
  </div>
 );
};

export default Post;