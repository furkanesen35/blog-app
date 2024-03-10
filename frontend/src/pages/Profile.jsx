import React,{useState} from 'react'

const Profile = () => {
 const [user, setUser] = useState("")

 const submitProfile = (e) => {
  e.preventDefault()
  const data = {
   username: e.target.username.value,
   password: e.target.password.value,
  }
  setUser(data)
 }
 console.log(user);
 return (
  <div className='flex flex-col items-center bg-black h-[100vh] text-white'>
   <p>Change your profile settings</p>
   <form action="" method='POST' onSubmit={submitProfile}>
    <div className='mt-[10px]'>
     <label htmlFor="username">Username:</label>
     <input type="text" name='username' className='text-black'/>
    </div>
    <div className='mt-[10px]'>
     <label htmlFor="password">Password:</label>
     <input type="password" name='password' className='text-black'/>
    </div>
    <div className='flex justify-center'>
     <input type="submit" className='cursor-pointer'/>
    </div>
    </form>
  </div>
 )
}

export default Profile