import { signOut, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { auth } from '../firebase';
import { AuthContext } from '../context/authContext';

function Navbar() {
  const context = useContext(AuthContext);
  const user = context.currentUser;
  const [newImage, setNewImage] = useState(null);

  const handleChangePic = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.addEventListener('change', (event) => {
      const file = event.target.files[0];

      if (file) {
        setNewImage(file);
      }
    });
  };

  const handleUpdateImage = async () => {
    if (newImage) {
      // Upload the new image to Firestore storage
      const storage = getStorage();
      const storageRef = ref(storage, `user_images/${user.uid}/${newImage.name}`);
      await uploadBytes(storageRef, newImage);

      // Get the download URL
      const imageUrl = await getDownloadURL(storageRef);

      // Update the user profile with the new photo URL
      await updateProfile(auth.currentUser, { photoURL: imageUrl });

      // Optionally, update the user document in Firestore with the new photo URL
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { photoURL: imageUrl }, { merge: true });

      // Reset the newImage state
      setNewImage(null);
    }
  };

  return (
    <div className='navbar'>
      <span className="logo">Chat App</span>
      <div className="user">
        <img
          src={newImage ? URL.createObjectURL(newImage) : user.photoURL}
          alt=""
          onClick={handleChangePic}
        />
        <span className="userName">{user.displayName}</span>
        <button className="logout" onClick={() => signOut(auth)}>Logout</button>
        {newImage && (
          <button className="updateImage" onClick={handleUpdateImage}>
            Update Image
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
