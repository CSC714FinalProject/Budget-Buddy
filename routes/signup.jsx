import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from '../src/firebase';
import { collection, addDoc } from "firebase/firestore";
import { Navigate, useNavigate, Link } from 'react-router-dom';
import './signup.css'
import {AiOutlineMail, AiOutlineIdcard, AiOutlineUser} from 'react-icons/ai'
import {RiLockPasswordLine} from 'react-icons/ri'


function Signup() {
  const [signupEmail, setSignupEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      await addDoc(collection(db, "users"), {
        firstName,
        lastName,
        username,
        userId: user.user.uid
      });
      console.log(user);
      navigate("/home");

    } catch (error) {
      console.log(error.message);

    }

  };
  
  return (
    <div className="signup-page">
        <div className="">
          <img  className = "logo" src= "../images/BudgetBuddy-logos_transparent.png" alt="error"/>
        </div>
        <div className="signup-box">
          <h1 className="signup-text">Sign Up</h1>
          <h1 className="signup-email-icon"><AiOutlineMail /></h1>
          <input className = "email-signup-field" placeholder = "Email..." value = {signupEmail} onChange = {(event) => {setSignupEmail(event.target.value);}}/>
          <br />
          <h1 className="signup-name-icon"><AiOutlineIdcard/></h1>
          <input className = "first-name-field" placeholder = "Firstname..." value = {firstName} onChange = {(event) => {setFirstName(event.target.value);}} />
          <br />
          <input className = "last-name-field" placeholder = "Lastname..." value = {lastName} onChange = {(event) => {setLastName(event.target.value);}} />
          <br />
          <h1 className="signup-user-icon"><AiOutlineUser/></h1>
          <input className = "username-signup-field" placeholder = "Username" value = {username} onChange = {(event) => {setUsername(event.target.value);}} />
          <br />
          <h1 className="signup-password-icon"><RiLockPasswordLine/></h1>
          <input className = "password-signup-field" type="password" placeholder = "Password..." value = {signupPassword} onChange = {(event) => {setSignupPassword(event.target.value);}}/>
          <br />
          <input className = "cpassword-signup-field" type="password" placeholder = "Confirm Password..." value = {confirmPassword} onChange = {(event) => {setConfirmPassword(event.target.value);}}/>
          <button className="signup-button" onClick = {signup}>Create User</button>
          <p className="signup-options">or sign up with</p>
          <div className="signup-logos">
            <img className="google-signup" src="../images//google-logo.png"/>
            <img className="apple-signup" src="../images//apple-logo.png"/>
            <img className="twitter-signup" src="../images//twitter-logo.png"/>
          </div>
          <p className="goto-login-text">Already have an account?  <Link to = "/login">Login</Link></p>
        </div>
    </div>
  )





};

export default Signup;