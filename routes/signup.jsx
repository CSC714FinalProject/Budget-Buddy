import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from '../src/firebase';
import { collection, addDoc } from "firebase/firestore";
import { Navigate, useNavigate, Link } from 'react-router-dom';
import './signup.css'


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
      <div>
        <h1>Sign Up</h1>
        <input className = "user-signup-field" placeholder = "Email..." value = {signupEmail} onChange = {(event) => {setSignupEmail(event.target.value);}}/>
        <br />
        <input className = "user-signup-field" placeholder = "Firstname..." value = {firstName} onChange = {(event) => {setFirstName(event.target.value);}} />
        <br />
        <input className = "user-signup-field" placeholder = "Lastname..." value = {lastName} onChange = {(event) => {setLastName(event.target.value);}} />
        <br />
        <input className = "user-signup-field" placeholder = "Username" value = {username} onChange = {(event) => {setUsername(event.target.value);}} />
        <br />
        <input className = "user-signup-field" placeholder = "Password..." value = {signupPassword} onChange = {(event) => {setSignupPassword(event.target.value);}}/>
        <br />
        <input className = "user-signup-field" placeholder = "Confirm Password..." value = {confirmPassword} onChange = {(event) => {setConfirmPassword(event.target.value);}}/>
        <br />


        <button onClick = {signup}>Create User</button>

        <p>Already have an account?  <Link to = "/login">Login</Link></p>

      </div>

    
    </div>
  )





};

export default Signup;