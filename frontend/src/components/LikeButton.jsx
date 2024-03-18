import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { UserContext } from '../context/UserContext';

const LikeButton = ({ post }) => {
 const { userToken } = useContext(UserContext);
 const [isLiked, setIsLiked] = useState(false)
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

 const data = {
  id: post.id
 }

 const handleLike = () => {
  setIsLiked(prev => !prev)
  axios.post(`http://127.0.0.1:8000/${post.slug}/post_like/`, data, {headers})
 }

 return (
  <div>
   <div>Likes: {post.likes.length}</div>
   <button onClick={handleLike}>{post.slug}</button>
  </div>
 )
}

export default LikeButton