import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Navigate, useRoutes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { auth } from './firebase';
import Home from '../routes/home';
import Signup from '../routes/signup';
import Login from '../routes/login';
import Chart from '../routes/chart'



function App() {

  let element = useRoutes([
    {
      path:"/",
      element: <Navigate to = "/login" />
    },
    {
      path:"/signup",
      element: <Signup />
    },

    {
      path:"/login",
      element: <Login />
    },

    {
      path: "/home",
      element:<Home />
    },

    {
      path: "/chart",
      element: <Chart />
    }
  ]);

  return (
    <div>
      {element}
    </div>
  ) 

  



}

export default App


/*
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const stateChange = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => stateChange();
  }, []);


  const signup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);

    } catch (error) {
      console.log(error.message);

    }

  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

    } catch (error) {
      console.log(error.message);

    }

  };

  const logout = async () => {
    await signOut(auth);

  };

  return (
    <div className="App">
      <div>
        <h3>Register User</h3>
        <input placeholder = "email..." value = {signupEmail} onChange = {(event) => {setSignupEmail(event.target.value);}}/>
        <input placeholder = "password... " value = {signupPassword} onChange = {(event) => {setSignupPassword(event.target.value);}}/>

        <button onClick = {signup}>Create User</button>
      </div>

      <div>
        <h3>Login</h3>
        <input placeholder = "email..." value = {loginEmail} onChange = {(event) => {setLoginEmail(event.target.value);}}/>
        <input placeholder = "password... " value = {loginPassword} onChange = {(event) => {setLoginPassword(event.target.value);}}/>

        <button onClick = {login}>Login</button>
      </div>

      <h4>User Logged In:</h4>
      {user && user.email}
    
      <button onClick = {logout}>Sign Out</button>
    </div>
  )

  */

