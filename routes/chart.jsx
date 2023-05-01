import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from 'react-router-dom';
import { auth, db } from '../src/firebase';
import { collection, doc, addDoc, deleteDoc, updateDoc, getDocs, query, where } from "firebase/firestore";
import './chart.css';
import { PieChart, Pie} from 'recharts';

function Chart() {
    const [user, setUser] = useState({});
    const [username, setUsername] = useState("");

    useEffect(() => {
        const stateChange = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => stateChange();
    }, []);

    useEffect(() => {
        const getUsername = async () => {
            const user = auth.currentUser;
            const userId = user ? user.uid : null;
            const userCollection = collection(db, "users");
            const userLoggedIn = query(userCollection, where("userId", "==", userId));
            const querySnapshot = await getDocs(userLoggedIn);
            const userData = querySnapshot.docs.map(doc => doc.data());
            setUsername(userData[0].username);
        }
        getUsername();
        
    }, [])

    const logout = async () => {
        await signOut(auth);
    
    };

    return (
        <div className="navbar">
            <Link to="/home"><img  className = "home-button-img" src= "../images/BudgetBuddy-logos_transparent.png" alt="error"/></Link>
            <Link to="/chart"><img className = "pie-button-img" src="../images/pie-chart.png"/></Link> 
            <img className = "calendar-button-img" src="../images/calendar.png"/>
            <h1 className = "current-balance">Current Balance: $</h1>
            <p className = "welcome">Welcome {username} </p> 
            <Link to = "/login"><button className = "sign-out-button" onClick = {logout}>Sign Out</button></Link>
        </div>
    )
}

export default Chart;