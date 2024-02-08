import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import "../style.scss"
import { ChatContext } from '../context/chatContext'

function home() {
  const { data } = useContext(ChatContext)
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