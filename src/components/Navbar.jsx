import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
        <span className="logo">Chat App</span>
        <div className="user">
            <img src="" alt="" />
            <span className="userName">Aleem</span>
            <button className="logout">logout</button>
        </div>
    </div>
  )
}

export default Navbar