import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from 'react-router-dom';
import { auth, db } from '../src/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import './home.css';
import AddTransaction from '../components/AddTransaction';



function Home() {
    const [user, setUser] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const stateChange = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => stateChange();
      }, []);

    useEffect(() => {
      const fetchTransactions = async () => {
        const transactionsCollection = collection(db, "transactions");
        const querySnapshot = await getDocs(transactionsCollection);
        const transactionsData = querySnapshot.docs.map(doc => doc.data());
        setTransactions(transactionsData);

      }
      fetchTransactions();

    }, [transactions])

    const logout = async () => {
        await signOut(auth);
    
      };
    const handleAddTransaction = async (name, amount) => {
      const user = auth.currentUser;
      const userId = user ? user.uid : null;

      if (!userId) {
        console.error("no user found");
        return;
      }
      await addDoc(collection(db, "transactions"), {
        name,
        amount,
        userId
      });
    }
    
      return (
        <div className="Home-page">
    
          <h1 className = "home-title">Budget Buddy</h1>
          <p className = "welcome">{user && user.email}</p>

          <div className = "transactions">

            <button className = "add-transaction-button" onClick = {() => setShowPopup(true)}>Add Transaction</button>
            {showPopup && <AddTransaction onClose = {() => setShowPopup(false)} onSubmit = {handleAddTransaction} />}

            <ul className = "transaction-list">
              {transactions.map((transaction, index) => (
                <li className = "transaction-item" key = {index}><span className = "transaction-name">{transaction.name}</span> <span className = "transaction-amount">${transaction.amount}</span></li>
              ))}
            </ul>

          </div>
        
          <Link to = "/login"><button className = "sign-out-button" onClick = {logout}>Sign Out</button></Link>
        </div>
      )


};

export default Home;