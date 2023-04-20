import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from 'react-router-dom';
import { auth } from '../src/firebase';
import './home.css';



function Home() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const stateChange = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => stateChange();
      }, []);

      const logout = async () => {
        await signOut(auth);
    
      };


      return (
        <div className="Home-page">
    
          <h1>Budget Buddy</h1>
          {user && user.email}
        
          <Link to = "/login"><button onClick = {logout}>Sign Out</button></Link>
        </div>
      )


};

export default Home;