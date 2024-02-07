import React, { useContext } from 'react'
import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/chatContext'


function chat() {
  const { data,dispatch } = useContext(ChatContext)
  const handleClick = () => {
    dispatch({ type: "CHANGE_SELECTED", payload: false });
  }
  console.log(data.selected)
  return (
    <div className='chat' style={{ display: (window.innerWidth <= 450 && !data.selected) ? 'none' : 'block' }}>
      <div className="chatInfo">
        <div>
          <button onClick={handleClick}>back</button>
          <span>{data?.user.displayName}</span>
        </div>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default chat