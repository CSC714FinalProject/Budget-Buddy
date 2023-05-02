import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from 'react-router-dom';
import { auth, db } from '../src/firebase';
import { collection, doc, addDoc, deleteDoc, updateDoc, getDocs, query, where } from "firebase/firestore";
import './chart.css';
import { PieChart, Pie, ResponsiveContainer, Tooltip} from 'recharts';

function Chart() {
    const [user, setUser] = useState({});
    const [username, setUsername] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [categoryArr, setCategoryArr] = useState([]);
    const [totals, setTotals] = useState([]);

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
          const categories = []
          for (let i = 0; i < transactions.length; i ++) {
            let exists = false;
            if(transactions[i].transactionType === "purchase") {
                //add categories to array of categories
                if(categories.length === 0) {
                    categories[0] = transactions[i].category;
                }
                else {
                    for (let j = 0; j < categories.length; j++){
                        if (categories[j] === transactions[i].category) {
                            exists = true;
                        }
                    }
                    if(!exists) {
                        categories[length+1] = transactions[i].category;
                    }
                }
              x = x - parseFloat(transactions[i].amount);
            }
            else {
              x = x + parseFloat(transactions[i].amount);
            }
          }
          setTotal(x);
          setCategoryArr(categories);
          console.log(categories);
          
        }
        fetchTransactions();
  
      }, [])

      useEffect(() => {
        const getTotals = () => {
            const t = [];
            for (let i = 0; i < categoryArr.length; i++) {
                t[i] = 0;
                for (let j = 0; j < transactions.length; j++) {
                    if (categoryArr[i] === transactions[j].category) {
                        t[i] += parseFloat(transactions[j].amount);
                    }
                }
            }
            setTotals(t);
            console.log(totals);
        }

        getTotals();

      }, [transactions])

    const logout = async () => {
        await signOut(auth);
    
    };

    const data = []
    categoryArr.map((category, index) => (
        data[index] = {name: category, value: totals[index]}
    ))
    
    console.log(data);

    return (
        <div>
        <div className="navbar">
            <Link to="/home"><img  className = "home-button-img" src= "../images/BudgetBuddy-logos_transparent.png" alt="error"/></Link>
            <Link to="/chart"><img className = "pie-button-img" src="../images/pie-chart.png"/></Link> 
            <img className = "calendar-button-img" src="../images/calendar.png"/>
            <h1 className = "current-balance">Current Balance: ${total}</h1>
            <p className = "welcome">Welcome {username} </p> 
            <Link to = "/login"><button className = "sign-out-button" onClick = {logout}>Sign Out</button></Link>
        </div>
        <div className="chart-body">
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#149ECA" 
                    />
                    <Tooltip />
                </PieChart>
        </div>
        </div>
    )
}

export default Chart;