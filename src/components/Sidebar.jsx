import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Search from '../components/Search'
import Chats from '../components/Chats'
import { ChatContext } from '../context/chatContext'

function sidebar() {
  const { data} = useContext(ChatContext)
  return (
    <div className="sidebar" style={{ display: window.innerWidth <= 450 ? (!data.selected ? 'block' : 'none') : 'block' }}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}

export default sidebar