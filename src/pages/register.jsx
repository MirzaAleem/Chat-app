import React from "react";
import Add from "../img/addAvatar.png";

const Register = () => {

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Register</span>
        <form >
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input autoComplete="true"required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>
          You do have an account?
        </p>
      </div>
    </div>
  );
};

export default Register;