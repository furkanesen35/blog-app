import React from 'react'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import { Link } from 'react-router-dom'
import DropdownMenu from './DropdownMenu'

const Navbar = () => {
 return (
  <div>
   <DropdownMenu/>
   <div className='hidden lg:block'>
    <LeftSideBar/>
    <RightSideBar/>
   </div>
  </div>
 )
}

export default Navbar