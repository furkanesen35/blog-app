import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Main = () => {
 const [data, setData] = useState([])
 useEffect(() => {
  const fetchedData = async () => {
   try {
    const response = await axios.get("http://localhost:8000/")
    console.log(response.data);

    setData(response.data)
   } catch (error) {
    console.log(error);
   }
  }
  fetchedData()
 }, [])
 return (
  <div className='flex justify-center bg-black h-[100vh] text-white'>
   <ul>
    {data.map((post, index) => (
     <li key={index} className='flex flex-col justify-center items-center h-[300px] w-[300px]'>
      <div>Title: {post.title}</div>
      <div>Content: {post.content}</div>
      <div>Category: {post.category}</div>
      {post.comments.length ? <div>Comments: {post.comments.map((e, index) => ( <div key={index}>{e.content}</div>))}</div> : <></>}
      <div>Likes: {post.likes.length}</div>
     </li>
    ))}
   </ul>
  </div>
 )
}

export default Main