import React, { createContext, useState, useEffect } from 'react';
import axios from "axios"
import { jwtDecode } from "jwt-decode";


const UserContext = createContext();

const UserProvider = ({ children }) => {
 const [userToken, setUserToken] = useState(null);
 const [posts, setPosts] = useState([]);
 const [isLiked, setIsLiked] = useState(false);
 const [profile, setProfile] = useState(null);

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

 //profile part
 const fetchProfile = async () => {
  try {
   if (userToken) {
    const decoded = jwtDecode(userToken);
    const user = decoded.user_id;
    const response = await axios.get(`http://127.0.0.1:8000/account/get_user_profile/${user}`);
    setProfile(response.data);
   }
  } catch (error) {
   console.error('Error fetching profile:', error);
  }
 };
 console.log(profile);

 //post part
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
   fetchProfile();
  }
 }, [userToken,isLiked])

 //like part
 const handleLike = () => {
  setIsLiked(prev => !prev)
 }

 return (
  <UserContext.Provider value={{ userToken, loginUser, logoutUser, posts, handleLike, fetchProfile, profile }}>
   {children}
  </UserContext.Provider>
 );
};

export { UserProvider, UserContext };