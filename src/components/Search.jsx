import React, { useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase'

function Search() {
  const [username, setUserName] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(null)

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where('displayName', '==', username))
    
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true)
    }
  }

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch()
  }
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e)=>{setUserName(e.target.value)}}
          value={username}
        />
      </div>
      {err && <span>User not found !</span>}
        {user && <div className="userChat">
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>}
    </div>
  )
}

export default Search