import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
 const [userToken, setUserToken] = useState(null);
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
 return (
  <UserContext.Provider value={{ userToken, loginUser, logoutUser }}>
   {children}
  </UserContext.Provider>
 );
};

export { UserProvider, UserContext };