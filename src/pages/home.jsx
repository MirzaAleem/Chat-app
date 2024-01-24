import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/chat'
import "../style.scss"

function home() {
  return (
    <div className='home'>
        <div className="container">
            <Sidebar/>
            <Chat/>
        </div>
    </div>
  )
}

export default home