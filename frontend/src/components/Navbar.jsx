import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const Navbar = () => {
 const { userToken } = useContext(UserContext);
 return (
  <div className="fixed top-0 bottom-0 bg-gray-900 text-white py-4 px-6 w-[600px] flex">
   <div className='flex justify-end w-[600px] '>
    <div className='flex flex-col mt-[70px]'>
     <Link className="bg-blue-500 w-[140px] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded my-[12px] text-center" to="/">Home</Link>
     { userToken ? 
      <>
       <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded my-[12px] text-center" to="/post">Post</Link>
       <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded my-[12px] text-center" to="/category">Add Category</Link>
       <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded my-[12px] text-center" to="/logout">Logout</Link>
      </> :
      <>
       <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded my-[12px] text-center" to="/login">Login</Link>
       <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded my-[12px] text-center" to="/register">Register</Link>
      </>
     }
    </div>
   </div>
  </div>
 )
}

export default Navbar