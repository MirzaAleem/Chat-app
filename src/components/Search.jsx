import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase'
import { AuthContext } from '../context/authContext'

function Search() {
  const [username, setUserName] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(null)

  const {currentUser} = useContext(AuthContext)

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

  const handleSelect = async () => {
    //check whether group(chats in firestore) exists, if not create one
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId))

      if(!res.exists()) {
        //create chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { message:[] });

        //create user chats
        //for sender chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        })

        //for receiver chats
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        })
      }
    } catch (error) {
      //create user chats
    }
    setUser(null);
    setUserName("")
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
        {user && <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>}
    </div>
  )
}

export default Search