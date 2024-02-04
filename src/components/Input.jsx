import React, { useContext, useState } from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png'
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function Input() {
  const [text,setText] = useState("");
  const [img,setImg] = useState(null);
  const [err,setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () =>{
    if (img) {
      //for img storage in firebase storage
      const storageRef = ref(storage, self.crypto.randomUUID());
      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, "chats", data.chatId), {
              message: arrayUnion({
                id: self.crypto.randomUUID(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL
              })
            })
          } catch (err) {
            console.log(err);
            setErr(true);
          }
        });
      });

    } else {
      await  updateDoc(doc(db, "chats", data.chatId), {
        message: arrayUnion({
          id: self.crypto.randomUUID(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })  //self.crypto.randomUUID() is a web api that generates a random id.
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  }
  const handleKey = (e) => {
    e.code === "Enter" && handleSend()
  }
  return (
    <div className='input' onKeyDown={handleKey}>
        <input type="text" placeholder='Type something...'
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="send">
            <img src={Attach} alt="" />
            <input type="file" style={{display:'none'}} id='file' 
              onChange={(e) => setImg(e.target.files[0])}
            />
            <label htmlFor="file">
                <img src={Img} alt="" />
            </label>
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Input