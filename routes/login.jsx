import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../src/firebase';
import './login.css';

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

      <div>
        <h1>Login</h1>
        <input class = "user-login-field" placeholder = "email..." value = {loginEmail} onChange = {(event) => {setLoginEmail(event.target.value);}}/>
        <br />
        <input class = "user-login-field" placeholder = "password... " value = {loginPassword} onChange = {(event) => {setLoginPassword(event.target.value);}}/>
        <br />

        <button onClick = {login}>Login</button>

        <p>Don't have an account yet?  <Link to = "/signup">Sign Up</Link></p>
      </div>
    
    </div>
  )

};

export default Login;