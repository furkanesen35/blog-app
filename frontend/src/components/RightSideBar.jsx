import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const RightSideBar = () => {
 const { userToken } = useContext(UserContext);
 return (
  <> 
   {userToken ? 
    <div className="fixed top-0 left-[62.5%] bg-gray-1000 text-white w-[300px] flex justify-end">
     <div className='flex flex-col w-[300px] items-end'>
      <div className='flex flex-col items-center w-[250px] h-[100vh] pt-[70px] mx-[20px] bg-gray-900'>
       <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/profile">Profile</Link>
       <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/my_posts">My Posts</Link>
       <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/preferences">Preferences</Link>
       <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/logout">Logout</Link>
     </div>
     </div>
    </div> : <></>
   } 
  </>
 );
}

export default RightSideBar;