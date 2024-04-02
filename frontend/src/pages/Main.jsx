import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import LikeButton from '../components/LikeButton';

const Main = () => {
 const { userToken, posts, fetchedData, axiosInstance } = useContext(UserContext);
 const [categories, setCategories] = useState([]);

 useEffect(() => {
  axiosInstance.get('/get_category/')
   .then(response => {
    setCategories(response.data);
   })
   .catch(error => {
    console.error('Error fetching categories:', error);
   });
 },[]);
  
 useEffect(() => {
  fetchedData()
 }, [])
  
 return (
  <>{userToken ? 
   <div className='flex justify-center bg-black text-white'>
    <ul>
     {posts.map((post, index) => (
      <li key={index} className='flex flex-col justify-center items-center h-[600px] w-[300px]'>
       <a href={`/detail/${post.slug}`}><div>Title: {post.title}</div></a>
       <a href={`/detail/${post.slug}`} className='mw-[300px] '><img src={`http://localhost:8000${post.image}`} alt="" /></a> 
       <div>Content: {post.content}</div>
       <div>Category: {categories.map(category => category.id === post.category ? category.name : null) }</div>
        {post.comments.length ? <div>Comments: {post.comments.map((e, index) => ( <div key={index}>{e.content}</div>))}</div> : <></>}
       <LikeButton post={post}/>
       <div>Slug: {post.slug}</div>
      </li>
     ))}
    </ul>
   </div> : 
   <div className='flex justify-center bg-black h-[1000vh] text-white'>
    Please
    <a href="/login">
     Login
    </a>
   </div>
  }
  </>
 )
}

export default Main