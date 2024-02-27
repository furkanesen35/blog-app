import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Navbar from './components/Navbar';
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddCategory from "./pages/AddCategory";
import Post from "./pages/Post";
import LogoutComponent from "./pages/Logout";
import React from 'react';

function App() {
 return (
  <BrowserRouter>
   <Navbar/>
   <Routes>
     <Route path="/logout" element={<LogoutComponent/>}/>
     <Route path="/post" element={<Post/>}/>
     <Route path="/category" element={<AddCategory/>}/>
     <Route path="/" element={<Main/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/login" element={<Login/>}/>
   </Routes>
  </BrowserRouter>
 );
}

export default App; 