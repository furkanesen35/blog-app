import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);

  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };

  const csrftoken = getCookie('csrftoken');

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://backend-e4ds.onrender.com/",
    timeout: 10000,
    headers: {
      'X-CSRFToken': csrftoken,
      Authorization: `Bearer ${userToken}`,
    },
  });

  // Handle token expiration
  useEffect(() => {
    if (userToken) {
      const decoded = jwtDecode(userToken);
      if (decoded.exp * 1000 < Date.now()) {
        logoutUser();
      }
    }
  }, [userToken]);

  // Intercept 401 errors
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const loginUser = (token) => {
    localStorage.setItem('token', token);
    setUserToken(token);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUserToken(null);
  };

  const fetchProfile = async () => {
    if (!userToken) return;
    try {
      const decoded = jwtDecode(userToken);
      const user = decoded.user_id;
      const response = await axiosInstance.get(`/account/get_user_profile/${user}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchedData = async () => {
    try {
      const response = await axiosInstance.get('/post/get/');
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userToken,
        loginUser,
        logoutUser,
        posts,
        fetchProfile,
        profile,
        fetchedData,
        axiosInstance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
