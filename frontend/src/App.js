import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Navbar from './components/Navbar';
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddCategory from "./pages/AddCategory";
import Post from "./pages/Post";
import LogoutComponent from "./pages/Logout";
import React, { useContext } from 'react';
import { UserContext } from './context/UserContext';

function App() {
 const { userToken, loginUser, logoutUser } = useContext(UserContext);
 return (
  <BrowserRouter>
   <Navbar/>
   <Routes>
     <Route path="/logout" element={<LogoutComponent logoutUser={logoutUser}/>}/>
     <Route path="/post" element={<Post/>}/>
     <Route path="/category" element={<AddCategory/>}/>
     <Route path="/" element={<Main/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/login" element={<Login loginUser={loginUser}/>}/>
   </Routes>
  </BrowserRouter>
 );
}

export default App; 