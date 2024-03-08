import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const LeftSideBar = () => {
 const { userToken } = useContext(UserContext);
 return (
  <div className="fixed top-0 bottom-0 bg-gray-1000 text-white w-[37.5%] flex">
   <div className='flex flex-col w-[100%] items-end '>
    <div className='flex flex-col items-center w-[250px] h-[100vh] pt-[70px] mx-[20px] bg-gray-900'>
     <Link className="bg-blue-500 w-[140px] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-[12px] text-center" to="/">Home</Link>
     { userToken ? 
      <>
       <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/post">Post</Link>
       <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/category">Add Category</Link>
      </> :
      <>
       <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/login">Login</Link>
       <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/register">Register</Link>
      </>
     }
    </div>
   </div>
  </div>
 )
}

export default LeftSideBar