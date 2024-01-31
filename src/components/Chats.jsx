import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';

function Chats() {
  const [chats, setChats] = useState([])
  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)

  useEffect(()=>{
    const getChats = ()=>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
        return ()=>{
          unsub();
        }
    };

    //if there is currentUser then call getChats function
    currentUser.uid && getChats();
  },[currentUser.uid])

  const handleSelect = (u)=>{
    dispatch({type:"CHANGE_USER", payload: u})
  }
  console.log(Object.entries(chats))

  return (
    <div className='Chats'>
      {Object.entries(chats)?.map((chat)=>(
        <div className="userChat" key={chat[0]} onClick={()=> handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>Hello</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chats