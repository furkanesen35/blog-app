import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';

const Main = () => {
 const { userToken } = useContext(UserContext);
 const [data, setData] = useState([])

 function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
 }
 
 const csrftoken = getCookie('csrftoken');
 
 const headers = {
  'Content-Type': 'application/json',
  'X-CSRFToken': csrftoken,
  Authorization: `Bearer ${userToken}`,
 };

 useEffect(() => {
  const fetchedData = async () => {
   try {
    const response = await axios.get("http://localhost:8000/post/get/", { headers })
    setData(response.data)
   } catch (error) {
    console.log(error);
   }
  }
  if (userToken) {
   fetchedData()
  }
 }, [headers])

 return (
  <>{userToken ? 
   <div className='flex justify-center bg-black text-white'>
    <ul>
     {data.map((post, index) => (
      <li key={index} className='flex flex-col justify-center items-center h-[300px] w-[300px]'>
       <a href={`/detail/${post.slug}`}><div>Title: {post.title}</div></a>
       <div>Content: {post.content}</div>
       <div>Category: {post.category?.name}</div>
        {post.comments.length ? <div>Comments: {post.comments.map((e, index) => ( <div key={index}>{e.content}</div>))}</div> : <></>}
       <div>Likes: {post.likes.length}</div>
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