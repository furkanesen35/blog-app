import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddCategory from "./pages/AddCategory";
import Post from "./pages/Post";
import LogoutComponent from "./pages/Logout";
import React, { useEffect, useState } from 'react';
import PostEdit from "./pages/PostEdit";
import axios from "axios";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
 const [data, setData] = useState([]) 
 useEffect(() => {
  const fetchedData = async () => {
   try {
    const response = await axios.get("http://localhost:8000/post/get/")
    setData(response.data)
   } catch (error) {
    console.log(error);
   }
  }
  fetchedData()
 }, [])
 
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
      <Route path="/profile" element={<Profile/>}/>
      {data.map((post, index) => {
        return <Route key={index} path={`/detail/${post.slug}`} element={<PostEdit slug={post.slug} />}/>
      })}
    </Routes>
  </BrowserRouter>
 );
}

export default App;