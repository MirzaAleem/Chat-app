import { signOut } from 'firebase/auth' //firebase signOut function
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/authContext'

function Navbar() {
  const context = useContext(AuthContext);
  const user = context.currentUser
  return (
    <div className='navbar'>
        <span className="logo">Chat App</span>
        <div className="user">
          <img src={user.photoURL} alt="" />
          <span className="userName">{user.displayName}</span>
          <button className="logout" onClick={()=>signOut(auth)}>logout</button>
        </div>
    </div>
  )
}

export default Navbar