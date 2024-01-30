import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [err,setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value
    const password = e.target[1].value
    
    try {
      await signInWithEmailAndPassword(auth,email,password)
      navigate('/')
    } catch (error) {
      setErr(true)
      console.log(err)
    } 
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" autoComplete="true"/>
          <button>Sign In</button>
          {err && <p>something went wrong !</p>}
        </form>
        <p>
          You don't have an account? <Link to={'/register'}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;