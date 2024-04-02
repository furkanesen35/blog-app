import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Post = () => {
 const { userToken, axiosInstance } = useContext(UserContext);
 const [categories, setCategories] = useState([]);
 const [imageFile, setImageFile] = useState(null);

 function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
 }

 const csrftoken = getCookie('csrftoken');
 
 const headers = {
  'Content-Type': 'multipart/form-data',
  'X-CSRFToken': csrftoken,
  Authorization : `Bearer ${userToken}`,
 };

 useEffect(() => {
  axiosInstance.get('/get_category/')
   .then(response => {
    setCategories(response.data);
   })
   .catch(error => {
    console.error('Error fetching categories:', error);
   });
 },[]);

 const submitForm = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', e.target.title.value);
  formData.append('content', e.target.content.value);
  formData.append('status', e.target.status.value);
  formData.append('category', e.target.category.value);
  formData.append('image', imageFile);

  try {
   const response = await axiosInstance.post("/post/add/", formData);
   console.log(response.data);
  } catch (error) {
   console.error('Error submitting post:', error);
  }
 };

 const handleImageChange = (e) => {
  setImageFile(e.target.files[0]);
 };

 return (
  <div className='flex flex-col items-center bg-black h-[100vh] text-white'>
   <div>
    Post your pictures
   </div>
   <form className='flex flex-col w-[300px]' action="" method='POST' onSubmit={submitForm} encType="multipart/form-data">
    <label htmlFor="title">Title</label>
    <input type="text" name='title' id='title' className='text-black' />
    <label htmlFor="content">Content</label>
    <textarea name="content" id="content" cols="30" rows="10" className='text-black' />
    <label htmlFor="image">Image</label>
    <input type="file" name="image" id="image" accept='image/*' onChange={handleImageChange} />
    <label htmlFor="status">Status</label>
    <select name="status" id="status" className='text-black'>
     <option value="d" className='text-black'>Draft</option>
     <option value="p" className='text-black'>Published</option>
    </select>
    <label htmlFor="category">Category</label>
    <select name="category" id="category" className='text-black' >
     {categories.map((category, index) => (
      <option key={index} value={category.id} className='text-black' value2={category.name}>{category.name}</option>
     ))}
    </select>
    <input type="submit" />
   </form>
  </div>
 );
};

export default Post;
