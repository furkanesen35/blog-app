import React, { useContext } from 'react'
import axios from "axios"
import { UserContext } from '../context/UserContext';

const LikeButton = ({ post }) => {
 const { userToken, handleLike } = useContext(UserContext);
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

 const lastHandleLike = () => {
  axios.post(`http://127.0.0.1:8000/${post.slug}/post_like/`, data, {headers})
  handleLike()
 }

 return (
  <div>
   <div>Likes: {post.likes.length}</div>
   <button onClick={lastHandleLike}>{post.slug}</button>
  </div>
 )
}

export default LikeButton