import { useState } from 'react';
import './AddTransaction.css';



function AddTransaction(props) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [recurring, setRecurring] = useState(false);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();

        props.onSubmit(name, amount, transactionType, recurring, category, date);

        setName("");
        setAmount("");

    }


    return (
        <div className = "add-transaction-popup">
            <h3>Add New Transaction</h3>
            <form onSubmit = {handleSubmit}>
                <label>Name: <input type = "text" value = {name} onChange = {(e) => setName(e.target.value)} /></label>
                <label>Amount: <input type = "number" value = {amount} onChange = {(e) => setAmount(e.target.value)} /></label>
                <label>Category: <input type = "text" value = {category} onChange = {(e) => setCategory(e.target.value)} /></label>
                <label>Date: <input type = "datetime-local" value = {date} onChange = {(e) => setDate(e.target.value)} /></label>
                <label>Type: <input type = "text" value = {transactionType} onChange = {(e) => setTransactionType(e.target.value)} /></label>
                <label>Recurring: 
                    <input type = "checkbox" value = {recurring} onChange = {(e) => setRecurring(e.target.value)} id="yes"/>
                    <label for="yes">Yes</label>
                </label>
                <br></br>
                <button type = "submit">Add</button>
                <button onClick = {props.onClose}>Cancel</button>
            </form>
            
        </div>

    );
}

export default AddTransaction;