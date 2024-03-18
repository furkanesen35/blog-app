import React, { createContext, useState, useEffect } from 'react';
import axios from "axios"

const UserContext = createContext();

const UserProvider = ({ children }) => {
 const [userToken, setUserToken] = useState(null);
 const [posts, setPosts] = useState([]);
 const [isLiked, setIsLiked] = useState(false);

 //login part
 useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
   setUserToken(token);
  }
 }, []);

 const loginUser = (token) => {
  localStorage.setItem('token', token);
  setUserToken(token);
 };

 const logoutUser = () => {
  localStorage.removeItem('token');
  setUserToken(null);
 };

 //post part
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
    setPosts(response.data)
   } catch (error) {
    console.log(error);
   }
  }
  if (userToken) {
   fetchedData()
  }
 }, [userToken,isLiked])

 //like part
 const handleLike = () => {
  setIsLiked(prev => !prev)
 }

 return (
  <UserContext.Provider value={{ userToken, loginUser, logoutUser, posts, handleLike }}>
   {children}
  </UserContext.Provider>
 );
};

export { UserProvider, UserContext };