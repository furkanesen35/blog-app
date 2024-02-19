import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Navbar from './components/Navbar';
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";

function App() {
 return (
  <>
   <BrowserRouter>
    <Navbar/>
    <Routes>
     <Route path="/" element={<Main/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/post" element={<Post/>}/>
    </Routes>
   </BrowserRouter>
  </>
 );
}

export default App; 