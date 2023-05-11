import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from 'react-router-dom';
import { auth, db } from '../src/firebase';
import { collection, doc, addDoc, deleteDoc, updateDoc, getDocs, query, where } from "firebase/firestore";
import './home.css';
import AddTransaction from '../components/AddTransaction';
import {AiOutlinePieChart} from 'react-icons/ai';


function Home() {
    const [user, setUser] = useState({});
    const [username, setUsername] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [editedTransaction, setEditedTransaction] = useState(null);
    const [numTransactions, setNumTransactions] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const stateChange = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => stateChange();
    }, []);

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
        console.log("being used"); 

        setTransactions(transactionsData);
        let x = 0;
        for (let i = 0; i < transactions.length; i ++) {
          if(transactions[i].transactionType === "purchase") {
            x = x - parseInt(transactions[i].amount);
          }
          else {
            x = x + parseInt(transactions[i].amount);
          }
        }
        setTotal(x);
      
        console.log(total);
        
        
      }
      fetchTransactions();

    }, [numTransactions])

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

    const handleAddTransaction = async (name, amount, transactionType, recurring, category, date) => {
      const user = auth.currentUser;
      const userId = user ? user.uid : null;

      if (!userId) {
        console.error("no user found");
        return;
      }
      await addDoc(collection(db, "transactions"), {
        name,
        amount,
        transactionType,
        recurring,
        category, 
        date,
        userId
      });
      setShowPopup(false);

      setNumTransactions((numTransactions) => numTransactions + 1);
    }

    
    const handleRemoveTransaction = async (id) => {
      console.log(id);
      await deleteDoc(doc(db, "transactions", id));
      setNumTransactions((numTransactions) => numTransactions - 1);

    }

    const handleEditTransactionSubmit = async (name, amount, transactionType, recurring, category, date, id) => {
      const transactionRef = doc(db, "transactions", id);
      console.log(date);
      console.log(name);
      await updateDoc(transactionRef, {
        name,
        amount,
        transactionType,
        recurring,
        category,
        date,
        id,
      });
    
      setNumTransactions((numTransactions) => numTransactions + 1);
      setShowPopup(false);
      setEditedTransaction(null);
    };


    
      return (
        <body>
          <div className = "whole-page">      
            <div className={`${showPopup ? "blur" : "Home-page"}`}>
                <div className="navbar">
                    <img  className = "home-button-img" src= "../images/BudgetBuddy-logos_transparent.png" alt="error"/>
                    <Link to="/chart"><img className = "pie-button-img" src="../images/pie-chart.png"/></Link> 
                    <Link to="/calendar"><img className = "calendar-button-img" src="../images/calendar.png"/></Link>
                    <h1 className = "current-balance">Current Balance: ${total}</h1>
                    <p className = "welcome">Welcome {username}</p>
                    <Link to = "/login"><button className = {`${showPopup ? "blur" : "sign-out-button"}`} onClick = {logout}>Sign Out</button></Link>
                </div>

              <div className = "transactions">

                <button className = "add-transaction-button" onClick = {() => setShowPopup(true)}>+Create New Transaction</button>

                

                <ul className = "transaction-list"> 
                  {transactions.map((transaction, index) => ( 
                    
                    <>
                    <li className="transaction-item" key={index}>
                      <span className="transaction-name">{transaction.name}</span>
                      <span className="transaction-amount">${transaction.amount}</span>
                      <span className="transaction-category">Category: {transaction.category}</span>
                      <span className="transaction-date">{transaction.date}</span>
                      <button className="delete-button" onClick={() => handleRemoveTransaction(transaction.id)}><img src="../images/garbagecan.png" width="35" height="35" /></button>
                      <button className="edit-button" onClick={() => { setEditedTransaction(transaction); setShowPopup(true); }}><img src="../images/pen.png" width="35" height="35"/></button>
                    </li>
                    <script>

                    </script>
                    </>
                  ))}
                </ul>

              </div>
            
            </div>
            {showPopup && (<AddTransaction onClose={() => {setShowPopup(false); setEditedTransaction(null);}} onSubmit={editedTransaction ? handleEditTransactionSubmit : handleAddTransaction} editedTransaction={editedTransaction} />)}
         </div>
        </body>
      )


};

export default Home;