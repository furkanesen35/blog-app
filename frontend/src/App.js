import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Navbar from './components/Navbar';
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
 return (
  <>
   <BrowserRouter>
    <Navbar/>
    <Routes>
     <Route path="/" element={<Main/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
    </Routes>
   </BrowserRouter>
  </>
 );
}

export default App;