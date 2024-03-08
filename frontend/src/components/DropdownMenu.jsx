import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const DropdownMenu = () => {
 const { userToken } = useContext(UserContext);
 const [isOpen, setIsOpen] = useState(false);
 const toggleMenu = () => {
  setIsOpen(!isOpen);
 };
 return (
  <nav className="flex flex-col items-center bg-gray-800 lg:hidden">
   <div className='fixed top-[15px] left-[40px] text-white w-[50px] h-[50px] flex justify-center items-center cursor-pointer' onClick={toggleMenu}>X</div>
    { userToken ?   
     <div className={`flex flex-col lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
      <Link className="bg-blue-500 w-[140px] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-[12px] text-center" to="/">Home</Link>
      <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/profile">Profile</Link>
      <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/my_posts">My Posts</Link>
      <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/preferences">Preferences</Link>
      <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/logout">Log out</Link>
     </div> :
     <div className={`flex flex-col lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
      <Link className="bg-blue-500 w-[140px] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-[12px] text-center" to="/">Home</Link>
      <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/login">Login</Link>
      <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/register">Register</Link>
     </div>
   }
  </nav>
 );
};

export default DropdownMenu;
