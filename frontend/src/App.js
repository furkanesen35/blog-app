import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Navbar from './components/Navbar';
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddCategory from "./pages/AddCategory";
import Post from "./pages/Post";
import { AuthProvider } from './components/AuthContext';

function App() {
 return (
  <AuthProvider>
   <BrowserRouter>
    <Navbar/>
    <Routes>
     <Route path="/" element={<Main/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/post" element={<Post/>}/>
     <Route path="/category" element={<AddCategory/>}/>
    </Routes>
   </BrowserRouter>
  </AuthProvider>
 );
}

export default App; 