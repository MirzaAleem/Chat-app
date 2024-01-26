import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
        <span className="logo">Chat App</span>
        <div className="user">
          <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GI-td9gs8D5OKZd19mAOqA.png" alt="" />
          <span className="userName">Aleem</span>
          <button className="logout">logout</button>
        </div>
    </div>
  )
}

export default Navbar