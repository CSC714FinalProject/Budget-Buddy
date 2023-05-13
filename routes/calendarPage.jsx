import React from 'react'
import './calendarPage.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from '../src/firebase';
import { collection, doc, addDoc, deleteDoc, updateDoc, getDocs, query, where } from "firebase/firestore";
import Calendar from 'react-calendar';
import TransactionsList from '../components/TransactionsList';

function CalendarPage() {

    const [user, setUser] = useState({});
    const [username, setUsername] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [date, setDate] = useState(new Date());
    const [showPopup, setShowPopup] = useState(false);
    

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

    useEffect(() => {
      const fetchTransactions = async () => {
        const user = auth.currentUser;
        const userId = user ? user.uid : null;
      
        if (!userId) {
          console.error("no user found");
          return;
        }
      
        const transactionsCollection = collection(db, "transactions");
        const userTransactions = query(transactionsCollection, where("userId", "==", userId));
        const querySnapshot = await getDocs(userTransactions);
        const transactionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
        console.log(transactionsData); 
      
        const filteredTransactions = transactionsData.filter(transaction => {
          const transactionDate = new Date(transaction.date);
          const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
          const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          return transactionDate >= monthStart && transactionDate <= monthEnd;
        });
      
        
      
        setTransactions(filteredTransactions);
      };
        fetchTransactions();
  
      }, [date]);
  
      useEffect(() => {
        const setCurrentBalance = () => {
            let x = 0;
            for (let i = 0; i < transactions.length; i ++) {
              if(transactions[i].transactionType === "purchase") {
                    x = x - parseFloat(transactions[i].amount);
                }
                else {
                    x = x + parseFloat(transactions[i].amount);
                }
            }
            setTotal(x);
        }
        setCurrentBalance();
      }, [transactions])

      const handleDayClick = (value) => {
        setDate(value);
        setShowPopup(true);
      }

      const handlePopupClose = () => {
        setShowPopup(false);
      };

      const tileContent = ({ date, view }) => {
        const dateString = date.toDateString();
        const hasTransaction = transactions.some(transaction => new Date(transaction.date).toDateString() === dateString);
      
        if (hasTransaction) {
          return <div className="transaction-marker"></div>;
        }
      
        return null;
      };
  return (
    
    <div className = "whole-calendar-page">
      <div className={`${showPopup ? "calendar-blur" : "calendar-page"}`}>
          <div className="navbar">
              <Link to="/home"><img  className = "home-button-img" src= "../images/BudgetBuddy-logos_transparent.png" alt="error"/></Link>
              <Link to="/chart"><img className = "pie-button-img" src="../images/pie-chart.png"/></Link> 
              <Link to="/calendar"><img className = "calendar-button-img" src="../images/calendar.png"/></Link>
              <h1 className = "current-balance">Current Balance: ${total}</h1>
              <p className = "welcome">Welcome {username} </p>
              <Link to = "/login"><button className = "sign-out-button" onClick = {logout}>Sign Out</button></Link>
          </div>
          <div className="calendar-container">
              <Calendar className = "calendar" onChange={handleDayClick} value={date} tileContent = {tileContent}/>
          </div>
          
      </div>
      
      {showPopup && <TransactionsList date={date} transactions={transactions} onClose={handlePopupClose} />}
      
      

    </div>
  )
}

export default CalendarPage