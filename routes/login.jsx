import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../src/firebase';
import './login.css';
import {AiOutlineMail} from 'react-icons/ai'
import {RiLockPasswordLine} from 'react-icons/ri'

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/home");

    } catch (error) {
      console.log(error.message);

    }

  };

  return (
    <div className="login-page">
      <div className="layout">

        <div className="">
          <img  className = "logo" src= "../images/BudgetBuddy-logos_transparent.png" alt="error"/>
        </div>

        <div className="login-box">
          <h1 className="login-text">Login</h1>
          <h1 className="login-email-icon"><AiOutlineMail /></h1>
          <input className = "email-login-field" placeholder = "email..." value = {loginEmail} onChange = {(event) => {setLoginEmail(event.target.value);}}/>
          <br />
          <h1 className="login-password-icon"><RiLockPasswordLine/></h1>
          <input className = "password-login-field" placeholder = "password... " value = {loginPassword} onChange = {(event) => {setLoginPassword(event.target.value);}}/>
          <br />
          <button className="login-button"onClick = {login}>Login</button>
          <p className="login-options">or login with</p>
          <div className="login-logos">
            <img className="google-login" src="../images//google-logo.png"/>
            <img className="apple-login" src="../images//apple-logo.png"/>
            <img className="twitter-login" src="../images//twitter-logo.png"/>
          </div>
          <p className="signup-text">Don't have an account yet?  <Link to = "/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  )

};

export default Login;