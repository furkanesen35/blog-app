import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
 return (
  <div className="flex justify-around bg-black text-white">
   <Link to="/login">Login</Link>
   <Link to="/register">Register</Link>
  </div>
 )
}

export default Navbar