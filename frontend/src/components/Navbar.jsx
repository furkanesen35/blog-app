import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const Navbar = () => {
 const { userToken } = useContext(UserContext);
 return (
  <div className="flex justify-center bg-gray-800 text-white py-4 px-6 sticky top-0 w-full z-10">
   <div className='flex justify-between w-[700px]'>
    <Link className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" to="/">Home</Link>
    { userToken ? 
     <>
      <Link className="border border-blue-500 text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded" to="/post">Post</Link>
      <Link className="border border-blue-500 text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded" to="/category">Add Category</Link>
      <Link className="border border-blue-500 text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded" to="/logout">Logout</Link>
     </> :
     <>
      <Link className="border border-blue-500 text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded" to="/login">Login</Link>
      <Link className="border border-blue-500 text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded" to="/register">Register</Link>
     </>
    }
   </div>
  </div>
 )
}

export default Navbar